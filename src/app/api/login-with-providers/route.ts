import pool from "@/db/db.config"
import { getUserByEmail } from "@/helpers/sql-queries/user"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export async function POST(req:Request){
    try {
        const body=await req.json()
        console.log(body)
        const client=await pool.connect()
        const result=await client.query(getUserByEmail(body.email))
        console.log(result.rows)
        if(result.rows.length==0){
            throw new Error('user not found!')
        }
        const token=jwt.sign(result.rows[0],process.env.PRIVATE_KEY!,{expiresIn:'1d'})
        console.log(token)
        const response=NextResponse.json({message:'login successfully',token})
        response.cookies.set('token',token)
        // window.localStorage.setItem('token',token)
        return response
    } catch (error:any) {
        console.log(error)
        return Response.json({error:error.message})
    }
}