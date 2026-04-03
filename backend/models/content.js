const mongoose  = require("mongoose");


const ContentSchema = new mongoose.Schema({
   
    user_id:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
     input_prompt:{
type: String,
required:true,
trim:true,
    },
    output_content:{
        required: true,
        type: String,
        trim:true,
    },
   type:{
type:String,
required:true,
enum:["rewrite", "expand", "shorten", "article"]
   }
  
},{
    timestamps:true,
})

const Content=  mongoose.model("Content", ContentSchema);

module.exports = Content;
