const { default: axios } = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const post = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    post[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, postId, content } = data;
    post[postId].comments.push({id, content}); // comments is an array of objects
  }
});
app.get("/posts", (req, res) => {
  res.send(post);
});

app.listen(4003, () => console.log("server started listening on 4003"));
