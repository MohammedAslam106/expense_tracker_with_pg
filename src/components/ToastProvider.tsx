import { ReactNode } from "react"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProviderProps{
    children:ReactNode
}

export default function ToastProvider({children}:ToastProviderProps ){
    return(
        <>
            <ToastContainer
            className={'absolute'}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {children}
        </>
    )
}