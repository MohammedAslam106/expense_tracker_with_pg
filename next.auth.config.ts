
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import NextAuth, { NextAuthConfig, User } from "next-auth"
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db/db.config'
import { users } from '@/db/schemas/user'
import { eq } from 'drizzle-orm'
import { encode as defaultEncode } from "next-auth/jwt"
import { v4 as uuid } from 'uuid'
import { randomUUID } from 'crypto'
import { AdapterUser } from 'next-auth/adapters'

const adapter = DrizzleAdapter(db)

export const nextAuthConfig = {
    providers: [
        Github, Google,
        Credentials({
            credentials: {
                email: {},
                password: {}
            },

            authorize: async (params) => {
                const { email, password } = params

                const user = await db.select().from(users).where(eq(users.email, email as string))

                // user[0].password=''
                if (user.length !== 0) {
                    return user[0] as User
                }

                return null
            },


        })
    ],

    callbacks: {
        session: async ({ session, user,token }) => {
            console.log('IM IN session callback 45',token)
            // console.log('46 User',user)
            // console.log(session)
            // session.user.id=user.id
            return session
        },
        // authorized: async ({ auth, request: { nextUrl } }) => {

        //     console.log(48, auth)
        //     const isLoggedIn = !!auth?.user

        //     const publicRoutes = ['/login', '/', '/signup']

        //     if (publicRoutes.includes(nextUrl.pathname) && isLoggedIn) {
        //         const redirectUrl = new URL('/home', nextUrl.origin)
        //         return Response.redirect(redirectUrl)
        //     } else if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
        //         const redirectUrl = new URL('/login', nextUrl.origin)
        //         redirectUrl.searchParams.append('callbackUrl', nextUrl.href)
        //         return Response.redirect(redirectUrl)
        //     }

        //     return true
        // },

        // async jwt({ token, user, account }) {
        //     if (account?.provider === "credentials") {
        //         token.credentials = true
        //     }
        //     return token
        // },

        async jwt({ token, user, account }) {
            // console.log('IM IN jwt callback 77',token)
            if (account?.provider === "credentials") {
                const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
                const sessionToken = randomUUID();

                const session = await adapter.createSession!({
                    userId: user.id!,
                    sessionToken,
                    expires,
                });

                token.sessionId = session.sessionToken;
            }

            return token;
        },
    },

    // jwt: {
    //     encode: async function (params) {
    //         if (params.token?.credentials) {
    //             const sessionToken = uuid()

    //             if (!params.token.sub) {
    //                 throw new Error("No user ID found in token")
    //             }

    //             const createdSession = await adapter?.createSession?.({
    //                 sessionToken: sessionToken,
    //                 userId: params.token.sub,
    //                 expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    //             })

    //             if (!createdSession) {
    //                 throw new Error("Failed to create session")
    //             }

    //             return sessionToken
    //         }
    //         return defaultEncode(params)
    //     },
    // },

    jwt: {
        maxAge: 60 * 60 * 24 * 30,
        async encode(arg) {
            // console.log('Main jwt 127',arg.token)
            // The below value is stored in the borwser cookie either as a jwt or as a uuid.
            return (arg.token?.sessionId as string) ?? defaultEncode(arg);
        },
    },

    events:{
        // linkAccount: This event is triggered automatically when an account is linked to a user during the OAuth or magic-link sign-in process. The emailVerified field is part of the User model in Auth.js and is used to track email verification status. So, this function will not trigger for credential provider because, The Account model creation is automatic and happens when a user logs in for the first time with an OAuth provider or magic links.
        linkAccount:async({user,account,profile})=>{
            // console.log('IM IN linkAccount under events')
            const partialUser:Partial<AdapterUser> & Pick<AdapterUser, "id">={
                id:user.id as string,
                emailVerified: new Date()
            }
            if (adapter && adapter.updateUser) {
                await adapter.updateUser(partialUser);
            } else {
                console.error("Adapter or updateUser function is undefined");
            }
            return
        }
    },
    // secret: process.env.AUTH_SECRET!,

} satisfies NextAuthConfig


export const { auth, handlers, signIn,signOut } = NextAuth({
    ...nextAuthConfig,
    adapter,
    session: {
        strategy: 'database'
    }
})