'use client'


import { TbDotsVertical } from "react-icons/tb";
import { z } from "zod"
import MyModal from "../Modal";
import ExpenseForm from "../ExpenseForm";
import { useState } from "react";
import { expenenseResponse } from "@/types/api-requests-response/expense";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const paymentStatus = z.enum(['Paid', 'Partialy Paid', 'Unpaid']).default('Unpaid')


interface ExpenseCardProps {
    id: string, title: string, categories?: {
        title: string;
        description: string;
        id?: string | undefined;
        userId?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }[] | undefined, amount: number, description: string, 
    status: z.infer<typeof paymentStatus>, createdAt: Date
}

export default function ExpenseCard({ id, title, description, categories, amount, status, createdAt }: ExpenseCardProps) {
    const currencyFormat = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    })

    const [openExpenseForm,setOpenExpenseForm]=useState(false)
    const router=useRouter()

    async function deleteExpense(){
        try {
            const res:z.infer<typeof expenenseResponse>=await (await fetch(`/api/expense/${id}`,{
                method:"DELETE"
            })).json()

            if(!res.success){
                throw Error(res.message)
            }

            toast.success(res.message)

            router.refresh()
            
        } catch (error:any) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <div className=' relative'>
                <div key={id} className=" relative p-5 border rounded shadow-sm hover:shadow-lg spending-card">
                    <div className=" flex justify-between items-center">
                        <div>
                            <h1 className=" text-3xl font-semibold text-[#546aab]">{title}</h1>
                            <span>{new Date(createdAt).toUTCString().slice(0, 16)}</span>
                        </div>
                        <div className=" relative">
                            {/* <button onClick={(e)=>{
                                        // e.stopPropagation()
                                        // setCoordinates({x:e.pageX,y:e.pageY})
                                        // setShowDetailBar(true)
                                    }} className=" p-1 rounded shadow-sm border bg-transparent">
                                        <TbDotsVertical size={20}/>
                                    </button> */}

                        </div>
                    </div>
                    <p className=" truncate w-56 sm:w-96">
                        {description}
                    </p>
                    <div className=" flex justify-between items-center">
                        <p className=" py-4 font-semibold">Status: {status == 'Paid' ? <span className=" px-4 py-2 bg-green-400 shadow-sm rounded">Paid</span> : status == 'Partialy Paid' ? <span className=" px-4 py-2 bg-orange-400 shadow-sm rounded">Partialy Paid</span> : <span className=" px-4 py-2 bg-red-400 shadow-sm rounded">Unpaid</span>}  </p>

                        <h1 className=" text-2xl font-semibold ">
                            {currencyFormat.format(amount)}
                        </h1>
                    </div>
                    <div className=" font-semibold flex flex-wrap justify-start gap-2 items-center overflow-hidden">
                        {
                            categories?.map((category) => (
                                <span key={category.id} className=" p-2 rounded shadow-sm bg-blue-400">{category.title}</span>
                            ))
                        }
                    </div>
                    {/* <button className=" z-20 sm:hidden block bg-black bg-opacity-[0.5] float-right p-1 border rounded shadow-sm" type="button">
                                <TbArrowBadgeUpFilled size={30}/>
                            </button> */}
                    {/* <div className="paid-amount flex flex-col justify-center items-center p-3 relative">
                        <h1 className=" text-2xl font-semibold ">
                            {currencyFormat.format(amount)}
                        </h1>
                    </div> */}
                </div>

                <div className=" absolute top-4 right-4 z-10">
                    <button 
                    onBlur={()=>{
                        const showMoreContext=document.querySelector(`.show-more-context-${id}`) as HTMLDivElement
                        showMoreContext.style.opacity='0'
                        showMoreContext.style.transform='translateY(-10px)'
                        showMoreContext.style.visibility='hidden'
                    }} 
                    onFocus={()=>{
                        const showMoreContext=document.querySelector(`.show-more-context-${id}`) as HTMLDivElement
                        showMoreContext.style.opacity='1'
                        showMoreContext.style.transform='translateY(0)'
                        showMoreContext.style.visibility='visible'
                    }} className={`show-more-context-btn-${id} focus:ring focus:ring-violet-500 py-1`} type="button">
                        <TbDotsVertical size={20}/>
                    </button>
                    <div style={{transition:'all 0.3s ease'}} className={` invisible opacity-0 translate-y-[-10px] relative show-more-context-${id}`}>
                        <div className=" absolute top-0 right-0 min-w-[150px] bg-violet-800 rounded-md shadow-[0_0_10px_purple]">
                            <button onClick={()=>setOpenExpenseForm(true)} className=" rounded-md   hover:text-purple-500 w-full text-left py-2 px-4 text" type="button">
                                Edit
                            </button>
                            <button className=" rounded-md   hover:text-purple-500 w-full text-left py-2 px-4 text" type="button">
                                Show More
                            </button>
                            <button onClick={()=>{
                                deleteExpense()
                            }} className=" rounded-md bg-red-800  hover:text-purple-500 w-full text-left py-2 px-4 text" type="button">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <MyModal isOpen={openExpenseForm} closeModal={()=>setOpenExpenseForm(false)}>
                <ExpenseForm editableData={{
                    id,
                    title:title,
                    description,
                    amount,
                    payment_status:status,
                    categories: categories
                }} setExpenseForm={setOpenExpenseForm}/>
            </MyModal>
        </>
    )
}