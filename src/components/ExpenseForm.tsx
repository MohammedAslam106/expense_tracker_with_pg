'use client'
import SelectUi from "@/components/SelectUi";
import { UUID } from "crypto";
import { useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { TbX } from "react-icons/tb";
import { expenseForm } from "@/helpers/types/forms/expenseForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface pageProps{
    setExpenseForm: any,
    setCategoryForm:any
}

export type Categories={
    id:string,
    title:string,
    description:string,
}

type FormType=z.infer<typeof expenseForm>

export default function ExpenseForm({setExpenseForm,setCategoryForm}:pageProps ){
    const [categories,setCategories]=useState<Array<Categories>>([
        {id:'1',title:'title-1',description:'desc-1'},
        {id:'2',title:'title-2',description:'desc-2'},
        {id:'3',title:'title-3',description:'desc-3'},
        {id:'4',title:'title-4',description:'desc-4'},
        {id:'5',title:'title-5',description:'desc-5'}
])
    const [selectedCategories,setSelectedCategories]=useState<Array<string>>([])

    const submitForm:SubmitHandler<FormType>=async(data:FormType)=>{
        console.log(data)
        // alert('Does it working')
    }

    const {handleSubmit,register,setError,formState:{errors}}=useForm<FormType>({
        resolver:zodResolver(expenseForm),
    })
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
                            <input {...register('totalAmount',{required:'This field is required'})} placeholder="Total Amount" className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white" type="number"  />
                        </li>
                        <li className=" flex flex-col justify-center gap-1 w-full">
                            <label className=" text-lg font-semibold">Paid Amount</label>
                            <input {...register('paidAmount',{required:'This field is required'})} placeholder="Paid Amount" className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white" type="number"  />
                        
                        </li>
                        <li className="  w-full">
                            <label className=" text-lg font-semibold">Categories</label>
                            <div  className=" mb-3 flex flex-wrap justify-start gap-2">
                                {categories.filter((item)=>{
                                    return selectedCategories.includes(item.id)
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
                                    <SelectUi {...register('categories',{required:'This field is required'})} label="Categories" placeholder={'Select Category'} filteringValues={selectedCategories} values={categories} onChanging={(e)=>{
                                        setSelectedCategories([...selectedCategories,e])
                                    }} className={"w-full rounded shadow-[0_0_10px_purple] p-2 text-white"}/>
                                </div>
                                <button onClick={()=>setCategoryForm(true)} className=" font-semibold px-5 py-2 rounded shadow-[0_0_10px_teal] bg-teal-300 hover:bg-transparent" type="button">Create Category</button>
                            </div>
                        </li>
                    </ul>
                    <div className="my-3 flex justify-end items-center gap-2">
                        <button onClick={()=>setExpenseForm(false)} className=" uppercase py-4 px-8 float-right rounded shadow-[0_0_10px_gray] bg-gray-400 hover:bg-transparent hover:text-gray-400 font-semibold" type="button">Cancel</button>
                        <button form="expense-form" className="  float-right  py-4 px-8 rounded shadow-[0_0_10px_purple] bg-purple-500 uppercase hover:bg-transparent hover:text-purple-500 font-semibold" type="submit">Submit</button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}