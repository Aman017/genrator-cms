
const express = require('express')
const app = express();
const db = require("./db")

require('dotenv').config();
const PORT = process.env.PORT;

db();

app.get('/', (req, res)=>
res.send("welcome to the server"));


app.listen(PORT,()=>{
    console.log(`Server Started on PORT ${PORT}`)
})