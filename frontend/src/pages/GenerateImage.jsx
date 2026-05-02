import React from 'react'
import { IMAGE_RESOLUTION } from '../constant'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateImage } from '../services/image';
import { FaImage, FaDownload } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { downloadImage } from '../utils/global';


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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-10">

  <div className="text-center max-w-2xl mx-auto">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">

      Generate Image
    </h1>
    <p className="text-gray-500 mt-2 text-base sm:text-lg">
      Create nice looking image
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-10">

    {/* FORM SECTION */}
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 order-1">

      <form onSubmit={handleSubmit(formHandler)} className="space-y-6">

        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="resolution"
          >
            Resolution
          </label>

          <select
            id="resolution"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            {...register("resolution")}
          >
            {
              IMAGE_RESOLUTION.map((res)=>(
                <option key={res.value} value={res.val}>
                  {res.label}
                </option>
              ))
            }
          </select>
        </div>

        {
          errors?.resolution?.message &&
          <p className="text-red-500 text-xs mt-1">
            {errors?.resolution?.message}
          </p>
        }

        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="prompt"
          >
            Prompt
          </label>

          <textarea
            id="prompt"
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            {...register("prompt")}
          />
        </div>

        {
          errors?.prompt?.message &&
          <p className="text-red-500 text-xs mt-1">
            {errors?.prompt?.message}
          </p>
        }

       <button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition shadow flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSubmitting ? (
    <>
      <FaSpinner className="animate-spin text-lg" />
      Generating Image...
    </>
  ) : (
    <>
      <IoSparkles />
      Generate Image
    </>
  )}
</button>

      </form>

      {
        error &&
        <div className="text-red-500 text-sm mt-4 bg-red-50 border border-red-200 p-2 rounded">
          {error}
        </div>
      }

    </div>


    {/* IMAGE SECTION */}
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col order-2">

      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FaImage className="text-indigo-600" />
        Generated Image
      </h2>

      {
        generatedImage ? (
          <div className="flex flex-col gap-6">

            <div className="rounded-xl overflow-hidden  ">
              <img
                src={generatedImage}
                alt="Generated Image"
                className="w-full h-auto object-contain "
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <a
              onClick={(e)=>{
                e.preventDefault();
                downloadImage(generatedImage)
              }}
                href={generatedImage}
                download
                className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                <FaDownload />
                Download
              </a>

              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition flex items-center justify-center gap-2"
                onClick={()=>{
                  setGeneratedImage(null);
                  reset();
                }}
              >
                <MdOutlineRefresh />
                Generate New
              </button>

            </div>

          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-center p-6 min-h-[250px] gap-3">
            <FaImage size={40} />
            <p>Your image will appear here</p>
          </div>
        )
      }

    </div>

  </div>

</div>
    )
}

export default GenerateImage
