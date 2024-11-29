'use client'
import SelectUi from "@/components/SelectUi";
import { categoryRequest, categoryResponse } from "@/types/api-requests-response/category";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { TbLoader2, TbX } from "react-icons/tb";
import { toast } from "react-toastify";
import { z } from "zod";

interface pageProps{
    setCategoryForm: any
}

export type Categories={
    id:string,
    title:string,
    description:string,
}

export default function CategoryForm({setCategoryForm}:pageProps ){
//     const [categories,setCategories]=useState<Array<Categories>>([
//         {id:'1',title:'title-1',description:'desc-1'},
//         {id:'2',title:'title-2',description:'desc-2'},
//         {id:'3',title:'title-3',description:'desc-3'},
//         {id:'4',title:'title-4',description:'desc-4'},
//         {id:'5',title:'title-5',description:'desc-5'}
// ])
    const router=useRouter()
    // const [selectedCategories,setSelectedCategories]=useState<Array<string>>([])
    const [isLoading,setIsLoading]=useState(false)

    const {register,formState:{errors},handleSubmit}=useForm<z.infer<typeof categoryRequest>>()

    const onSubmit:SubmitHandler<z.infer<typeof categoryRequest>>=async(data)=>{
        // console.log(data,34)
        try {
            setIsLoading(true)
            const res:z.infer<typeof categoryResponse>= await (await fetch('/api/category',{
                method:'POST',
                body:JSON.stringify({
                    title:data.title,
                    description:data.description
                })
            })).json()

            if(!res.success){
                throw Error(res.message)
            }
            toast.success(res.message)
            router.refresh()
            // alert(res.message)
        } catch (error:any) {
            toast.error(error.message)
            // alert(error.message)
        }finally{
            setIsLoading(false)
            setCategoryForm(false)
        }
    }

    return(
        <>
            <div className=" text-white bg-[#010922] flex flex-col justify-center items-center   ">
                <div className=" w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className=" w-full" >
                        <h1 className=" py-2 text-center font-bold text-4xl">Create <i className=" text-purple-500">Category</i></h1>
                        <ul className=" my-2 w-full flex flex-col justify-center gap-4">
                            <li className=" flex flex-col justify-center gap-1 w-full">
                                <label className=" text-lg font-semibold">Title</label>
                                <input {...register('title',{required:{value:true,message:'Title is required.'}})} placeholder="Title" className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white" type="text"  />
                            </li>
                            <li className=" flex flex-col justify-center gap-1 w-full">
                                <label className=" text-lg font-semibold">Description</label>
                                <textarea {...register('description',{required:{value:true,message:'Description is required.'}})} placeholder="Description" className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white"   />
                            </li>
                        </ul>
                        <div className="my-3 flex justify-end items-center gap-2">
                            <button disabled={isLoading} onClick={()=>setCategoryForm(false)} className=" uppercase py-4 px-8 float-right rounded shadow-[0_0_10px_gray] bg-gray-400 hover:bg-transparent hover:text-gray-400 font-semibold" type="button">Cancel</button>
                            <button disabled={isLoading} className=" min-w-[126px] min-h-[56px] float-right py-4 px-8 rounded shadow-[0_0_10px_purple] bg-purple-500 uppercase hover:bg-transparent hover:text-purple-500 font-semibold flex justify-center items-center" type="submit">
                                {
                                    isLoading 
                                    ? 
                                    <TbLoader2 size={24} className=" animate-spin"/>
                                    :
                                    'Submit'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}