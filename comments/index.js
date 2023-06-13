const express = require("express");
const axios = require("axios");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => { 
  res.send(commentsByPostId[req.params.id] || []);
});
app.post('/events' ,async(req, res)=>{
  console.log('Recieved Events: ' ,req.body.type )
  const {type, data} = req.body
  if(type=== 'CommentModerated'){
    const {postId, id, status} = data
const comments = commentsByPostId[data.postId]
const  comment = comments.find(comment => { 
  return comment.id === id})
  comment.status = status

  await axios.post('http://localhost:4009' {
    type: "CommentUpdated",
    data:{
      id, 
      postId,
      content,
      status,
      
    }
  })
}
  res.send({})
})


app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comment = commentsByPostId[req.params.id] || [];

  comment.push({ commentId, content, status: 'Pending' });

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { 
      id: commentId,
      content,
      postId: req.params.id,
      status: 'Pending'
    },
  });
  commentsByPostId[req.params.id] = comment;
  res.send(comment);
});

app.listen(4001, () => console.log("server started successfully "));
