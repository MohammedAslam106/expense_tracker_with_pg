// import NextAuth from "next-auth/next";
// import GoogleProvider from 'next-auth/providers/google'
// import GithubProvider from 'next-auth/providers/github'
// import { getUserByEmail } from "@/helpers/sql-queries/user";
// import pool from "@/db/db.config";

import { handlers } from "../../../../../next.auth.config";

// const handler=NextAuth({
    
//     providers:[
//         GoogleProvider({
//             clientId:process.env.GOOGLE_CLIENT_ID!,
//             clientSecret:process.env.GOOGLE_CLIENT_SECRET!
//         }),
//         GithubProvider({
//             clientId:process.env.GITHUB_CLIENT_ID!,
//             clientSecret:process.env.GITHUB_CLIENT_SECRET!
//         })
//     ],
//     callbacks:{
//         async session({session,token,user}){
//             return session
//         },
//         async signIn({email,profile,credentials,user,account}){
//             try {
//                 console.log(profile)
//                 const client=await pool.connect()
//                 const result=await client.query(getUserByEmail(profile?.email!))
//                 console.log(result)
//                 if(result.rowCount!=0){
//                     // const login=await (await fetch(`${process.env.BASE_URL}/api/login-user`,{
//                     //     method:"POST",
//                     //     body:JSON.stringify({
//                     //         email:profile?.email,
//                     //         password:profile?.email
//                     //     })
//                     // })).json()
//                     // console.log(login)
//                     // window.localStorage.setItem('token',login.token)
//                     return true
//                 }else{
//                     const response=await (await fetch(`${process.env.BASE_URL}/api/create-user`,{
//                         method:"POST",
//                         body:JSON.stringify({
//                             name:profile?.name,
//                             email:profile?.email,
//                             password:profile?.email,
//                             image:profile?.picture ?? profile?.avatar_url
//                         }),
//                         headers:{
//                             'content-type':'application/json'
//                         }
//                     })).json()
//                     console.log(response)
//                     if(response){
//                         return true
//                     }
//                 }
//                 return false
//             } catch (error) {
//                 console.log(error)
//                 return false
//             }
//         },
//         async redirect({url,baseUrl}){
//            return '/login'
//         },
//     }
// })

// export {handler as GET, handler as POST}

export const {GET,POST}=handlers