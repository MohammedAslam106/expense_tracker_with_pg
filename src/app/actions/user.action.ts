'use server'

import { db } from "@/db/db.config"
import { loginSchema, registerSchema } from "../types/auth.types"
import { users } from "@/db/schemas/user"
import { eq } from "drizzle-orm"
import brcypt from 'bcrypt'
import { signIn } from "../../../next.auth.config"
import { ZodError } from "zod"
import { userSchema } from "@/helpers/types/user"
import { isRedirectError } from "next/dist/client/components/redirect"

export async function createUser({email,password,name,confirmPassword}:{email:string,password:string,name:string,confirmPassword:string}){
    try {
        registerSchema.parse({
            name,email,password,confirmPassword
        })

        const userExists=await db.select().from(users).where(eq(users.email,email))

        if(userExists.length!==0){
            throw Error('User already exists!')
        }

        const hashPassword=await brcypt.hash(password,10)

        const newUser=await db.insert(users).values({
            email:email,name:name,password:hashPassword
        })

        console.log('NEW USER',newUser)

        await login({email,password})


    } catch (error:any) {
        // return{
        //     success:false,
        //     error:error.message
        // }
        if(isRedirectError(error)){
            throw(error)
        }
        if(error instanceof ZodError){
            throw Error(error.issues[0].message)
        }

        throw Error(error.message)
    }
}

export async function login({email,password}:{email:string,password:string}){
    try {
        loginSchema.parse({
            email,password
        })

        const getUserData=await db.select().from(users).where(eq(users.email,email))

        if(getUserData.length==0){
            throw Error('User not found please signup first!')
        }

        if(!getUserData[0].password){
            throw Error('Email is used with the provider!')
        }

        const comparePassword=await brcypt.compare(password,getUserData[0].password || '')

        if(!comparePassword){
            throw Error('Incorrect password!')
        }

        // const formData=new FormData()

        // formData.append('email',email)
        // formData.append('password',password)

        const res= await signIn('credentials',{email,password,redirectTo:'/home'})

        return{
            success:true,
            res:res
        }
    } catch (error:any) {
        if(isRedirectError(error)){
            throw(error)
        }
        if(error instanceof ZodError){
            if(error.issues[0].path.toString()=='password'){
                throw Error(error.issues[0].path + ' ' + error.issues[0].message)
            }
            throw Error(error.issues[0].message)
            // console.log(error.message)
        }
        // return{
        //     success:false,
        //     message:error.message
        // }
        throw Error(error.message)
    }
}
