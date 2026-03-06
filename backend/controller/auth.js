const User = require("../models/auth")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require("dotenv").config();



exports.signIn= async(req, res)=>{
try {
    console.log("Start processing of logging in request")
    
    const {email, password} = req.body;
//input validation
//add more check for validation for email and password
if(!email || !password){
    return res.status(400).json({
        message:"Email and password are required"
    })
}

//find the user
const user = await User.findOne({ email }).select("+password");

if(!user){
    return res.status(401).json({
        message:"User doesn't exists."
    })
}

//compare password with  saved password (hashed)

const match = await bcrypt.compare(password, user.password);
if(!match){
    return res.status(401).json({
        message:"Invalid credentials"
    })
}

const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
}

// issue token
const token  = jwt.sign(payload,process.env.SECRET_KEY,{ expiresIn: "7d" })

return res.json({
    message:"Login successful",
    token,
})

}catch (error) {
        console.error(`Error in signing in user ${error}`)
        return res.status(500).json({
            message: "internal server issue"
        })
    }
}

exports.signUp = async(req,res)=>{
    try {
        console.log("start processing of signing up request")
        const {name, email, password} = req.body;
        // console.log(name, email, password)
        // input validation
        if(!name || !email || !password ){
            return res.status(400).json({
                message: "Name, Email Password  is required"
            })
        }
//check if the user already exits in data base
const user = await User.findOne({email});
if(user){
    return res.status(400).json({
        message:"user already exists",

    })
}

// hash  the password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds)

const newUser = await User.create({
    name, email, password: hashedPassword,
})

// return user if  required
const updatedUser ={
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,

}

return res.status(201).json({
    message:"User signed up successfully",
    user: updatedUser
})

    } catch (error) {
        console.error(`Error in signing up user ${error}`)
        return res.status(500).json({
            message: "internal server issue"
        })
    }
}

