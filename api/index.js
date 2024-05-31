const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express();
// console.log(process.env.MONGO)
mongoose.connect(process.env.MONGO).then(() =>{console.log("connected")})


app.get('/',(req,res)=>{
    res.send("hfdfddh")
})

app.listen('3000',()=>{
    console.log("Server is running on port 3000");
})