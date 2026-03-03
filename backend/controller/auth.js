const User = require("../models/auth")
const bcrypt = require("bcrypt")

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
        return res.status({
            message: "internal server issue"
        })
    }
}