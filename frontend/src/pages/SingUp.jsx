import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // or 'zod/v4'
import { singUp } from '../services/auth';
import { Link } from 'react-router-dom';



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

        } catch (error) {
            console.log(`error in signing in user: ${error}`)
            //todo:notify user
            
        }
        finally{
            setIsSubmitting(false)
        }

    }

  return (
    <div className='min-h-screen flex items-center justify-center gap-3.5'>
      <div>
        <h1 className='text-3xl'>Create Account</h1>
        <p className='text-sm'>Sing Up to get Started</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(submitHandler)}>
<div>
    <label htmlFor='name'>Full Name</label>
    <div>
        <input id='name' className='border' placeholder='Enter your full name' type='text'
        {...register("name")}/>
    </div>
</div>
{errors?.name?.message && <p className='text-red-600 text-xs'>{errors?.name?.message}</p>}
<div>
    <label htmlFor='email'> Email </label>
    <div>
        <input id='email' className='border' placeholder='Enter your email' type='text'
        {...register("email")}/>
    </div>
</div>
{errors?.email?.message && <p className='text-red-600 text-xs'>{errors?.email?.message}</p>}
<div>
  <label htmlFor='password'>Password</label>
  <div className=" relative">
    <input
      id='password'
      className='border px-2 py-1'
      placeholder='Enter your password'
      type={showPassword ? "text" : "password"}
      {...register("password")}
    />
    <button
      onClick={() => setShowPassword(!showPassword)}
      className="absolute  top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
    >
      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </button>
  </div>
  {errors?.password?.message && <p className='text-red-600 text-xs'>{errors?.password?.message}</p>}
</div>
<div>
    <button className='border px-4 py-2'>
        {isSubmitting ? <>
        <span className='animate-spin'>*</span> Creating account...
        </>:"Create Account"}
    </button>
</div>
        </form>
        <div>
            <p className='text-sm text-gray-600'>

            Already have an account? <Link to="/login" className='text-indigo-600'>Sing In</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default SingUp
