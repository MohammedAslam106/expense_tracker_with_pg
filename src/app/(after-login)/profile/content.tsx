'use client'

import {  useEffect, useRef, useState } from "react"
import { getTokenData } from "@/helpers/get-data-from-token"
import Image from 'next/image'
import MyModal from "@/components/Modal"
import { UploadButton } from "@/helpers/uploadthing"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import { TbCircleCheck, TbCircleX, TbLoader2 } from "react-icons/tb"
import { useForm,SubmitHandler } from "react-hook-form"
import { z, ZodError } from "zod"
import { Session } from "next-auth"
import { verificationEmail } from "@/helpers/verificationEmail"

interface pageProps {
    session:Session | null
}

export default function Content({session }: pageProps) {
    const [otp,setOtp]=useState(0)
    const [data, setData] = useState<any>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading,setIsLoading]=useState(false)

    const [eventTime,setEventTime]=useState(0)
    const [remainingTime,setRemainingTime]=useState(0)

    const [disableResendBtn,setDisableResendBtn]=useState(true)
    const [verifyEmailModal,setVerifyEmailModal]=useState(false)
    // const { data: session } = useSession()
    const [profile, setProfile] = useState<string | null>(session?.user?.image || null)
    const otpRef=useRef<HTMLInputElement | null>(null)


    const timeIntervalRef=useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const res = getTokenData(window.localStorage.getItem('token')!)
        // console.log(data)
        setData(res)
        const getProfilePicture = async () => {
            const response = await (await fetch(`/api/get-profile-picture/${res.image}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json()
            // console.log(response)
            setProfile(response.image[0].image)
        }
        getProfilePicture()
    }, [])

    useEffect(()=>{
        if(verifyEmailModal){
            timeIntervalRef.current=setInterval(()=>{
                const currentTime=new Date().getTime()

                const remainingTime=eventTime-currentTime

                if(remainingTime <= 0){
                    if(timeIntervalRef.current){
                        clearInterval(timeIntervalRef?.current)
                    }
                    setDisableResendBtn(false)
                    return
                }
                setRemainingTime(remainingTime)
            },1000)

            return ()=>{
                if(timeIntervalRef.current){
                    clearInterval(timeIntervalRef?.current)
                }
            }
        }

    },[verifyEmailModal,eventTime])

    const formData=z.object({
        name:z.string(),
        email:z.string().email()
    })
    
    const {register,formState:{errors},handleSubmit,getValues}=useForm<z.infer<typeof formData>>({
        defaultValues:{
            name:session?.user.name as string,
            email:session?.user.email as string 
        }
    })

    const updateVerifiedEmailAddress=async({email}:{email:string})=>{
        try {
            setIsLoading(true)
            const res= await fetch(`/api/update-user/${session?.user.id}`,{
                method:'PATCH',
                body:JSON.stringify({
                    emailVerified: new Date(),
                    email
                })
            })

            if(!res.ok){
                throw Error('Something went wrong!')
            }
            const result=await res.json()
            console.log(result)
            toast.success('Verified email is updated!')
        } catch (error:any) {
            // alert(error.message)
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    const onSubmit:SubmitHandler<z.infer<typeof formData>>=async(data)=>{
        try {
            // console.log(50,data)
            setIsLoading(true)
            const res= await fetch(`/api/update-user/${session?.user.id}`,{
                method:'PATCH',
                body:JSON.stringify({
                    name:data.name,
                    image:profile
                })
            })

            if(!res.ok){
                throw Error('Something went wrong!')
            }
            const result=await res.json()
            toast.success('User profile is updated!',{
                position:'top-right',
            })
            console.log(135,result)
        } catch (error:any) {
            if(error instanceof ZodError){
                // alert(error.issues[0].message)
                toast.error(error.issues[0].message)
            }
            // alert(error.message)
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* { */}
                {/* session?.user? */}
                    <div className=" w-full flex justify-between items-center bg-[#010922]">
                        <div className=" w-full text-white bg-[#010922] min-h-screen sm:px-24 px-6 flex flex-col justify-center items-center -mt-36 ">
                            <h1 className=" text-2xl mb-10 font-semibold ">Change your profile picture</h1>
                            <div className=" flex flex-col justify-center items-center gap-5">
                                <div className=" sm:w-60 sm:h-60 w-48 h-48 ">
                                    <Image onClick={() => setIsOpen(true)} unoptimized className=" ring ring-purple-500 rounded-full shadow-sm bg-gray-400 w-full h-full" width={100} height={100} src={profile ?? session?.user?.image ?? `https://ui-avatars.com/api/?rounded=true&background=random&bold=true&format=svg&name=${session?.user?.name}`} alt='not found'></Image>
                                </div>
                                <div className=" flex justify-center items-center gap-2">
                                    {/* <label className=" bg-purple-500 rounded shadow-sm px-4 py-2 hover:text-purple-500 hover:bg-transparent hover:ring ring-purple-500 ">
                                        Edit Image
                                        <input onChange={(e)=>setFormData(e.target.files?.[0])} accept=".jpg, .png, .jpeg" className=" hidden" type="file" placeholder="Change Picture" />
                                    </label> */}
                                    <UploadButton className=" border-0"
                                        endpoint="imageUploader"
                                        appearance={{
                                            button:
                                                "ut-ready:bg-purple-500 ut-ready:hover:bg-transparent ut-ready:hover:ring ut-ready:ring-purple-500 ut-ready:hover:text-purple-500 ut-uploading:cursor-not-allowed   bg-none after:bg-purple-500 ",
                                            container: "w-max border border-purple-500 p-0 flex-row rounded-md  bg-transparent",
                                            allowedContent:
                                                " flex h-8 flex-col items-center justify-center px-2 text-white",
                                        }}

                                        content={{
                                            button({ ready, isUploading }) {
                                                if (!ready) return <div>Wait...</div>;
                                                if (isUploading) return <div>Uploading...</div>
                                                return "Choose File";
                                            },
                                            allowedContent({ready,fileTypes,isUploading}){
                                                // return !ready ? 'Wait...' :isUploading? 'Uploading...':fileTypes
                                                return null
                                            }
                                        }}
                                        onClientUploadComplete={(res: any) => {
                                            // Do something with the response
                                            // toast.success('Now save the file!')
                                            setProfile(res[0]?.url)
                                            console.log("Files: ", res);

                                        }}
                                        onUploadError={(error: Error) => {
                                            // Do something with the error.
                                            console.log(error)
                                            // alert(`ERROR! ${error.message}`);
                                            toast.error(error.message)
                                        }}
                                    />
                                    {/* <button onClick={() => submitFile()} className=" px-4 py-2 rounded shadow-sm bg-blue-400 hover:text-blue-400 hover:bg-transparent hover:ring ring-blue-400" type="button">Save</button> */}
                                </div>
                            </div>
                        </div>
                        
                        <div  className=" w-full px-5 py-5 flex flex-col justify-center items-center gap-2">
                            <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
                                <ul className=" max-w-md w-full flex flex-col justify-center items-center gap-8">
                                    <li className=" w-full flex flex-col justify-center items-start gap-2">
                                        <label className=" text-white font-semibold text-[18px]" htmlFor="Name">Name:</label>
                                        <input {...register('name')}  placeholder="Name" className={` placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white
                                            `} type="text"/>
                                    </li>

                                    <li className=" w-full flex flex-col justify-center items-start gap-2">
                                        <label className=" text-white font-semibold text-[18px] relative" htmlFor="Name">
                                            Eamil:
                                            <span className=" cursor-pointer absolute top-1 right-[-25px]
                                            ">
                                                {session?.user?.emailVerified ?    
                                                    <span className="relative after:block hover:after:visible after:invisible after:content-['Verified'] after:text-[14px] after:text-white after:bg-slate-900 after:rounded-md after:shadow-sm after:absolute after:left-0 after:top-4 after:z-10 after:px-2 after:py-1.5">
                                                        <TbCircleCheck size={20} className=" stroke-green-500  "/>
                                                    </span>
                                                    :
                                                    <span className="relative after:block hover:after:visible after:invisible after:content-['Unverified'] after:text-[14px] after:text-white after:bg-slate-900 after:rounded-md after:shadow-sm after:absolute after:left-0 after:top-4 after:z-10 after:px-2 after:py-1.5">
                                                        <TbCircleX size={20} className=" stroke-red-500
                                                        "/>
                                                    </span>
                                                }
                                            </span>
                                        </label>
                                        <div className=" w-full flex justify-center items-center gap-1">
                                            <input {...register('email',{required:{value:true,message:'Email is required.'}})} 
                                            readOnly={session?.user.emailVerified}  placeholder="Email" className={`placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white 
                                            ${session?.user.emailVerified && 'hover:cursor-not-allowed'}`} type="text"/>
                                            
                                            <button type="button" 
                                            onClick={async()=>{
                                                setVerifyEmailModal(true)
                                                setEventTime(new Date(new Date().getTime() + 150*1000).getTime())
                                                try {
                                                    const newOtp= Math.floor(Math.random()*1000000)+10000

                                                    setOtp(newOtp)
                                                    const response=await verificationEmail({username:session?.user.name || '',otp:newOtp.toString(),emailTo:getValues().email as string})

                                                    console.log(response)
                                                } catch (error:any) {
                                                    // alert(error.message)
                                                    toast(error.message,{
                                                        type:'error'
                                                    })
                                                }
                                                }} disabled={session?.user.emailVerified} className={` text-white bg-violet-600 rounded-md px-3 py-4 font-semibold text-sm hover:ring hover:bg-transparent ring-purple-500 shadow-[0_0_10px_purple]
                                                ${session?.user.emailVerified && 'bg-slate-400 text-gray-600 hover:ring-0 hover:bg-slate-500 hover:cursor-not-allowed'}`} >
                                                Verify
                                            </button>
                                        </div>
                                    </li>

                                    <li className=" w-full self-end">
                                        <button disabled={isLoading} onClick={()=>{
                                            if(!session?.user.emailVerified){
                                                toast.error('Please verify your email before updating the profile!')
                                            }
                                        }} className=" font-semibold px-5 py-2 rounded shadow-[0_0_10px_teal] bg-teal-300 hover:bg-transparent text-white min-w-[150px] min-h-[40px] flex justify-center items-center" type="submit">
                                            {isLoading ? <TbLoader2 size={25} className=" animate-spin"/> :'Update Profile'}
                                            {/* <TbLoader2 size={25} className=" animate-spin"/> */}
                                        </button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>

            <MyModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <Image unoptimized className=" w-full h-full object-cover" src={profile || ''} alt="not found" width={100} height={100} />
            </MyModal>

            <MyModal isOpen={verifyEmailModal} closeModal={() => {
                if(timeIntervalRef.current){
                    clearInterval(timeIntervalRef.current)
                }
                setVerifyEmailModal(false)
                }}>
                <div className=" w-full flex flex-col justify-center items-end gap-4">
                    <p className=" self-start text-white text-lg">
                        Check <b>{getValues().email}</b> for verification code.
                    </p>
                    <p className=" w-full text-white text-[14px] font-normal text-center">
                        Resend code after 0{Math.floor((remainingTime / (1000 * 60)) % 60)}:
                        {(Math.floor((remainingTime / 1000) % 60) <= 9 ? '0' :'')}{(Math.floor((remainingTime / 1000) % 60))} secs.
                    </p>
                    <input ref={otpRef} placeholder="Verification code" className=" placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white" type="text"/>
                    <div className=" flex w-full justify-end items-center gap-2">
                        <button disabled={disableResendBtn} className={` ${disableResendBtn && 'cursor-not-allowed'} font-semibold px-5 py-2 rounded shadow-[0_0_10px_gray] bg-gray-300 hover:bg-transparent text-white`}>
                            Resend
                        </button>

                        <button disabled={(otpRef.current?.value == '' || isLoading)} onClick={()=>{
                            console.log(otpRef.current?.value,otp)
                            if(otpRef){
                                if(otpRef.current?.value == otp.toString()){
                                    updateVerifiedEmailAddress({email:getValues().email})
                                }
                            }
                        }} className=" font-semibold px-5 py-2 rounded shadow-[0_0_10px_teal] bg-teal-300 hover:bg-transparent text-white">
                            {isLoading ? <TbLoader2 className=" animate-spin"/> :'Submit'}
                        </button>
                    </div>
                </div>
            </MyModal>
        </>
    )
}