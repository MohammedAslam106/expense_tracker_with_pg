import AddButton from "@/components/AddButton"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ReactNode } from "react"

interface layoutProps{
    children:ReactNode
}

export default function layout({children}:layoutProps ){
    return(
        <>
            <Navbar/>
             {children}
            <Footer/>
        </>
    )
}