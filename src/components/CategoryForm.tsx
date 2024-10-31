'use client'
import SelectUi from "@/components/SelectUi";
import { UUID } from "crypto";
import { useState } from "react";
import { TbX } from "react-icons/tb";

interface pageProps{
    setCategoryForm: any
}

export type Categories={
    id:string,
    title:string,
    description:string,
}

export default function CategoryForm({setCategoryForm}:pageProps ){
    const [categories,setCategories]=useState<Array<Categories>>([
        {id:'1',title:'title-1',description:'desc-1'},
        {id:'2',title:'title-2',description:'desc-2'},
        {id:'3',title:'title-3',description:'desc-3'},
        {id:'4',title:'title-4',description:'desc-4'},
        {id:'5',title:'title-5',description:'desc-5'}
])
    const [selectedCategories,setSelectedCategories]=useState<Array<string>>([])
    return(
        <>
            <div className=" text-white bg-[#010922] flex flex-col justify-center items-center   ">
                <div className=" w-full">
                    <h1 className=" py-2 text-center font-bold text-4xl">Create <i className=" text-purple-500">Category</i></h1>
                    <ul className=" my-2 w-full flex flex-col justify-center gap-4">
                        <li className=" flex flex-col justify-center gap-1 w-full">
                            <label className=" text-lg font-semibold">Title</label>
                            <input placeholder="Title" className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white" type="text"  />
                        </li>
                        <li className=" flex flex-col justify-center gap-1 w-full">
                            <label className=" text-lg font-semibold">Description</label>
                            <textarea placeholder="Description" className="placeholder:text-purple-400 w-full px-4 py-3 shadow-[0_0_10px_purple] border border-gray-400 bg-transparent hover:ring ring-purple-500 rounded  text-white"   />
                        </li>
                    </ul>
                    <div className="my-3 flex justify-end items-center gap-2">
                        <button onClick={()=>setCategoryForm(false)} className=" uppercase py-4 px-8 float-right rounded shadow-[0_0_10px_gray] bg-gray-400 hover:bg-transparent hover:text-gray-400 font-semibold" type="button">Cancel</button>
                        <button className="  float-right  py-4 px-8 rounded shadow-[0_0_10px_purple] bg-purple-500 uppercase hover:bg-transparent hover:text-purple-500 font-semibold" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}