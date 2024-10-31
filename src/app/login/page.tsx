'use client'
import Image from "next/image";
import { useState } from "react";
import { TbEye, TbEyeOff, TbLoader2 } from "react-icons/tb";
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from 'react-toastify'
import { useRouter } from "next/navigation";

interface pageProps{
    
}


export default function Page({}:pageProps ){
    const navigate=useRouter()
    const loginSchema=z.object({
        email:z.string().email(),
        password:z.string()
    })
    const [loader,setLoader]=useState<boolean>(false)
    const [showPassword,setShowPassword]=useState<boolean>(false)
    type formData=z.infer<typeof loginSchema>
    const {register,setError,formState:{errors},handleSubmit}=useForm<formData>({
        resolver:zodResolver(loginSchema)
    })

    const onSubmit=async(data:formData)=>{
        try {
            setLoader(true)
            console.log(data)
            const response=await (await fetch('/api/login-user',{
                method:'POST',
                body:JSON.stringify({
                    email:data.email,
                    password:data.password
                }),
                headers:{
                    'content-type':'application/json'
                }
            })).json()
            toast.promise(new Promise((resolve,reject)=>{
                setTimeout(resolve,3000)
            
            }),{
                success:'Signed up successfully!',
                pending:'Wait a moment',
                error:response.error
            })
            console.log(response)
            window.localStorage.setItem('token',response.token)
        } catch (error:any) {
            console.log(error.message)
        }finally{
            setLoader(false)
        }
    }

    return(
        <>
            <div className=' xs:px-5 px-10 py-10 sm:px-20 bg-[#010922] min-h-screen flex felx-col justify-center items-center text-white'>
                <div className=" w-full flex justify-center gap-24 items-center ">
                    <div className=" sm:block hidden w-full ">
                        <Image className="" src={'/login.svg'} alt="not found" width={500} height={100}/>
                    </div>
                    <div className=" bg-[#82498c] bg-opacity-40 p-5 shadow-2xl rounded w-[80%] xs:w-full sm:min-w-[400px]">
                        <div className=" flex flex-col justify-center items-center gap-5">
                            <button onClick={()=>navigate.push('/login-with-providers')} disabled={loader} className=" disabled:ring-1 disabled:bg-transparent hover:bg-transparent hover:ring-1 hover:text-white ring-gray-300 flex justify-center items-center gap-3 w-full rounded shadow-sm px-6 py-2 bg-white text-black font-semibold" type="button">
                                {loader?<TbLoader2 className=' animate-spin '/>:<embed className=" w-6" src="/google.svg" />}
                                <span>
                                    Login with Google
                                </span>
                            </button>
                            <button onClick={()=>navigate.push('/login-with-providers')} disabled={loader} className="disabled:ring-1 disabled:bg-transparent hover:bg-transparent hover:ring-1 hover:text-white ring-gray-300 flex justify-center items-center gap-2 w-full rounded shadow-sm px-6 py-1 bg-white font-semibold text-black" type="button">
                                {loader?<TbLoader2 className=' animate-spin '/>:<embed className=" w-8" src="/github.svg" />}
                                <span>
                                    Login with Github
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
                                <label className=" font-semibold">Email or Username:</label>
                                <input {...register('email',{required:'This field is required'})} type="text" placeholder="Email" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                            </li>
                            <li className=" relative flex flex-col gap-1">
                                <label className=" font-semibold">Password:</label>
                                <input {...register('password',{required:'This field is required'})} type={showPassword ? 'text':'password'} placeholder="Password" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                                <button type="button" onClick={()=>setShowPassword(!showPassword)} className=" absolute right-4 top-1/2">
                                    {showPassword ?<TbEye size={22}/>:<TbEyeOff size={22}/>}
                                </button>
                            </li>
                            <li className=" flex flex-col gap-1">
                                <label className=" font-semibold">Confirm password:</label>
                                <input {...register('password',{required:'This field is required'})} type={showPassword ? 'text':'password'} placeholder="Confirm password" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                            </li>
                            <a href="/forgot-password" className=" text-blue-200 underline">Forgot password?</a>
                            <button type="submit" className=" rounded py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-300 hover:to-blue-300 font-semibold  ">
                                <div className=" flex justify-center items-center">
                                    {loader?<TbLoader2 size={25} className=' animate-spin'/> : <span>Submit</span>}
                                </div>
                            </button>
                        </ul>  
                        </form>
                        <p className=" text-center my-1" >New user? <span className=" text-blue-200 underline"><a href="/signup">Register</a></span></p>
                    </div>
                </div>
            </div>
        </>
    )
}