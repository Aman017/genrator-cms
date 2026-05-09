import React, { useEffect, useState } from 'react'
import { generateImage, imageHistory } from '../services/image';
import { TbLoader3 } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";

const ImageHistory = () => {
const [ isLoading, setIsLoading] = useState(true);
const [ error, setError] = useState(null);
const [ generatedImage, setGeneratedImage] = useState([]);

async function getImage() {
    try {
        setIsLoading(true);
        setError(null);
//make api call
const response = await imageHistory();
setGeneratedImage(res?.data?.images)

    } catch (error) {
        console.error("Error in fetching image history", error)
        setError("failed to load image history. please try again ")
    }finally{
        setIsLoading(false)
    }
    
}

useEffect(()=>{
    getImage()
},[])
  return (
     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-10">
    
      <div className=" max-w-6xl mx-auto">
        <div className='text-center mb-8'>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">
    
  Image History
        </h1>
        <p className="text-gray-500 mt-2 text-base sm:text-lg">
          View all your generated images
        </p>
        </div>
      
    
    {
        isLoading && (<div className='flex flex-col items-center justify-center min-h-[400px]' >  
            <TbLoader3 className="animate-spin h-10 w-10 mb-4 text-orange-600"/>
            <p className='text-lg  text-gray-700 '>Loading images...</p>
        </div>
    )}

    {
        error && !isLoading && (<div className='border border-red-600 rounded-lg p-8 bg-red-50' >  
            <p className='text-red-600 flex items-center justify-center gap-3'><MdErrorOutline />{error}</p>
            <button  onClick={getImage} className='mx-auto block bg-red-600 text-white px-4 p-2 rounded-lg mt-6 ' >Try again</button>
             </div>)
    }

    {
        !isLoading && !error && generateImage?.length===0 && ( <div className='flex flex-col items-center justify-center min-h-[200px] border rounded'>
            <FcAddImage className='w-12 h-12' />
            <p>No image yet</p>
            <p>Start generating images</p>
        </div>
    )}

    {
        !isLoading && !error && generateImage>0 && ( <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'> 
        {
            generateImage?.map((image, index)=>(
                <div key={image._id || index}>

                    <div className='relative h-full w-full'>
                        <img src={image.url} alt="" className='object-cover' />
                        <div className=' absolute bg-black opacity-0 hover:opacity-100'>

                            <a href={image.url}>Download</a>

                        </div>
                    </div>
                    <div>
                        <div className='flex  justify-between'>
                            <p>{image.createdAt}</p>
                            <p>Ai generated</p>
                        </div>
                        <div>
                            {image.prompt}
                        </div>
                    </div>
                </div>
            ))
        }
        
        </div>
    )}
</div>
    </div>
  )
}

export default ImageHistory
