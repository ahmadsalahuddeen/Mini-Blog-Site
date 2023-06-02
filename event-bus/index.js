const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())




app.post('/events', (req, res)=>{
    const event = req.body

    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    // axios.post('http://localhost:4002/events', event);
    res.send({status: 'OK'})
})


app.listen(4005 , ()=>{
    console.log('listening in 4005 ')
} )
