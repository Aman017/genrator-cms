const {GoogleGenAI} = require( '@google/genai');
require("dotenv").config();
const Content = require("../models/content")

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


exports.rewrite = async(req, res)=>{
    try {
          console.log(`Started processing of rewriting  request for user id ${req.user.id} `)

          const {content} = req.body;

          if(!content){
            return res.status(400).json({
                message:"content is required",
                
            })
          }
        
//use some  service to rewrite the content

const prompt = `Rewrite the following content but keep the content's meaning same. Only provide the rewritten text without any explanation, options or markups. just return the plane text Content is ${content}`

const updated_content = await generateContentWithGemini(prompt);

//save the content using content model
await Content.create({
    user_id: req.user.id,
    input_prompt: content,
    output_content: updated_content,
    type:"rewrite"
}) 

return res.status(200).json({
    message: "Content rewrite successfully",
    content: updated_content, 
})

// return the content


    } catch (error) {
         console.error(`Error in rewriting content. Error is ${error}`)
        return res.status(500).json({
            message: "Internal server issue"
        })
    }
}

async function generateContentWithGemini(prompt) {
    const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  console.log("-====>",response.text);
  return response.text
}
