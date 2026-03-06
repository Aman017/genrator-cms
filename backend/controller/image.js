
//open ai service  or gemini service  for  generating image
//api key
exports.generateImage = async(req,res)=>{
    try {
        console.log(`Started processing og image generating request for user id  ${req.user.id}`)
        
        // use service to generate image based on prompt --> image    

        //handle  image format

        // cloudinary for image upload => url


    } catch (error) {
        console.error(`Error in generating image. Error is ${error}`)
        return res.status(500).json({
            message: "Internal server issue"
        })
    }
}