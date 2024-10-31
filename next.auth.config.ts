
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import NextAuth, { NextAuthConfig } from "next-auth"



export const nextAuthConfig={
    providers:[
        Github,Google
    ],

} satisfies NextAuthConfig


export const {auth,handlers,signIn}=NextAuth({
    ...nextAuthConfig
})