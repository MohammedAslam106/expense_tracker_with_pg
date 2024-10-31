'use client'

import { useEffect, useState } from "react"
import { getTokenData } from "@/helpers/get-data-from-token"
import Image from 'next/image'
import MyModal from "@/components/Modal"
import { UploadButton } from "@/helpers/uploadthing" 
import { toast } from "react-toastify"

interface pageProps{
    
}

export default function Page({}:pageProps ){
    const [profile,setProfile]=useState<string>('')
    const[data,setData]=useState<any>()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(()=>{
        const res= getTokenData(window.localStorage.getItem('token')!)
        console.log(data)
        setData(res)
        const getProfilePicture=async()=>{
            const response=await (await fetch(`/api/get-profile-picture/${res.image}`,{
                method:'GET',
                headers:{
                'Content-Type':'application/json'
                }
            })).json()
            console.log(response)
            setProfile(response.image[0].image)
        }
        getProfilePicture()
    },[])
    const submitFile=async()=>{
        const updatingImage=await (await fetch('/api/update-image',{
            method:"POST",
            body:JSON.stringify({image:profile,id:data.image})
        })).json()
        console.log(updatingImage)
        // window.location.reload()
    }
    return(
        <>
            <div className=" text-white bg-[#010922] min-h-screen sm:px-24 px-6 flex flex-col justify-center items-center -mt-36 ">
                <h1 className=" text-2xl mb-10 font-semibold ">Change your profile picture</h1>
                <div className=" flex flex-col justify-center items-center gap-5">
                    <div  className=" sm:w-60 sm:h-60 w-48 h-48 ">
                        <Image onClick={()=>setIsOpen(true)} unoptimized className=" ring ring-purple-500 rounded-full shadow-sm bg-gray-400 w-full h-full" width={100} height={100} src={profile} alt='not found'></Image>
                    </div>
                    <div className=" flex justify-center items-center gap-2">
                        {/* <label className=" bg-purple-500 rounded shadow-sm px-4 py-2 hover:text-purple-500 hover:bg-transparent hover:ring ring-purple-500 ">
                            Edit Image
                            <input onChange={(e)=>setFormData(e.target.files?.[0])} accept=".jpg, .png, .jpeg" className=" hidden" type="file" placeholder="Change Picture" />
                        </label> */}
                        <UploadButton
                            endpoint="imageUploader"
                            appearance={{
                              button:
                                "ut-ready:bg-purple-500 ut-ready:hover:bg-transparent ut-ready:hover:ring ut-ready:ring-purple-500 ut-ready:hover:text-purple-500 ut-uploading:cursor-not-allowed   bg-none after:bg-purple-500",
                              container: "w-max border border-purple-500 p-0 flex-row rounded-md  bg-transparent",
                              allowedContent:
                                " flex h-8 flex-col items-center justify-center px-2 text-white",
                            }}
                            
                            content={{
                                button({ ready,isUploading }) {
                                  if (!ready) return <div>Wait...</div>;
                                  if (isUploading) return <div>Uploading...</div>
                                  return "Choose File";
                                },
                                // allowedContent({ready,fileTypes,isUploading}){
                                //     return !ready ? 'Wait...' :isUploading? 'Uploading...':fileTypes.
                                // }
                              }}
                            onClientUploadComplete={(res:any) => {
                            // Do something with the response
                            toast.success('Now save the file!')
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
                        <button onClick={()=>submitFile()} className=" px-4 py-2 rounded shadow-sm bg-blue-400 hover:text-blue-400 hover:bg-transparent hover:ring ring-blue-400" type="button">Save</button>
                    </div>
                </div>
            </div>
            <MyModal  isOpen={isOpen} closeModal={()=>setIsOpen(false)}>
                <Image unoptimized className=" w-full h-full object-cover" src={profile} alt="not found" width={100} height={100}/>
            </MyModal>
        </>
    )
}