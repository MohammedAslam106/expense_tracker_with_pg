import pool from '../../../db/db.config'
import {categories, categories_expenses, expenses, user} from '../../../helpers/sql-queries/db-tables'

export async function GET(req:Request){
    try {
        // return Response.json({greet:'Heelo'})
        const client=await pool.connect()
        const users=await client.query(user)
        const category=await client.query(categories)
        const expens=await client.query(expenses)
        const junctionTable=await client.query(categories_expenses)
        // console.log(users.command)
        return Response.json({junctionTable})
    } catch (error:any) {
        return Response.json({error:error.message})
    }
}