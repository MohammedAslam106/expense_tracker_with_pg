'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { TbLoader2 } from "react-icons/tb"
import { toast } from "react-toastify"

interface pageProps{
    
}

const loginSchema=z.object({
    email:z.string().email()
})

type formData=z.infer<typeof loginSchema>

export default function Page({}:pageProps ){
    const [loader,setLoader]=useState<boolean>(false)
    const {register,setError,formState:{errors},handleSubmit}=useForm<formData>({
        // resolver:zodResolver(loginSchema)
    })
    async function loginWithProviders(data:formData){
        setLoader(true)
        const login=await (await fetch('/api/login-with-providers',{
            method:'POST',
            body:JSON.stringify({
                email: data.email
            })
        })).json()
        console.log(login)
        if(login){
            toast.promise(new Promise((resolve,reject)=>{
                if(!login.token) {
                    setTimeout(reject,3000)
                    setLoader(false)
                }
                setTimeout(resolve,3000)
            }),{
                success:'Signedin successfully!',
                pending:'Wait a moment',
                error:login.error
            })
        }
        if(login.token){
            window.localStorage.setItem('token',login.token)
            window.location.reload()
            }
    }
    return(
        <div className='sm:px-24 px-10 bg-[#010922] text-white h-screen flex flex-col justify-center items-center'>
            <div className=" sm:mb-0 mb-10 flex flex-col justify-center items-center gap-3 bg-purple-500 bg-opacity-10 p-6 sm:p-10 rounded shadow-sm">
                <h1 className=" text-2xl sm:text-3xl font-bold sm:mb-14">Login with providers</h1>
                <form id="login-with-providers" onSubmit={handleSubmit(loginWithProviders)} >
                <div className=" ">
                    <label className=" font-semibold mb-2">Email or Username:</label>
                    <input {...register('email',{required:'This field is required'})} type="text" placeholder="Email or Username" className="px-4 py-2 w-full placeholder:text-white rounded shadow-sm bg-transparent ring-1" />
                </div>
                </form>
                <button disabled={loader} type="submit" form="login-with-providers" className=" w-full flex justify-center rounded py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-300 hover:to-blue-300 font-semibold">
                    {loader 
                    ? 
                    <TbLoader2 size={25} className=' animate-spin'/>
                        :
                    <span>
                        Submit
                    </span>}
                </button>
            </div>
        </div>
    )
}