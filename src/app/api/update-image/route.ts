import pool from "@/db/db.config"
import { updateProfile } from "@/helpers/sql-queries/profile-picture"
export async function POST(request:Request){
    try {
        const body=await request.json()
        console.log(body)
        const response=await pool.query(updateProfile(body.image,body.id))
        console.log(response)
        return Response.json({response})
    } catch (error:any) {
        console.log(error.message)
        return Response.json({error:error.message})
    }
}