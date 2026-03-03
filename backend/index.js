
const express = require('express')
const cors = require("cors")
const app = express();
const db = require("./db")
const router = require("./routes/v1")

require('dotenv').config();
const PORT = process.env.PORT;

db();
app.use(cors());
//parse json data
app.use(express.json());

app.use("/v1", router);


app.get('/', (req, res)=>
res.send("welcome to the server"));

//404 handler-  should be after all routes
app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
})


app.listen(PORT,()=>{
    console.log(`Server Started on PORT ${PORT}`)
})