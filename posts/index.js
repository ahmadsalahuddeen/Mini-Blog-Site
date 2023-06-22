const express = require("express");
const app = express();
const axios = require('axios');
const { log } = require("console");
const { randomBytes } = require("crypto");
const cors = require('cors');

app.use(express.json());
app.use(cors());


const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post('/events' ,(req, res)=>{
  console.log('Recieved Events: ' ,req.body.type )
  res.send({})
})
app.post("/posts", async(req, res) => {
  let id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { 
    id, 
    title,
  };
  await axios.post('http://localhost:4005/events', {
  type: 'PostCreated'  ,
  data: {
    id, title
  }
  })
  res.send(posts[id])
});

app.listen(4002, () => console.log("server succefully on http://localhost:4002 \nV69"));
