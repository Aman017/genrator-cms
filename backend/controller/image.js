    require("dotenv").config();
    const fs = require("fs")
    const { InferenceClient } = require("@huggingface/inference") ;
    const {RESOLUTION_MAP } = require("../constant")

    const client = new InferenceClient(process.env.HUGGING_FACE_API_KEY);

    // console.log(process.env.HUGGING_FACE_API_KEY)




    exports.generateImage = async(req,res)=>{
        try {
            console.log(`Started processing of image generating request for user id  `)
            
            const { prompt, resolution } = req.body;
    
            
            // todo uncomment after  adding  auth middleware
            // console.log(`Started processing og image generating request for user id  ${req.user.id}`)
    console.log("-->>", prompt, resolution)

    if(!process.env.HUGGING_FACE_API_KEY){
        console.log("hugging api is not configured")
        return res.status(500).json({
            message: "Intern server error"
        })
    }

    if(!prompt){
        return res.status(400).json({
            message: "Prompt is required"
        })
    }

    console.log(`Prompt: ${prompt} and Resolution ${resolution}`)

    const dimension = RESOLUTION_MAP[resolution] || RESOLUTION_MAP["1024x1024"];

    const image = await getImageBlob(prompt, dimension);

    const buffer = Buffer.from(await image.arrayBuffer());

    fs.writeFileSync("output.png", buffer);

    const uploadedImage = await uploadImage(buffer);
            // use service to generate image based on prompt --> image    

            //handle  image format

            // cloudinary for image upload => url

            //save prompt  and other details  along with url => for keep history

            //return the result

        } catch (error) {
            console.error(`Error in generating image. Error is ${error}`)
            return res.status(500).json({
                message: "Internal server issue"
            })
        }
    }

    async function  getImageBlob(prompt, dimension){
        // return image
    return await client.textToImage({
        provider:"auto",
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: prompt,
        parameters:{num_inference_steps:5,
            width: dimension.width,
            height: dimension.height,
        },
    });

    }   
    async function  uploadImage(buffer){
        // upload to cloudinary

    }   

