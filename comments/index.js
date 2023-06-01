const express= require('express')
const app = express() 
const {randomBytes} = require('crypto') 
const cors = require('cors');

app.use(cors())
app.use(express.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res )=>{
res.send(commentsByPostId[req.params.id] || [])
})
app.post('/posts/:id/comments',(req, res )=>{
const commentId = randomBytes(4).toString('hex')
const {content} = req.body
const comment = commentsByPostId[req.params.id] || []
comment.push({commentId, content})
commentsByPostId[req.params.id] = comment
res.send(comment)

})

app.listen(4000, ()=> console.log('server started successfully '))