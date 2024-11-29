import AddButton from "@/components/AddButton"
import { db } from "@/db/db.config"
import { categoriesTable } from "@/db/schemas/categories"
import { auth } from "../../../../next.auth.config"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { categoryRequest } from "@/types/api-requests-response/category"
import { unstable_cache } from "next/cache"
import { cache } from "@/helpers/cache"
import { getCategories } from "@/app/actions/category.action"

interface pageProps{
    
}

export default async function page({}:pageProps ){
    const session=await auth()

    if(!session){
        return null
    }

    // const res =await db.select().from(categoriesTable).where(eq(categoriesTable.userId,session.user.id as string))

    const res= await getCategories(session.user.id as string)

    return(
        <>
            <div className="relative text-white bg-[#010922] min-h-screen sm:px-24 px-6 flex flex-col justify-start items-center    ">
                <div className=" w-full   top-0 left-0  my-5">
                    <ul className=" flex flex-col justify-end items-end gap-3">
                        <li className=" w-full">
                            <input placeholder="Search here..." type="text" className=" focus:ring-1 ring-gray-200 w-full rounded-xl py-2 px-5 bg-transparent border" />
                        </li>
                    </ul>
                </div>
                        {
                            res.length==0 ?
                            <div className=" flex justify-center items-center w-full h-full">
                                <p>Please create the categories to see the list here.</p>
                            </div>
                            : 

                            <div className=" my-3 min-h-[calc(100vh-220px)]  w-full flex flex-col justify-start items-start gap-3">
                                    {res.map((val,ind)=>{
                                        return(
                                            <div key={ind} className=" border shadow-sm rounded p-2 w-full">
                                                <h1 className=" text-lg sm:text-2xl font-semibold">{val.title}</h1>
                                                <p className="  w-56 sm:w-[800px] truncate">{val.description}</p>
                                            </div>
                                        )
                                    })}
                            </div>

                        }

            
            </div>
            <AddButton/>
        </>
    )
}