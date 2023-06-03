const { default: axios } = require('axios');
const express = require('express');
const app = express()
const cors = require('cors');


app.use(express.json())
app.use(cors())


const post = {}

app.post('/events', (req, res)=>{
    
})
app.get('/posts', (req, res)=>{

})

app.listen(4003, ()=> console.log('server started listening on 4003'))