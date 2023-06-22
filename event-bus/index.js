const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors');
app.use(express.json())
app.use(cors())


const events = [];
app.post('/events', async(req, res)=>{
    const event = req.body
    events.push(event)
    try {
        
            await axios.post('http://comments-srv:4001/events', event);
            await axios.post('http://posts-clusterip-srv:4002/events', event);
            await axios.post('http://query-srv:4003/events', event);
            await axios.post('http://moderation-srv:4009/events', event);
        
    } catch (error) {
        console.log('not not crashed')
    }
    res.send({status: 'OK'})
})

app.get('/events', (req, res)=>{
    res.send(events)
})


app.listen(4005 , ()=>{
    console.log('listening in 4005 ')
} )
