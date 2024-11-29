'use server'

import { db } from "@/db/db.config"
import { categoriesTable } from "@/db/schemas/categories"
import { cache } from "@/helpers/cache"
import { eq } from "drizzle-orm"


export const getCategories=cache(async(id:string)=>{
    // const session=await auth()
    const res =await db.select().from(categoriesTable).where(eq(categoriesTable.userId, id))

    return res 
},['/categories','getCategories'])