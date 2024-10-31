import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface JWTProviderProps{
    children:ReactNode
}

export default function JWTProvider({children}:JWTProviderProps ){
    return(
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
        </>
    )
}