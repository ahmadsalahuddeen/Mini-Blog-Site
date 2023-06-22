const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, postId, content, status } = data;
    posts[postId].comments.push({ id, content, status }); // comments is an array of objects
  }
  if (type === "CommentUpdated") {
    const { postId, status, id, content } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    (comment.status = status), (comment.content = content);
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvents(type, data);
  res.send({});
});
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(4003, 
 async () => {console.log("server started listening on 4003")

const res = await axios.get('http://event-bus-srv:4005/events')

for(let event of res.data){
  console.log('proccessing events:', event.type)
  handleEvents(event.type, event.data)
}

});
  