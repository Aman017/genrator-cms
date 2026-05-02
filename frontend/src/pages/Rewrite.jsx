import React from 'react'
import { IMAGE_RESOLUTION } from '../constant'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TfiWrite } from "react-icons/tfi";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { MdCopyAll } from "react-icons/md";
import { rewriteContent } from '../services/content';
import { toast } from 'react-toastify';


const schema = z.object({
    content: z.string().min(1, "content is required"),


});
const Rewrite = () => {

    const [rewrittenContent, setRewrittenContent] = useState(null);
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
        setRewrittenContent(null);


        try {
            const res = await rewriteContent(data);
            setRewrittenContent(res?.data?.content);



        } catch (error) {
            console.log("Error in rewriting content", error)
            setError("Fail to rewriting content. Please try again")
        }
        finally {
            setIsSubmitting(false)
        }
    }
const handleCopy = async ()=>{
    //write copy code or logic
    if(!rewrittenContent) return;
      try {
       await window.navigator.clipboard.writeText(rewrittenContent);
       toast.success("Content Copied successfully")
      } catch (error) {
        console.log(`failed to copy. Error is ${error}`)
      }
}

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-10">

  <div className="text-center max-w-2xl mx-auto">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">

Rewrite Content
    </h1>
    <p className="text-gray-500 mt-2 text-base sm:text-lg">
      Rewrite your content with AI
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-10">

    {/* FORM SECTION */}
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 order-1">

      <form onSubmit={handleSubmit( formHandler)} className="space-y-6">

      

        <div>
          <label
            className="block text-xl font-semibold text-gray-700 mb-2"
            htmlFor="content"
          >
            content
          </label>

          <textarea
            id="content"
            rows={8}
            placeholder='Enter the content you want to rewrite...'
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            {...register("content")}
          />
        </div>

        {
          errors?.content?.message &&
          <p className="text-red-500 text-xs mt-1">
            {errors?.content?.message}
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
     Rewriting...
    </>
  ) : (
    <>
      <IoSparkles />
      Rewrite content
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
        
        <TfiWrite className="text-emerald-600" />
        Rewritten content 
      </h2>

      {
        rewrittenContent ? (
          <div className="flex flex-col gap-6">

            <div className="rounded-xl overflow-hidden  ">
             <p className='text-gray-600'>{rewrittenContent}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={handleCopy}
                className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                <MdCopyAll />
                Copy
              </button>

              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition flex items-center justify-center gap-2"
                onClick={()=>{
                  setRewrittenContent(null);
                  reset();
                }}
              >
                <MdOutlineRefresh />
               Rewrite New
              </button>

            </div>

          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-center p-6 min-h-[250px] gap-3">
        <TfiWrite className="text-emerald-600"  />            
            <p>Your rewritten will appear here</p>
          </div>
        )
      }

    </div>

  </div>

</div>
    )
}

export default Rewrite