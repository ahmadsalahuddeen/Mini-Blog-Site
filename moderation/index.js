const express = require('express');
const app = express()
const axios = require('axios')  
const cors = require('cors');


app.use(cors())

app.use(express.json())
app.post('/events' , (req, res)=>{
    
})


app.listen(4009, ()=>{console.log('moderation started successfully on port 4009')})