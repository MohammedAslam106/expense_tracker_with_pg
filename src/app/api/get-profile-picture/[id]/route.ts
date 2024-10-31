import pool from "@/db/db.config"
import { getProfilePicture } from "@/helpers/sql-queries/profile-picture" 
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

export async function GET(request:Request,params:Params){
    try {
        console.log(params.params.id)
        const res=await pool.query(getProfilePicture(params.params.id))
        console.log(res)
        return Response.json({image:res.rows})
    } catch (error:any) {
        console.log(error)
        return Response.json({error:error.message})
    }
}