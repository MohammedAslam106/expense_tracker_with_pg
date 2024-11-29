// 'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbEye, TbEyeCancel, TbEyeOff, TbLoader, TbLoader2 } from "react-icons/tb";
import { useForm, SubmitHandler } from 'react-hook-form'
import { userSchema } from "@/helpers/types/user";
import { z } from 'zod'
// import {zodResolver} from '@hookform/resolvers/zod'
import { toast, ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation";
import { signIn } from "../../../next.auth.config";
// import { db } from "@/db/db.config";
import * as schemas from '@/db/schemas/user'
import {users} from '@/db/schemas/user'
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { db } from "@/db/db.config";
import { eq } from "drizzle-orm";
import SignupForm from "@/components/forms/SignupForm";

interface pageProps {

}

type user = z.infer<typeof userSchema>

export default function Page(this: any, { }: pageProps) {
    // const router=useRouter()
    // const [loader,setLoader]=useState<boolean>(false)
    // const [showPassword,setShowPassword]=useState<boolean>(false)

    // const {handleSubmit,register,setError,formState:{errors}}=useForm<user>({
    //     // resolver:zodResolver(userSchema)
    // })

    const onSubmit=async(data:FormData)=>{
        'use server'
        try {
            console.log(33,data.get('email'))
            // const response=await (await fetch('/api/create-user',{
            //     method:"POST",
            //     body:JSON.stringify({
            //         ...data
            //     }),
            //     headers:{
            //         'content-type':'application/json'
            //     }
            // })).json()
            // toast.promise(new Promise((resolve,reject)=>{
            //     if(response?.error?.includes('duplicate key value')){
            //         console.log(response.error)
            //         const error= new Error('Email already in use')
            //         reject(error)
            //     }else {
            //         setTimeout(resolve,3000)
            //     }
            // }),{
            //     success:'Signed up successfully!',
            //     pending:'Wait a moment',
            //     error:'Email already in use!'
            // })
            // console.log(response)
            // if(response.result){
            //     router.push('/login')
            // }
            // const db = drizzle(sql,{schema:schemas})

            // const res=await db.find

            // const res= await db.select({email:data.get('email') as any}).from(users);

            // console.log(70,res)


            // const psql=drizzle(sql,{schema:schemas})

            // const existedUser = await psql.query.users.findFirst({
            //     where: eq(schemas.users.email, data.get('email')),
            // })
            // db.select().from(cars)
            // .where(eq(cars.make, 'Ford'))
            const res=await db.select().from(users).where(eq(users.email,data.get('email') as string))

            console.log(res,76)

            if(res.length==0){
                // Continute with creating user
                const hashPassword=null

                const creatingUser=await db.insert(users).values({
                    email:data.get('email') as string,

                })
            }else{
                toast('User already exists!',{
                    type:'error',
                    position:'bottom-right'
                })
            }

        } catch (error:any) {
            console.log(error.message)
            if(error instanceof z.ZodError){
                // setError("email",error)
            }
        }
    }

    return (
        <>
            {/* {errors.name && toast.error(errors.name?.message!) }
            {errors.dob && toast.error(errors.dob?.message!) }
            {errors.password && toast.error(errors.password.message)} */}
            <div className=' xs:px-5 px-10 py-10 sm:px-20 bg-[#010922] min-h-screen flex felx-col justify-center items-center text-white'>
                <div className=" w-full flex justify-center gap-24 items-center ">
                    <div className=" sm:block hidden w-full ">
                        <Image className="" src={'/signup.svg'} alt="not found" width={500} height={100} />
                    </div>
                    <div className=" bg-[#82498c] bg-opacity-40 p-5 shadow-2xl rounded w-[80%] xs:w-full sm:min-w-[400px]">
                        <div className=" flex flex-col justify-center items-center gap-5">
                            <form action={async () => {
                                'use server'
                                await signIn('google')
                            }}>
                                <button className=" disabled:ring-1 disabled:bg-transparent hover:bg-transparent hover:ring-1 hover:text-white ring-gray-300 flex justify-center items-center gap-3 w-full rounded shadow-sm px-6 py-2 bg-white text-black font-semibold" type="submit">
                                    {/* {loader?<TbLoader2 className=' animate-spin '/>:<embed className=" w-6" src="/google.svg" />} */}
                                    <embed className=" w-6" src="/google.svg" />
                                    <span>
                                        Login with Google
                                    </span>
                                </button>

                            </form>

                            <form action={async () => {
                                'use server'
                                await signIn('github')
                            }}>
                                <button className="disabled:ring-1 disabled:bg-transparent hover:bg-transparent hover:ring-1 hover:text-white ring-gray-300 flex justify-center items-center gap-2 w-full rounded shadow-sm px-6 py-1 bg-white font-semibold text-black" type="submit">
                                    {/* {loader?<TbLoader2 className=' animate-spin '/>:<embed className=" w-8 " src="/github.svg" />} */}
                                    <embed className=" w-8 " src="/github.svg" />
                                    <span>
                                        Login with Github
                                    </span>
                                </button>
                            </form>
                        </div>
                        <div className=" my-5 mt-8 flex items-center ">
                            <hr className=" flex-grow h-1" />
                            <span className=" inline mx-2">or</span>
                            <hr className=" flex-grow h-1" />
                        </div>
                        <SignupForm/>
                        <p className=" text-center my-1" >already have an account? <span className=" text-blue-200 underline"><a href="/login">Login</a></span></p>
                    </div>

                </div>
            </div>

            <ToastContainer/>
        </>
    )
}