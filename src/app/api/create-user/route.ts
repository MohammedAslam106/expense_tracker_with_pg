import pool from '@/db/db.config'
import { addProfile } from '@/helpers/sql-queries/profile-picture'
import { createUser } from '@/helpers/sql-queries/user'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

export async function POST(req:Request){
    try {
        const body=await req.json()
        console.log(body)
        const client=await pool.connect()
        const uuid= randomUUID()
        console.log(uuid)
        const hashPassword= bcrypt.hashSync(body.password,10)
        const image=body.image ? body.image : `https://ui-avatars.com/api/?rounded=true&background=random&bold=true&format=svg&name=${body.name}`
        console.log(image)
        const storeImage=await client.query(addProfile(uuid,image))
        console.log(storeImage)
        const result=await client.query(createUser({name:body.name,email:body.email,password:hashPassword,image:uuid,dob:body.dob}))
        console.log(result)
        return Response.json({result:result.command})
    } catch (error:any) {
        return Response.json({error:error.message})
    }
}