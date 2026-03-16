require("dotenv").config();
const fs = require("fs")
const { InferenceClient } = require("@huggingface/inference");
const { RESOLUTION_MAP } = require("../constant")
const cloudinary = require('cloudinary').v2;
const Image = require("../models/image")

const client = new InferenceClient(process.env.HUGGING_FACE_API_KEY);

// console.log(process.env.HUGGING_FACE_API_KEY)
cloudinary.config({
    cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_SECRET_KEY
});




exports.generateImage = async (req, res) => {
    try {
        console.log(`Started processing of image generating request for user id  `)
        
        const { prompt, resolution } = req.body;
        
        
        // todo uncomment after  adding  auth middleware
        // console.log(`Started processing og image generating request for user id  ${req.user.id}`)
        console.log("-->>", prompt, resolution)
        
        // use service to generate image based on prompt --> image    
        if (!process.env.HUGGING_FACE_API_KEY) {
            console.log("hugging api is not configured")
            return res.status(500).json({
                message: "Intern server error"
            })
        }
        
        //handle  image format
        if (!prompt) {
            return res.status(400).json({
                message: "Prompt is required"
            })
        }

        console.log(`Prompt: ${prompt} and Resolution ${resolution}`)
        
        // cloudinary for image upload => url
        const dimension = RESOLUTION_MAP[resolution] || RESOLUTION_MAP["1024x1024"];
        
        const image = await getImageBlob(prompt, dimension);
        
        const buffer = Buffer.from(await image.arrayBuffer());
        
        fs.writeFileSync("output.png", buffer);
        
       const uploadedImage = await uploadImage(buffer);

console.log(uploadedImage, req.user);

await Image.create({
    prompt,
    image_url: uploadedImage?.secure_url,
    user_id: req.user.id,
});

return res.json({
    message: "Image generated Successfully",
    image: uploadedImage?.secure_url,
});
        
        
        //return the result
        
    } catch (error) {
        console.error(`Error in generating image. Error is ${error}`)
        return res.status(500).json({
            message: "Internal server issue"
        })
    }
}

async function getImageBlob(prompt, dimension) {
    // return image
    return await client.textToImage({
        provider: "auto",
        model: "black-forest-labs/FLUX.1-schnell",
        inputs: prompt,
        parameters: {
            num_inference_steps: 5,
            width: dimension.width,
            height: dimension.height,
        },
    });

}
async function uploadImage(buffer) {
    // upload to cloudinary

return  new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({resource_type: "image", folder:"generated_ai_images", format: "webp"},(error, uploadResult) => {
        if (error) {
            return reject(error);
        }
        return resolve(uploadResult);
    }).end(buffer);
});
}

