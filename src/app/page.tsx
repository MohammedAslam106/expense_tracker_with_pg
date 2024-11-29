"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {TbMapPin,TbMail, TbList, TbX, TbPhone, TbBrandGithub,TbBrandLinkedin,TbBrandX, TbArrowLeft, TbArrowRight} from 'react-icons/tb'
import { useRouter } from "next/navigation";
import {useSession} from 'next-auth/react'

export default function Home() {
  const [showNavbar,setShowNavbar]=useState<boolean>(false)
  const router=useRouter()
  const {data:session}= useSession()
  // console.log(18,session)

  return (
    <>
      <div className=" w-full bg-[#010922]">
        {/* Navbar big screen */}
        <nav className=" mobile-h:sticky sm:block hidden sticky bg-[#010922] top-0 w-full py-5 sm:px-24 px-6 shadow-2xl text-white ">
          <div className="flex justify-between items-center">
            <div>Logo</div>
            <div className=" flex justify-center items-center gap-5 sm:gap-10">
              <button
                className=" ring-slate-500 hover:ring-1 hover:bg-white hover:text-black font-semibold p-2 px-6 shadow-sm bg-[#522d8b] rounded-full"
                onClick={()=>router.push('/signup')}
                type="button"
              >
                Signup
              </button>
              <button
                className="hover:bg-white hover:text-black hover:ring-1 ring-slate-500 font-semibold p-2 px-6 shadow-sm bg-[#522d8b] rounded-full"
                onClick={()=>router.push('/login')}
                type="button"
              >
                Login
              </button>
              <Link href={'#footer'}
                className="hover:bg-white hover:text-black hover:ring-1 ring-slate-500 font-semibold p-2 px-6 shadow-sm bg-[#522d8b] rounded-full"
                
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
        {/* Navbar screen small */}
        <nav className=" sticky shadow-2xl top-0 w-full bg-[#010922] sm:hidden block px-6 py-5">
          <div className="relative flex justify-between items-center">
            <div className=" text-white">Logo</div>
            <div className=" p-2 bg-gray-900 rounded bg-opacity-50">
              {!showNavbar ? 
              <TbList onClick={()=>setShowNavbar(true)} size={30} className=' text-white font-bold'/>
              :
              <TbX onClick={()=>setShowNavbar(false)} size={30} className=' text-white font-bold'/>
            }
            </div>
          </div>
          {showNavbar && 
          <ul className="absolute p-2 px-4 w-40 bg-[#000] bg-opacity right-5 text-white">
            <li>
              <button onClick={()=>router.push('/signup')} className=" py-2 w-full text-left">Signup</button>
            </li>
            <li>
              <button onClick={()=>router.push('/login')} className=" py-2 w-full  text-left">Login</button>
            </li>
            <li className=" w-full">
              <button className=" py-2 w-full text-left">
                <a href={'#footer'}  >Contact</a>
              </button>
            </li>
          </ul>}
        </nav>
        {/* Body */}
        <div className="min-h-screen sm:px-24 px-6 flex flex-col justify-center items-center sm:-mt-[80px] mobile-h:mt-[60px] ">
          {/* body-1 */}
          <div className=" sm:h-screen flex sm:flex-row flex-col-reverse  justify-center items-center gap-5 sm:gap-5 ">
            <div className=" sm:w-[150%] w-full">
              <h1 className=" text-white font-bold text-4xl leading-tight sm:text-[4vw]">
                Simplify Expense Tracking and Management.
              </h1>
              <p className=" text-white font-semibold">
                Simplify finances with our Expense Tracker: Record, budget, gain
                insights.
              </p>
              <div className=" flex mt-2 items-center gap-4">
                <button
                  onClick={()=>router.push('/signup')}
                  type="button"
                  className=" rounded-full px-12 sm:px-12 py-2 sm:py-3 bg-[#82498c] text-white font-semibold hover:bg-transparent hover:ring-1 ring-slate-500"
                >
                  Register Now
                </button>
                {/* <Link
                  href={'#footer'}
                  className=" text-center rounded-full px-4 sm:px-6 py-2 sm:py-3 bg-[#82498c] text-white font-semibold hover:bg-transparent hover:ring-1 ring-slate-500"
                >
                  Contact Us
                </Link> */}
              </div>
            </div>
            <div className=" w-[100%]">
              <Image alt="not found" width={100} height={100} src="/hero-1.svg" className=" w-full " />
            </div>
          </div>
          {/* <div className=" pe-[-24px] bg-white w-full h-[1px] my-3 text-white"></div> */}
          {/* body-2 */}
          <div className=" py-8 flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-5 sm:my-5">
            <div className=" w-full">
              <Image alt="not found" width={100} height={100} src="/hero-2.svg" className=" w-full -my-10"  />
            </div>
            <div className=" w-full sm:w-[150%]">
              <h1 className="text-white font-bold text-4xl leading-tight sm:text-[4vw]">Visualize and Manage Expenses Seamlessly.</h1>
              <p className=" text-white text-justify font-semibold ">
                Our website&apos;s Expense Tracking Graph is a real-time tool
                that visually represents expenses, aids in budgeting, and
                provides insights into spending habits. Users can customize time
                frames, explore specific expenses, and ensure data security for
                informed financial management.
              </p>
            </div>
          </div>
          {/* body-3 */}
          <div className=" py-8 flex flex-col-reverse sm:flex-row justify-center items-center gap-5 sm:gap-5 sm:my-5">
            <div className=" w-full sm:w-[150%]">
              <h1 className="text-white font-bold text-4xl leading-tight sm:text-[4vw]">Simplify Expense Management with Search</h1>
              <p className=" w-full text-white text-justify font-semibold">
              Discover the Ease and Efficiency of Streamlined Expense Tracking and Management Through Our Search Feature. Find, Analyze, and Organize Your Finances with Precision and Speed.

              </p>
            </div>
            <div className=" w-full">
              <Image alt="not found" width={100} height={100} src="/hero-3.svg" className=" w-full"  />
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer id="footer" className=" py-10 px-6 sm:px-24 bg-[#22242A]  text-white">
          <h1 className=" font-bold w-full">Logo</h1>
          <div className=" flex flex-wrap justify-between items-start gap-10 sm:gap-16">
            <ul className=" sm:max-w-sm overflow-hidden">
              <h1 className=" mb-2">Web developer</h1>
              <li className=" mb-2">
                <p>Hi! My name is Mohammed Aslam and i’m an expert in web development. I can help you make your website more attractive</p>
              </li>
              <li className=" flex justify-start items-center gap-2">
                <TbMapPin/>
                <p>Davangere, Karnataka, India</p>
              </li>
              <li className=" flex justify-start items-center gap-2">
                <TbMail/>
                <a href="">mohammedaslam4106@gmail.com</a>
              </li>
              <li className=" flex justify-start items-center gap-2">
                <TbPhone/>
                <a href="">+91-9482599734</a>
              </li>
            </ul>
            <ul className="">
              <h1>Question Us</h1>
              <li className=" flex justify-start gap-8 place-items-end my-2">
                <label className=" -mb-1">Name:</label>
                <input type="text" placeholder="Name" className="inp bg-[#22242A] w-full" />
              </li>
              <li className=" flex justify-start gap-[35px] place-items-end my-2">
                <label className=" -mb-1">Email:</label>
                <input type="text" placeholder="Email" className="inp bg-[#22242A] w-full" />
              </li>
              <li className=" flex justify-start gap-[20px] place-items-end my-2">
                <label className=" -mb-1">Subject:</label>
                <input type="text" placeholder="Subject" className="inp bg-[#22242A] w-full" />
              </li>
              <li className=" flex justify-start gap-[10px] place-items-end my-2">
                <label className=" -mb-1">Message:</label>
                <input type="text" placeholder="Message" className="inp bg-[#22242A] w-full" />
              </li>
              <button className=" hover:bg-transparent hover:ring-1 hover:text-white w-full rounded shadow-sm bg-white font-semibold mt-2 py-2 text-[#22242A]">Get Started</button>
            </ul>
            <ul className="">
              <h1 className="">Social Media</h1>
              {/* <li className=" hover:bg-white hover:text-[#22242A]  border border-gray-400 rounded p-1 flex justify-center items-center my-3">
                <TbBrandInstagram size={25} className=''/>
              </li>
              <li className=" hover:bg-white hover:text-[#22242A]  border border-gray-400 rounded p-1 flex justify-center items-center my-3">
                <TbBrandFacebook size={25}/>
              </li> */}
              <li className=" hover:bg-white hover:text-[#22242A]  border border-gray-400 rounded p-1 flex justify-center items-center my-3">
                <TbBrandGithub size={25}/>
              </li>
              <li className=" hover:bg-white hover:text-[#22242A]  border border-gray-400 rounded p-1 flex justify-center items-center my-3">
                <TbBrandLinkedin size={25}/>
              </li>
              <li className=" hover:bg-white hover:text-[#22242A]  border border-gray-400 rounded p-1 flex justify-center items-center my-3">
                <TbBrandX size={25}/>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
