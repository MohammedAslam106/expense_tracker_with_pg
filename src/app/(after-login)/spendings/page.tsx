'use client'
import AddButton from "@/components/AddButton"
import { useState } from "react"
import { TbArrowBadgeDownFilled, TbArrowBadgeUpFilled, TbDotsVertical, TbX } from "react-icons/tb"

interface pageProps{
    
}

export default function Page({}:pageProps ){
    const [showDetailBar,setShowDetailBar]=useState<boolean>(false)
    const [coordinates,setCoordinates]=useState({x:0,y:0})
    const currencyFormat=new Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:'INR'
    })
    return(
        <>
            <div className="relative text-white bg-[#010922] min-h-screen sm:px-24 px-6 flex flex-col justify-center items-center    ">
                <div className=" w-full absolute top-0 left-0 sm:px-24 px-6 my-5">
                    <ul className=" flex flex-col justify-end items-end gap-3">
                        <li className=" w-full">
                            <input placeholder="Search here..." type="text" className=" focus:ring-1 ring-gray-200 w-full rounded-xl py-2 px-5 bg-transparent border" />
                        </li>
                        <li className="">
                            <select className=" bg-transparent py-2 px-4 rounded shadow-sm ring-1  ">
                                <option className=" text-black" value="">All</option>
                                <option className=" text-black" value="">Paid</option>
                                <option className=" text-black" value="">Unpaid</option>
                                <option className=" text-black" value="">Partially Paid</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div className=" mt-[120px] flex flex-wrap gap-5 justify-center items-center py-3">
                    {Array(15).fill(0).map((card,ind)=>{
                        return(
                    <div key={ind} className=" relative p-5 border rounded shadow-sm hover:shadow-lg spending-card">
                        <div className=" flex justify-between items-center">
                            <div>
                                <h1 className=" text-3xl font-semibold text-[#546aab]">This is the title</h1>
                                <span>{new Date().toUTCString().slice(0,16)}</span>
                            </div>
                            <div className=" relative">
                                <button onClick={(e)=>{
                                    e.stopPropagation()
                                    setCoordinates({x:e.pageX,y:e.pageY})
                                    setShowDetailBar(true)
                                }} className=" p-1 rounded shadow-sm border bg-transparent">
                                    <TbDotsVertical size={20}/>
                                </button>
                                
                            </div>
                        </div>
                        <p className=" truncate w-56 sm:w-96">This is the description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur cupiditate mollitia maxime aut voluptas, odit nam necessitatibus voluptatibus, assumenda at cum quod nemo quisquam aliquid neque impedit quos vel harum iusto tenetur ea ex! Excepturi quos unde recusandae quod, est fugiat. Dicta velit necessitatibus aperiam.</p>
                        <p className=" py-4 font-semibold">Status: {ind%2==0 ? <span className=" px-4 py-2 bg-green-400 shadow-sm rounded">Paid</span> : <span className=" px-4 py-2 bg-orange-400 shadow-sm rounded">Unpaid</span>}  </p>
                        <div className=" font-semibold flex flex-wrap justify-start gap-2 items-center overflow-hidden">
                            <span className=" p-2 rounded shadow-sm bg-blue-400">Category-1</span>
                            <span className=" p-2 rounded shadow-sm bg-blue-400">Category-2</span>
                            <span className=" p-2 rounded shadow-sm bg-blue-400">Category-3</span>
                        </div>
                        {/* <button className=" z-20 sm:hidden block bg-black bg-opacity-[0.5] float-right p-1 border rounded shadow-sm" type="button">
                            <TbArrowBadgeUpFilled size={30}/>
                        </button> */}
                        <div className="paid-amount flex flex-col justify-center items-center p-3 relative">
                            <h1 className=" text-2xl font-semibold "> {currencyFormat.format(ind+1*500.31)}</h1>
                            
                        </div>
                    </div>

                        )
                    })}
                    {showDetailBar && 
                    <div onMouseLeave={()=>setShowDetailBar(false)} style={{left:coordinates.x-110,top:coordinates.y-75}} className=" z-20 border rounded shadow-sm bg-white text-black absolute w-32">
                        <ul>
                            <li>
                                <button className="text-left w-full p-2">Show more</button>
                            </li>
                            <li>
                                <button className="text-left w-full p-2">Edit</button>
                            </li>
                            <li>
                                <button className="w-full text-left p-2">Delete</button>
                            </li>
                            <li>
                                <button onClick={()=>setShowDetailBar(false)} className="w-full text-left p-2">Close</button>
                            </li>
                        </ul>
                    </div>
                    }
                </div>
            </div>
            <AddButton/>
        </>
    )
}