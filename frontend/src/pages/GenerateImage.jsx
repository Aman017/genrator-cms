import React from 'react'
import { IMAGE_RESOLUTION } from '../constant'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateImage } from '../services/image';


const schema = z.object({
    resolution: z.string().min(1, "Please select a resolution"),
    prompt: z.string().min(1, "Please enter a valid prompt"),


});

const GenerateImage = () => {

    const [generatedImage, setGeneratedImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const formHandler = async (data) => {
        console.log(data)
        setIsSubmitting(true)
        setError(null);
        setGeneratedImage(null);


        try {
            const res = await generateImage(data);
            setGeneratedImage(res?.data?.image);



        } catch (error) {
            console.log("Error in generating image", error)
            setError("Fail to generate image. Please try again")
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <div className='mt-12'>
                <div className='text-center'>
                    <h1 className='text-4xl md:text-5xl' >Generate Image</h1>
                    <p className='text-lg' >Create nice looking image</p>
                </div>

            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 '>
                <div className='mt-12'>
                    <form onSubmit={handleSubmit(formHandler)}>
                        <div>
                            <label className='block' htmlFor="resolution"> Resolution   </label>
                            <select name="" id="resolution"
                                {...register("resolution")}
                            >
                                {
                                    IMAGE_RESOLUTION.map((res) => (
                                        <option key={res.value} value={res.val}> {res.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            errors?.resolution?.message && <p className='text-red-500 text-xs mt-1.5 flex items-center gap-1'>{errors?.resolution?.message}</p>
                        }
                        <div>
                            <label className='block' htmlFor="prompt"> Prompt   </label>
                            <textarea id='prompt' {...register("prompt")} rows={8} />
                        </div>
                        {
                            errors?.prompt?.message && <p className='text-red-500 text-xs mt-1.5 flex items-center gap-1'>{errors?.prompt?.message}</p>
                        }
                        <div>

                            <button className='border' type='submit'>Generate Image</button>
                        </div>

                    </form>
                    {
                        error && <div className='text-red-500 text-sm mt-1.5'>
                            {error}
                        </div>
                    }
                </div>
                <div>
                    {/* generative image  */}
                    <h2 className='text-2xl'>Generate Image</h2>
                    {
                        generatedImage ? (<div>
                            <div>
                                <img src={generatedImage} alt="Generated Image" />
                            </div>
                            <div>
                                <a href={generatedImage} download>Download</a>
                                <button onClick={()=>{
                                    setGeneratedImage(null);
                                    reset();
                                }}>Generate New</button>
                            </div>
                        </div>) : (
                            <div>Your image will appear here</div>

                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default GenerateImage
