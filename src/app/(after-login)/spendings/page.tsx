// 'use client'
import AddButton from "@/components/AddButton"
import ExpenseCard from "@/components/cards/ExpenseCard"
import { expenenseRequest, expenenseResponse } from "@/types/api-requests-response/expense"
import { useEffect, useState } from "react"
import { TbArrowBadgeDownFilled, TbArrowBadgeUpFilled, TbDotsVertical, TbX } from "react-icons/tb"
import { z } from "zod"
import { auth } from "../../../../next.auth.config"
import { db } from "@/db/db.config"
import { unstable_cache } from "next/cache"
import { cache } from "@/helpers/cache"

interface pageProps{
    
}

const getExpenses = cache(
    async (id:string) => {

        const query = `
        SELECT 
            e.*,
            json_agg(c.*) AS categories
        FROM 
            expenses e
        LEFT JOIN 
            expense_category ec ON e.id = ec.expense_id
        LEFT JOIN 
            category c ON ec.category_id = c.id
        WHERE 
            e.user_id = '${id}'
        GROUP BY 
            e.id;
        `;
    
        return (await db.execute(query)).rows
    },['/spendings','getExpenses']
)

export default async function Page({}:pageProps ){
    // const [showDetailBar,setShowDetailBar]=useState<boolean>(false)
    // const [coordinates,setCoordinates]=useState({x:0,y:0})
    // const [expenses,setExpenses]=useState<z.infer<typeof expenenseResponse>>()
    // let expenses:z.infer<typeof expenenseResponse> | undefined

    // const session= await auth()

    // const query = `
    // SELECT 
    //     e.*,
    //     json_agg(c.*) AS categories
    // FROM 
    //     expenses e
    // LEFT JOIN 
    //     expense_category ec ON e.id = ec.expense_id
    // LEFT JOIN 
    //     category c ON ec.category_id = c.id
    // WHERE 
    //     e.user_id = '${session?.user.id}'
    // GROUP BY 
    //     e.id;
    // `;

    // const response = await (await db.execute(query)).rows

    // const expenses=response as Array<z.infer<typeof expenenseRequest>>

    // console.log(expenses,61)
    const session=await auth()

    if(!session) return null

    const expenses=await getExpenses(session?.user.id as string) as Array<z.infer<typeof expenenseRequest>>

    // console.log(expenses)
    
    return(
        <>
            <div className="relative text-white bg-[#010922] min-h-screen sm:px-24 px-6 flex flex-col justify-center items-center h-full">
                <div className=" w-full absolute top-0 left-0 sm:px-24 px-6 my-5">
                    <ul className=" flex flex-col justify-end items-end gap-3">
                        <li className=" w-full">
                            <input placeholder="Search here..." type="text" className=" focus:ring-1 ring-gray-200 w-full rounded-xl py-2 px-5 bg-transparent border" />
                        </li>
                        <li className="">
                            <select className=" bg-transparent py-2 px-4 rounded shadow-sm ring-1  ">
                                <option className=" text-black" value="">All</option>
                                <option className=" text-black" value="">Paid</option>
                                <option className=" text-black" value="">Unpaid</option>
                                <option className=" text-black" value="">Partially Paid</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div className=" w-full h-full min-h-[calc(100vh-220px)] flex flex-wrap gap-5 justify-start items-start py-3">
                    {expenses?.map((card,ind)=>{
                        return(
                            <ExpenseCard key={card.id} id={card.id as string} title={card.title} description={card.description} amount={card.amount} categories={card.categories} status={card.payment_status} createdAt={card.createdAt as Date}/>
                        )
                    })}
                    {/* {showDetailBar && 
                    <div onMouseLeave={()=>setShowDetailBar(false)} style={{left:coordinates.x-110,top:coordinates.y-75}} className=" z-20 border rounded shadow-sm bg-white text-black absolute w-32">
                        <ul>
                            <li>
                                <button className="text-left w-full p-2">Show more</button>
                            </li>
                            <li>
                                <button className="text-left w-full p-2">Edit</button>
                            </li>
                            <li>
                                <button className="w-full text-left p-2">Delete</button>
                            </li>
                            <li>
                                <button onClick={()=>setShowDetailBar(false)} className="w-full text-left p-2">Close</button>
                            </li>
                        </ul>
                    </div>
                    } */}
                </div>
            </div>
            <AddButton/>
        </>
    )
}


// DO $$ BEGIN
//  ALTER TABLE "post_comment_relation" ADD CONSTRAINT "post_comment_relation_commentId_comments_id_fk" FOREIGN KEY ("commentId") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
// EXCEPTION
//  WHEN duplicate_object THEN null;
// END $$;