const express = require("express");
const app = express();
const { log } = require("console");
const { randomBytes } = require("crypto");
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  let id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  res.send(posts[id])
});

app.listen(5000, () => console.log("server succefully on http://localhost:5000"));
