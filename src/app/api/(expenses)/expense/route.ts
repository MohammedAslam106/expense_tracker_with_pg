import { NextResponse } from "next/server"
import { auth } from "../../../../../next.auth.config"
import { db } from "@/db/db.config"
import { expenseCategoryRelation, expensesTable } from "@/db/schemas/expenses"
import { eq } from "drizzle-orm"
import { categoriesTable } from "@/db/schemas/categories"
import { revalidatePath } from "next/cache"


// Route for creating expense
export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({
                success: false,
                message: 'User is not authenticated!'
            }, { status: 400 })
        }

        const data = await request.json()

        const expenseTableData = {
            title: data.title,
            description: data.description,
            amount: data.amount,
            status: data.status,
            userId: session.user.id
        }



        const resExpense = await db.insert(expensesTable).values({
            ...expenseTableData
        }).returning({ expenseId: expensesTable.id })

        const categoryAndExpenseRelationTableData: Array<{ categoryId: string, expenseId: string }> = data.categories.map((item: string) => {
            return {
                categoryId: item,
                expenseId: resExpense[0].expenseId
            }
        })

        const resCategoryExpenseRelation = await db.insert(expenseCategoryRelation).values(
            categoryAndExpenseRelationTableData
        ).returning()

        if (resExpense.length == 0 || resCategoryExpenseRelation.length == 0) {
            return NextResponse.json({
                success: false,
                messsage: 'Expense is not created!'
            })
        }

        revalidatePath('/spendings')

        return NextResponse.json({
            success: true,
            message: 'Expense is created successfully'
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

// Route for retriving all expenses
export async function GET(request: Request) {
    try {
        
        // const dummy=await db.select().from(expensesTable)
        
        // return NextResponse.json({
        //     success:true,
        //     message:'The data is retrived',
        //     data:dummy
        // })

        const session = await auth()

        console.log(session,73)
        if (!session?.user) {
            return NextResponse.json({
                success: false,
                message: 'User is not authenticated!'
            }, { status: 400 })
        }

        // const { searchParams } = new URL(request.url)
        // const userId=searchParams.get('userId')

        // const res=await db.select().from(expensesTable).fullJoin(expenseCategoryRelation,eq(expenseCategoryRelation.expenseId,expensesTable.id)).fullJoin(categoriesTable,eq(categoriesTable.id,expenseCategoryRelation.categoryId)).where(eq(expensesTable.userId,session.user.id as string))

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
                e.user_id = '${session.user.id}'
            GROUP BY 
                e.id;
            `;

        const res = await db.execute(query)

        if (res.rowCount == 0) {
            return NextResponse.json({
                success: true,
                message: 'No expenense for the given userId',
                data: []
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully got expenses.',
            data: res.rows
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}