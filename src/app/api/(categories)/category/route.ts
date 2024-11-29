import { NextResponse } from "next/server"
import { auth } from "../../../../../next.auth.config"
import { db } from "@/db/db.config"
import { eq } from "drizzle-orm"
import { categoriesTable } from "@/db/schemas/categories"
import { revalidatePath, revalidateTag } from "next/cache"


// Route for creating expense
export async function POST(request:Request){
    try {
        const session=await auth()

        if(!session?.user){
            return NextResponse.json({
                success:false,
                message:'User is not authenticated!'
            },{status:400})
        }

        const data=await request.json()

        const res=await db.insert(categoriesTable).values({
            ...data,
            userId:session.user.id
        })

        if(res.command!='INSERT'){
            return NextResponse.json({
                success:false,
                messsage:'Category is not created!'
            })
        }

        // revalidateTag('categories')
        revalidatePath('/categories')
        
        return NextResponse.json({
            success:true,
            message:'Category is created successfully'
        })
        
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500})
    }
}

// Route for retriving all expenses
export async function GET(request:Request){
    try {
        const session=await auth()

        if(!session?.user){
            return NextResponse.json({
                success:false,
                message:'User is not authenticated!'
            },{status:400})
        }

        // const { searchParams } = new URL(request.url)
        // const userId=searchParams.get('userId')

        const res=await db.select().from(categoriesTable).where(eq(categoriesTable.userId,session.user.id as string))

        if(res.length==0){
            return NextResponse.json({
                success:true,
                message:'No categories for the given userId',
                data:[]
            })
        }

        return NextResponse.json({
            success:true,
            message:'Successfully retrieved categories for the user.',
            data:res
        })
        
    } catch (error:any) {
        return NextResponse.json({
            success:true,
            message:error.message
        },{status:500})
    }
}