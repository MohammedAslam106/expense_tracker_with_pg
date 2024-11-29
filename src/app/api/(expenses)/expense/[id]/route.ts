import { NextResponse } from "next/server";
import { auth } from "../../../../../../next.auth.config";
import { db } from "@/db/db.config";
import { expenseCategoryRelation, expensesTable } from "@/db/schemas/expenses";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export async function GET(request:Request,params:{id:string}){
    try {
        const session=await auth()
        console.log(9,params.id)

        if(!session?.user){
            return NextResponse.json({
                success:false,
                message:'User is not authenticated!'
            },{status:400})
        }

        const res=await db.select().from(expensesTable).where(eq(expensesTable.id,params.id))

        if(res.length==0){
            return Response.json({
                success:false,
                message:'Invalid id, please check the id.'
            },{status:404})
        }

        return Response.json({
            success:true,
            message:'Data is retrieved successfully.',
            data:res[0]
        })

        
    } catch (error:any) {
        return Response.json({
            success:false,
            message:error.message
        },{status:500})
    }
}

export async function PATCH(request:Request,params:{params:{id:string}}){
    try {
        const session=await auth()

        const data=await request.json()

        if(!session?.user){
            return NextResponse.json({
                success:false,
                message:'User is not authenticated!'
            },{status:400})
        }

        const expenseTableData = {
            title: data.title,
            description: data.description,
            amount: data.amount,
            status: data.payment_status,
            userId: session.user.id
        }

        console.log(params.params.id,66)


        const res=await db.update(expensesTable).set(expenseTableData).where(eq(expensesTable.id,params.params.id))


        const categoryAndExpenseRelationTableData: Array<{ categoryId: string, expenseId: string }> = data.categories.map((item: string) => {
            return {
                categoryId: item,
                expenseId: params.params.id
            }
        })

        const ecrD= await db.delete(expenseCategoryRelation).where(eq(expenseCategoryRelation.expenseId,params.params.id))


        const resCategoryExpenseRelation = await db.insert(expenseCategoryRelation).values(
            categoryAndExpenseRelationTableData
        ).returning()

        if (res.command !== 'UPDATE' || resCategoryExpenseRelation.length == 0) {
            return NextResponse.json({
                success: false,
                messsage: 'Expense is not updated!'
            })
        }

        revalidatePath('/spendings')

        return Response.json({
            success:true,
            message:'The expense is updated.'
        })
    } catch (error:any) {
        return Response.json({
            success:false,
            message:error.message
        },{status:500})
    }
}

export async function DELETE(request:Request,params:{params:{id:string}}){
    try {
        const session=await auth()

        if(!session?.user){
            return NextResponse.json({
                success:false,
                message:'User is not authenticated!'
            },{status:400})
        }

        await db.delete(expenseCategoryRelation).where(eq(expenseCategoryRelation.expenseId,params.params.id))
        
        const res = await db.delete(expensesTable).where(eq(expensesTable.id,params.params.id))


        if(res.command!='DELETE'){
            return Response.json({
                success:false,
                message:'The expense is not deleted!'
            },{status:402})
        }

        revalidatePath('/spendings')

        return Response.json({
            success:true,
            message:'The expense is Deleted.'
        })
    } catch (error:any) {
        return Response.json({
            success:false,
            message:error.message
        },{status:500})
    }
}