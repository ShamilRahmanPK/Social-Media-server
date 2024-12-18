require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const SmServer = express()

SmServer.use(cors())
SmServer.use(express.json())
SmServer.use(router)
SmServer.use('/uploads',express.static('./uploads'))


const PORT = 3000

SmServer.listen(PORT,()=>{
    console.log(`Server is running at ${PORT} and waiting for client request`);
    
})

SmServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Project Fair server started at port and waiting for client request</h1>`)
})