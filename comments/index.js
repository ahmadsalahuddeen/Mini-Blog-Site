const express = require("express");
const axios = require("axios");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");
const util = require('util')
app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  
  const comment = commentsByPostId[req.params.id] || [];
  
  comment.push({ id:commentId, content, status: "Pending" });

  commentsByPostId[req.params.id] = comment;
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "Pending",
    },
  });
  res.send(comment);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];




    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          content,
          status,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  }
  res.send({});
});
app.listen(4001, () => console.log("server started successfully at 4001"));
