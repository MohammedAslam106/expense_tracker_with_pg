'use client'
import SelectUi from "@/components/SelectUi";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { TbLoader2, TbX } from "react-icons/tb";
import { expenseForm } from "@/helpers/types/forms/expenseForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryRequest, categoryResponse } from "@/types/api-requests-response/category";
import { expenenseRequest, expenenseResponse } from "@/types/api-requests-response/expense";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const paymentStatus = z.enum(['Paid', 'Partialy Paid', 'Unpaid']).default('Unpaid')

interface pageProps{
    setExpenseForm: any,
    setCategoryForm?:any,
    editableData?:{
        id:string;
        title:string,
        description:string,
        amount:number,
        payment_status:z.infer<typeof paymentStatus>,
        categories:{title: string;
            description: string;
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined}[] | undefined
    }
}

export type Categories={
    id:string,
    title:string,
    description:string,
}

export default function ExpenseForm({setExpenseForm,setCategoryForm,editableData}:pageProps ){
    const [categories,setCategories]=useState<Array<z.infer<typeof categoryRequest>>>([])
    const [selectedCategories,setSelectedCategories]=useState<Array<string>>(editableData?.categories ? editableData.categories.map((cat)=>cat.id as string) : [])

    const [isLoading,setIsLoading]=useState(false)

    const router =useRouter()

    const submitForm:SubmitHandler<z.infer<typeof expenenseRequest>>=async(data)=>{
        // alert(editableData?.id)
        alert(JSON.stringify(data))
        // return 
        try {
            setIsLoading(true)
            let res:z.infer<typeof expenenseResponse> | undefined

            if(editableData?.id){
                res= await (await fetch(`/api/expense/${editableData.id}`,{
                    method:'PATCH',
                    body:JSON.stringify({
                        ...data,
                        categories:selectedCategories
                    })
                })).json()
            }else{
                res= await (await fetch('/api/expense',{
                    method:'POST',
                    body:JSON.stringify({
                        ...data,
                        categories:selectedCategories
                    })
                })).json()
            }

            if(!res?.success){
                throw Error(res?.message)
            }
            toast.success(res.message)
            // setExpenseForm(false)
            router.refresh()
        } catch (error:any) {
            toast.error(error.message)
        }finally{
            setIsLoading(false)
            setExpenseForm(false)
        }
    }

    const {handleSubmit,register,setError,formState:{errors},watch}=useForm<z.infer<typeof expenenseRequest>>({
        defaultValues:{
            title:editableData?.title,
            description:editableData?.description,
            amount:editableData?.amount,
            payment_status:editableData?.payment_status
        }
    })

    useEffect(()=>{
        const fetchCategories=async()=>{
            const res:z.infer<typeof categoryResponse>=await (await fetch('/api/category',{
                method:'GET',
            })).json()

            if(res.success){
                setCategories(res.data)
            }
        }
        fetchCategories()
    },[])

    // useEffect(()=>{
    //     alert(JSON.stringify(errors))
    // },[errors])

    return(
        <>
            <div className=" text-white bg-[#010922] flex flex-col justify-center items-center   ">
                <div className=" w-full">
                    <h1 className=" py-2 text-center font-bold text-4xl">Create <i className=" text-purple-500">Expense</i></h1>
                    <form id="expense-form" onSubmit={handleSubmit(submitForm)}>
                    <ul className=" my-2 w-full flex flex-col justify-center gap-4">
                        <li className=" flex flex-col justify-center gap-1 w-full">
                            <label className=" text-lg font-semibold">Title</label>
                            <input {...register('title',{required:'This field is required'})} placeholder="Title" className=" placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white" type="text"  />
                        </li>
                        <li className=" flex flex-col justify-center gap-1 w-full">
                            <label className=" text-lg font-semibold">Description</label>
                            <textarea {...register('description',{required:'This field is required'})} placeholder="Description" className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white" />
                        </li>
                        <li className=" flex flex-col justify-center gap-1 w-full">
                            <label className=" text-lg font-semibold">Total Amount</label>
                            <input {...register('amount',{required:'This field is required',valueAsNumber:true})} placeholder="Total Amount" className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white" type="number"  />
                            {errors.amount && errors.amount.message}
                        </li>
                        <li className=" flex flex-col justify-center gap-1 w-full">
                            <label className=" text-lg font-semibold">Status</label>
                            <select {...register('payment_status',{required:{value:true,message:'Status is required.'}})} className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white">
                                <option className=" bg-[#010922]" value="Paid">Paid</option>
                                <option className=" bg-[#010922]" value="Unpaid">Unpaid</option>
                                <option className=" bg-[#010922]" value="Partialy Paid">Partialy Paid</option>
                            </select>
                            {errors.payment_status && errors.payment_status.message}
                        </li>
                        <li className="  w-full">
                            <label className=" text-lg font-semibold">Categories</label>
                            <div  className=" mb-3 flex flex-wrap justify-start gap-2">
                                {categories.filter((item)=>{
                                    return selectedCategories.includes(item.id as string)
                                }).map((value,ind)=>{
                                    return(
                                    <div key={ind} className=" hover:bg-black hover:shadow-[0_0_10px_black] bg-blue-300 px-2 py-1 rounded-2xl shadow-[0_0_20px_blue] flex justify-center items-center gap-2">
                                        <span  className="">{value.title}</span>
                                        <TbX onClick={()=>{
                                            setSelectedCategories(selectedCategories.filter(val=> val!=value.id))
                                        }} className=' cursor-pointer font-semibold w-5 p-0.5 h-5 rounded-full border'/>
                                    </div>
                                    ) 
                                })
                                }
                            </div>
                            <div className=" flex justify-center items-center gap-3">
                                <div className=" w-full">
                                    <SelectUi label="Categories" placeholder={'Select Category'} filteringValues={selectedCategories} values={categories} onChanging={(e)=>{
                                        // alert(JSON.stringify(selectedCategories))
                                        setSelectedCategories([...selectedCategories,JSON.parse(e).id])
                                    }} className={"w-full rounded shadow-[0_0_10px_purple] px-2 py-3 text-white bg-transparent"}/>
                                </div>
                                {setCategoryForm && 
                                <button onClick={()=>setCategoryForm(true)} className=" font-semibold px-5 py-2 rounded shadow-[0_0_10px_teal] bg-teal-300 hover:bg-transparent" type="button">Create Category</button>}
                            </div>
                        </li>
                    </ul>
                    <div className="my-3 flex justify-end items-center gap-2">
                        <button disabled={isLoading} onClick={()=>setExpenseForm(false)} className=" uppercase py-4 px-8 float-right rounded shadow-[0_0_10px_gray] bg-gray-400 hover:bg-transparent hover:text-gray-400 font-semibold" type="button">Cancel</button>
                        <button disabled={isLoading} form="expense-form" className=" flex justify-center items-center min-w-[126px] min-h-[56px] float-right  py-4 px-8 rounded shadow-[0_0_10px_purple] bg-purple-500 uppercase hover:bg-transparent hover:text-purple-500 font-semibold" type="submit">{isLoading ? <TbLoader2 size={25} className=" animate-spin"/> : 'Submit'}</button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}