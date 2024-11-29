'use client'

import { createUser } from "@/app/actions/user.action"
import { registerSchema } from "@/app/types/auth.types"
import { useState } from "react"
import { useForm,SubmitHandler } from "react-hook-form"
import { z } from "zod"


interface SignupFormProps{
    
}

export default function SignupForm({}:SignupFormProps ){

    // const session= auth()

    const {register,handleSubmit,formState:{errors}}=useForm<z.infer<typeof registerSchema>>()

    const [isLoading,setIsLoading]=useState(false)

    const emailRegEx=new RegExp("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}")

    const onSubmit:SubmitHandler<z.infer<typeof registerSchema>>=async (data)=>{
        try {
            setIsLoading(true)
            const newUser=await createUser({...data})

            console.log(newUser)
        } catch (error:any) {
            alert(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul className=" flex flex-col justify-center gap-3">
                <li className=" flex flex-col gap-1">
                    <label className=" font-semibold">Name:</label>
                    <input {...register('name',{required:{value:true,message:"The name is required!"}})} name="name"
                        type="text" placeholder="Name" className=" bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                    {/* {errors.name?errors.name?.message:null} */}
                </li>
                <li className=" flex flex-col gap-1">
                    <label className=" font-semibold">Email:</label>
                    <input {...register('email',{required:{value:true,message:"Email is required!"},pattern:{value:emailRegEx,message:'Provide the valid email address!'}})} name="email"
                        // {...register('email',{required:'This field is required!'})} 
                        type="text" placeholder="Email" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />

                    {/* {
                errors.email ?
                toast.error(errors.email?.message!) ? null :null:null
                }   */}
                </li>
                {/* <li className=" flex flex-col gap-1">
                    <label className=" font-semibold">Date of birth:</label>
                    <input name="dob"
                        {...register('dob',{required:'This field is required!'})} 
                        type="date" placeholder="Date of birth" className="w-full bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                    {errors.dob?errors.dob?.message:null}
                </li> */}
                <li className=" relative flex flex-col gap-1">
                    <label className=" font-semibold">Password:</label>
                    <input
                        {...register('password',{required:'This field is required!'})}
                        // type={showPassword ? 'text' :'password'} 
                        placeholder="Password"  name="password" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                    {/* {errors.password?errors.password?.message:null} */}
                    {/* <button type="button" onClick={()=>setShowPassword(!showPassword)} className=" absolute right-4 top-1/2">
                    {showPassword ?<TbEye size={22}/>:<TbEyeOff size={22}/>}
                </button> */}
                </li>
                <li className=" flex flex-col gap-1">
                    <label className=" font-semibold">Confirm password:</label>
                    <input
                        {...register('confirmPassword',{required:'This field is required!'})} 
                        // type={showPassword ? 'text' :'password'}  
                        placeholder="Confirm password"  name="confirmPassword" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                    {/* {errors.password?errors.password?.message:null} */}
                </li>
                <button disabled={isLoading} type="submit" className=" flex justify-center rounded py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-300 hover:to-blue-300 font-semibold  ">
                    {/* {
                    loader?
                    <TbLoader2 className=' animate-spin '/>:
                } */}
                    <span>Submit</span>
                </button>
            </ul>
        </form>
    )
}