import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // or 'zod/v4'
import { singUp } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingIcon } from '../components/Icons';
import { toast } from 'react-toastify';



const schema = z.object({
  name: z.string().min(2,"Name must be at least 2 Characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string()
  .min(8,"Password must be at least 8 characters long")
  .regex(/[A-Z]/,"Password must contain at least one uppercase letter")
  .regex(/[a-z]/,"Password must contain at least one lowercase letter")
  .regex(/[0-9]/,"Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/,"Password must contain at least one spacial character"),

});

const SingUp = () => {

  const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
 const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver:zodResolver(schema),
  });
  console.log(errors)


    const submitHandler = async(data)=>{
        console.log(data)
        setIsSubmitting(true)
        try {
            await singUp(data);
            //todo : notify user
            toast.success("Account Created successfully. Please login")
            reset();
            navigate("/login")

        } catch (error) {
            console.log(`error in signing in user: ${error}`)
            //todo:notify user
            toast.error("Sign up failed. Please try again")
        }
        finally{
            setIsSubmitting(false)
        }

    }

  return (
  <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4'>
  
  <div className='text-center mb-8'>
    <h1 className='text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
      Create Account
    </h1>
    <p className='text-sm text-gray-500 mt-2'>Sign Up to get Started</p>
  </div>

  <div className='w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-2xl'>
    
    <form onSubmit={handleSubmit(submitHandler)} className='space-y-5'>
      
      <div>
        <label htmlFor='name' className='block text-sm font-semibold text-gray-700 mb-2'>
          Full Name
        </label>
        <div>
          <input
            id='name'
            className='w-full border border-gray-200 bg-white/60 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300'
            placeholder='Enter your full name'
            type='text'
            {...register("name")}
          />
        </div>
      </div>
      {errors?.name?.message && (
        <p className='text-red-500 text-xs mt-1'>{errors?.name?.message}</p>
      )}

      <div>
        <label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2'>
          Email
        </label>
        <div>
          <input
            id='email'
            className='w-full border border-gray-200 bg-white/60 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300'
            placeholder='Enter your email'
            type='text'
            {...register("email")}
          />
        </div>
      </div>
      {errors?.email?.message && (
        <p className='text-red-500 text-xs mt-1'>{errors?.email?.message}</p>
      )}

      <div>
        <label htmlFor='password' className='block text-sm font-semibold text-gray-700 mb-2'>
          Password
        </label>
        <div className="relative">
          <input
            id='password'
            className='w-full border border-gray-200 bg-white/60 rounded-xl px-4 py-2.5 pr-11 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300'
            placeholder='Enter your password'
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition duration-200"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
        {errors?.password?.message && (
          <p className='text-red-500 text-xs mt-1'>{errors?.password?.message}</p>
        )}
      </div>

      <div>
        <button
          className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-indigo-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70'
        >
          {isSubmitting ? (
            <>
            <LoadingIcon style='animate-spin h-5 w-5'/>
              <span>Creating account...</span>
              
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </form>

    <div className='mt-6 text-center'>
      <p className='text-sm text-gray-600'>
        Already have an account?{" "}
        <Link
          to="/login"
          className='font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition'
        >
          Sign In
        </Link>
      </p>
    </div>
  </div>
</div>
  )
}

export default SingUp
