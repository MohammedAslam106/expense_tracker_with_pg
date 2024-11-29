// import pool from "@/db/db.config"
import { updateProfile } from "@/helpers/sql-queries/profile-picture"
import { auth } from "../../../../../next.auth.config"
import { db } from "@/db/db.config"
import { users } from "@/db/schemas/user"
import { eq } from "drizzle-orm"

export const PATCH = auth(async (request) => {
    if (!request.auth) {
        throw Error('User is not authenticated!')
    }
    try {
        
        const body = await request.json()
        const pathname=request.nextUrl.pathname.split('/')
        const params = pathname[pathname.length - 1]
            console.log(body,params)
        if(body.emailVerified){
            const response =await db.update(users).set({...body,emailVerified:new Date(body.emailVerified)}).where(eq(users.id,params))
            console.log(response)
            return Response.json({response})
        }else{
            const response =await db.update(users).set({...body}).where(eq(users.id,params))
            console.log(response)
            return Response.json({response})
        }
        // const response=await pool.query(updateProfile(body.image,body.id))
        // const response =await db.update(users).set({...body,emailVerified:emailVerified}).where(eq(users.id,params))

        // return Response.json({ body })
    } catch (error: any) {
        console.log(error.message)
        return Response.json({ error: error.message })
    }
})
// export async function PATCH(request:Request){
//     try {
//         const body=await request.json()
//         console.log(body)
//         // const response=await pool.query(updateProfile(body.image,body.id))
//         // console.log(response)
//         // return Response.json({response})
//         return Response.json({body})
//     } catch (error:any) {
//         console.log(error.message)
//         return Response.json({error:error.message})
//     }
// }