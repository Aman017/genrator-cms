const mongoose  = require("mongoose");


const ImageSchema = new mongoose.Schema({
   
    user_id:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
     prompt:{
type: String,
required:true,
    },
    image_url:{
        required: true,
        type: String,
    },
   
  
},{
    timestamps:true,
})

const Image=  mongoose.model("Image", ImageSchema);

module.exports = Image;
