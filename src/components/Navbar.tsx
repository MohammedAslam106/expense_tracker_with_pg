'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { TbList, TbX } from "react-icons/tb"
import { getTokenData } from "@/helpers/get-data-from-token"
import Image from "next/image"
import MyModal from "./Modal"
import ExpenseForm from "./ExpenseForm"
import CategoryForm from "./CategoryForm"

interface NavbarProps{
    
}

export default function Navbar({}:NavbarProps ){
    const [expenseForm,setExpenseForm]=useState<boolean>(false)
    const [categoryForm,setCategoryForm]=useState<boolean>(false)
    const [showNavbar,setShowNavbar]=useState<boolean>(false)
    const [user,setUser]=useState<any>(null)
    const[image,setImage]=useState<string>('')
    const [showCreatItems,setShowCreateItems]=useState<boolean>(false)
    const router=useRouter()
    useEffect(()=>{
      const tokenInfo=getTokenData(window.localStorage.getItem('token') || '')
      console.log(tokenInfo)
      setUser(tokenInfo)
      const getProfilePicture=async()=>{
        const response=await (await fetch(`/api/get-profile-picture/${tokenInfo.image}`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        })).json()
        console.log(response)
        setImage(response.image[0].image)
      }
      getProfilePicture()
    },[])
    return(
        <>
            {/* Navbar big screen */}
        <nav  className=" z-30 mobile-h:sticky sm:block hidden sticky bg-[#010922] top-0 w-full py-5 sm:px-24 px-6 shadow-2xl text-white ">
          <div className=" flex justify-between items-center">
            <div className="relative "  onMouseLeave={()=>setShowCreateItems(false)}>
              <button  onMouseOver={()=>setShowCreateItems(true)} type="button" className="  w-10 h-10 rounded-full ring-1 ">
                <Image unoptimized className=" object-cover rounded-full" src={image} width={100} height={100} alt="not found"/>
              </button>
              {showCreatItems && <div  className=" w-40 bg-black text-white rounded shadow-sm absolute top-10 left-0">
                <ul>
                  <li>
                    <button onClick={()=>router.push('/profile')} className=" px-4 py-2 w-full text-left">Profile</button>
                  </li>
                  <li>
                    <button onClick={()=>setExpenseForm(true)} className=" px-4 py-2 w-full text-left">Create Expense</button>
                  </li>
                  <li>
                    <button onClick={()=>setCategoryForm(true)} className=" px-4 py-2 w-full text-left">Create Category</button>
                  </li>
                </ul>
              </div>}
            </div>
            <div className=" flex justify-center items-center gap-5 sm:gap-10">
              <Link
                className="font-semibold nav-btn hover:text-[#522d8b] active-page"
                href={'/home'}
              >
                Home
              </Link>
              <Link className=" font-semibold nav-btn hover:text-[#522d8b]"
                // className=" ring-slate-500 hover:ring-1 hover:bg-white hover:text-black font-semibold p-2 px-6 shadow-sm bg-[#522d8b] rounded-full"
                href={'/spendings'}
                type="button"
              >
                Spendings
              </Link>
              <Link
              className=" font-semibold nav-btn hover:text-[#522d8b] "
                // className=" ring-slate-500 hover:ring-1 hover:bg-white hover:text-black font-semibold p-2 px-6 shadow-sm bg-[#522d8b] rounded-full"
                href={'/categories'}
                type="button"
              >
                Categories
              </Link>
              <button
              className=" font-semibold nav-btn hover:text-[#522d8b] border border-transparent hover:border-[#522d8b] p-2 px-5 rounded shadow-sm hover:bg-gray-100"
                // className=" ring-slate-500 hover:ring-1 hover:bg-white hover:text-black font-semibold p-2 px-6 shadow-sm bg-[#522d8b] rounded-full"
                onClick={async()=>{
                  const logout=await (await fetch('/api/logout',{
                    method:'GET',
                    headers:{
                      'content-type':'application/json'
                    }
                  })).json()
                  window.location.reload()
                }
                }
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        {/* Navbar screen small */}
        <nav className=" z-20 sticky shadow-2xl top-0 w-full bg-[#010922] sm:hidden block px-6 py-5">
          <div className=" flex justify-between items-center">
          <div className="relative w-full"  onMouseLeave={()=>setShowCreateItems(false)}>
              <button  onMouseOver={()=>setShowCreateItems(true)} type="button" className="  w-10 h-10 rounded-full ring-1 ">
                <Image unoptimized className=" object-cover rounded-full" src={image} width={100} height={100} alt="not found"/>
              </button>
              {showCreatItems && <div  className=" bg-black w-fit text-white rounded shadow-sm absolute top-10 left-0">
                <ul>
                  <li>
                    <button onClick={()=>router.push('/profile')} className=" px-4 py-2 w-full text-left">Profile</button>
                  </li>
                  <li>
                    <button onClick={()=>setExpenseForm(true)} className=" px-4 py-2 w-full text-left">Create Expense</button>
                  </li>
                  <li>
                    <button onClick={()=>setCategoryForm(true)} className=" px-4 py-2 w-full text-left">Create Category</button>
                  </li>
                </ul>
              </div>}
            </div>
            <div className=" p-2 bg-gray-900 rounded bg-opacity-50">
              {!showNavbar ? 
              <TbList onClick={()=>setShowNavbar(true)} size={30} className=' text-white font-bold'/>
              :
              <TbX onClick={()=>setShowNavbar(false)} size={30} className=' text-white font-bold'/>
            }
            </div>
          </div>
          {showNavbar && 
          <ul className="absolute p-2 px-4 w-40 bg-[#000] bg-opacity right-5 text-white flex flex-col ">
            <li className=" w-full">
              <Link href={'/home'} className=" py-2 w-full mx-0 px-0 block text-left hover:text-[#522d8b]">Home</Link>
            </li>
            <li className=" w-full">
              <Link href={'/spendings'} className=" py-2 w-full mx-0 px-0 block  text-left hover:text-[#522d8b]">Spendings</Link>
            </li>
            <li className=" w-full">
              <Link
                href={'/categories'}
              className=" py-2 w-full mx-0 px-0 block text-left hover:text-[#522d8b]">
                Categories
              </Link>
            </li>
            <li className=" w-full">
              <button className=" w-full text-left py-2 hover:text-[#522d8b]" onClick={async()=>{
                  const logout=await (await fetch('/api/logout',{
                    method:'GET',
                    headers:{
                      'content-type':'application/json'
                    }
                  })).json()
                  window.location.reload()
                }
                }
                type="button">
                Logout
              </button>
            </li>
          </ul>}
        </nav>
        <MyModal isOpen={expenseForm} closeModal={()=>setExpenseForm(false)}>
              <ExpenseForm setCategoryForm={setCategoryForm} setExpenseForm={setExpenseForm}/>
        </MyModal>

        <MyModal isOpen={categoryForm} closeModal={()=>setCategoryForm(false)}>
              <CategoryForm setCategoryForm={setCategoryForm}/>
        </MyModal>
        </>
    )
}
