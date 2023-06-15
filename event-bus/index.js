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

    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);
    await axios.post('http://localhost:4009/events', event);
    res.send({status: 'OK'})
})

app.get('/events', (req, res)=>{
    res.send(events)
})


app.listen(4005 , ()=>{
    console.log('listening in 4005 ')
} )
