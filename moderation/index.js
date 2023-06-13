const express = require('express');
const app = express()
const axios = require('axios')  
const cors = require('cors');


app.use(cors())

app.use(express.json())
app.post('/events' , async (req, res)=>{
    const {type, data} = req.body

    if(type=== 'CommentCreated'){

        const status = data.content.incudes('orange') ? 'Approved' : 'rejected'
await axios.post('/events', {
    type: 'CommentModerated',
    data: {
        id: data.id,
        content : data.content,
        postId: data.postId,
        status
    }
})
         
    }

res.send({})
})


app.listen(4009, ()=>{console.log('moderation started successfully on port 4009')})