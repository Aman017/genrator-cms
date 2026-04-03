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

const prompt = `Rewrite the following content but keep the content's meaning same Content is ${content}`

const response = await generateContentWithGemini(prompt);

//save the content 


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
