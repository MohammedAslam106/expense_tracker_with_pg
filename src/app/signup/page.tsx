'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbEye, TbEyeCancel, TbEyeOff, TbLoader, TbLoader2 } from "react-icons/tb";
import {useForm,SubmitHandler} from 'react-hook-form'
import { userSchema } from "@/helpers/types/user";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {  toast } from "react-toastify"
import { useRouter } from "next/navigation";
import {signIn,signOut,useSession} from "next-auth/react"

interface pageProps{
    
}

type user=z.infer<typeof userSchema>

export default function Page(this: any, {}:pageProps ){
    const router=useRouter()
    const [loader,setLoader]=useState<boolean>(false)
    const [showPassword,setShowPassword]=useState<boolean>(false)

    const {handleSubmit,register,setError,formState:{errors}}=useForm<user>({
        resolver:zodResolver(userSchema)
    })

    const onSubmit=async(data:user)=>{
        try {
            console.log(data)
            const response=await (await fetch('/api/create-user',{
                method:"POST",
                body:JSON.stringify({
                    ...data
                }),
                headers:{
                    'content-type':'application/json'
                }
            })).json()
            toast.promise(new Promise((resolve,reject)=>{
                if(response?.error?.includes('duplicate key value')){
                    console.log(response.error)
                    const error= new Error('Email already in use')
                    reject(error)
                }else {
                    setTimeout(resolve,3000)
                }
            }),{
                success:'Signed up successfully!',
                pending:'Wait a moment',
                error:'Email already in use!'
            })
            console.log(response)
            if(response.result){
                router.push('/login')
            }
        } catch (error) {
            if(error instanceof z.ZodError){
                setError("email",error)
            }
        }
    }

    return(
        <>
            {errors.name && toast.error(errors.name?.message!) }
            {errors.dob && toast.error(errors.dob?.message!) }
            {errors.password && toast.error(errors.password.message)}
            <div className=' xs:px-5 px-10 py-10 sm:px-20 bg-[#010922] min-h-screen flex felx-col justify-center items-center text-white'>
                <div className=" w-full flex justify-center gap-24 items-center ">
                    <div className=" sm:block hidden w-full ">
                        <Image className="" src={'/signup.svg'} alt="not found" width={500} height={100}/>
                    </div>
                    <div className=" bg-[#82498c] bg-opacity-40 p-5 shadow-2xl rounded w-[80%] xs:w-full sm:min-w-[400px]">
                        <div className=" flex flex-col justify-center items-center gap-5">
                            <button onClick={()=>signIn('google')} disabled={loader} className=" disabled:ring-1 disabled:bg-transparent hover:bg-transparent hover:ring-1 hover:text-white ring-gray-300 flex justify-center items-center gap-3 w-full rounded shadow-sm px-6 py-2 bg-white text-black font-semibold" type="button">
                                {loader?<TbLoader2 className=' animate-spin '/>:<embed className=" w-6" src="/google.svg" />}
                                <span>
                                    Sign up with Google
                                </span>
                            </button>
                            <button onClick={()=>signIn('github')} disabled={loader} className="disabled:ring-1 disabled:bg-transparent hover:bg-transparent hover:ring-1 hover:text-white ring-gray-300 flex justify-center items-center gap-2 w-full rounded shadow-sm px-6 py-1 bg-white font-semibold text-black" type="button">
                                {loader?<TbLoader2 className=' animate-spin '/>:<embed className=" w-8 " src="/github.svg" />}
                                <span>
                                    Sign up with Github
                                </span>
                            </button>
                        </div>
                        <div className=" my-5 mt-8 flex items-center ">
                           <hr className=" flex-grow h-1" /> 
                           <span className=" inline mx-2">or</span> 
                           <hr className=" flex-grow h-1" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <ul className=" flex flex-col justify-center gap-3">
                            <li className=" flex flex-col gap-1">
                                <label className=" font-semibold">Name:</label>
                                <input required {...register('name',{required:'This field is required!'})} type="text" placeholder="Name" className=" bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                                {errors.name?errors.name?.message:null}
                            </li>
                            <li className=" flex flex-col gap-1">
                                <label className=" font-semibold">Email:</label>
                                <input {...register('email',{required:'This field is required!'})} type="" placeholder="Email" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                                
                                {
                                errors.email ?
                                toast.error(errors.email?.message!) ? null :null:null
                                }  
                            </li>
                            <li className=" flex flex-col gap-1">
                                <label className=" font-semibold">Date of birth:</label>
                                <input {...register('dob',{required:'This field is required!'})} type="date" placeholder="Date of birth" className="w-full bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                                {errors.dob?errors.dob?.message:null}
                            </li>
                            <li className=" relative flex flex-col gap-1">
                                <label className=" font-semibold">Password:</label>
                                <input {...register('password',{required:'This field is required!'})} type={showPassword ? 'text' :'password'} placeholder="Password" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                                {errors.password?errors.password?.message:null}
                                <button type="button" onClick={()=>setShowPassword(!showPassword)} className=" absolute right-4 top-1/2">
                                    {showPassword ?<TbEye size={22}/>:<TbEyeOff size={22}/>}
                                </button>
                            </li>
                            <li className=" flex flex-col gap-1">
                                <label className=" font-semibold">Confirm password:</label>
                                <input {...register('password',{required:'This field is required!'})} type={showPassword ? 'text' :'password'}  placeholder="Confirm password" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                                {errors.password?errors.password?.message:null}
                            </li>
                            <button type="submit" className=" flex justify-center rounded py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-300 hover:to-blue-300 font-semibold  ">
                                {
                                    loader?
                                    <TbLoader2 className=' animate-spin '/>:
                                    <span>Submit</span>
                                }
                            </button>
                        </ul>
                        </form>
                        <p className=" text-center my-1" >already have an account? <span className=" text-blue-200 underline"><a href="/login">Login</a></span></p>
                    </div>

                </div>
            </div>
        </>
    )
}