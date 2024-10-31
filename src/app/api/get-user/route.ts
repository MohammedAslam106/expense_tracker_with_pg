// import { getUser } from '@/helpers/sql-queries/user'
// import pool from '../../../db/db.config'

// export async function GET(req:Request){
//     try {
//         // return Response.json({greet:'Heelo'})
//         const client=await pool.connect()
//         const result=await client.query(getUser())
//         console.log(result)
//         return Response.json({result:result.rows})
//     } catch (error:any) {
//         return Response.json({error:error.message})
//     }
// }