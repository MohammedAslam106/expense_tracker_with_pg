'use client'
import AddButton from "@/components/AddButton";
import { LineChart } from "@/components/LineChart";
import { useEffect, useState } from "react";

interface pageProps{
    name:String,
    age:Number,
    dob:Date
}


// const mb=(time:number)=>new Promise((resolve)=>setTimeout(resolve,time))
export default function Page(){
    const [dateFrom,setDateFrom]=useState<any>(null)
    const [dateTo,setDateTo]=useState<any>(null)
    const [range,setRange]=useState<number>(0)
    const [labels,setLabels]=useState<string[]>(['January', 'February', 'March', 'April', 'May',])
    const [dataValue,setDataValue]=useState<number[]>([100,20,3000,40,5,])
    // const labels = ['January', 'February', 'March', 'April', 'May',];
    
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            // data: [100,200,300,400,500,],
            data:dataValue,
            borderColor: 'rgba(255, 255, 255)',
            backgroundColor: 'rgba(0,0,0, 0.5)',
          },
        ],
      };

      useEffect(()=>{
        if (range==0 || Number.isNaN(range)) setDataValue([100,20,3000,40,5,])
        else setDataValue(Array(5).fill(0).map((val,i)=>range/5*i+1))
        // setLabels()
      },[dateFrom,dateTo,range])

    return(
        <>
            <div className="relative text-white bg-[#010922] min-h-screen sm:px-24 px-6 flex flex-col justify-center items-center  ">
                <h1 className=" font-bold text-xl  sm:text-3xl py-5 text-left nav-btn">
                    Track Your <i className="text-[#522d8b]">Spendings.</i>
                </h1>
                <div className=" flex sm:flex-col flex-col justify-center items-center gap-20">
                    <div className=" w-[90vw] sm:w-[48rem] border rounded shadow-sm p-5  bg-transparent text-red-500"> 
                        <LineChart data={data}/>
                    </div>
                    <div className=" ">
                        <ul className=" sm:flex sm:flex-row justify-center items-center gap-2">
                            <li className=" my-2 xs:flex-col p-3 rounded shadow-sm border sm:flex justify-center items-center gap-2">
                                <label>
                                    From: 
                                    <br />
                                    <input value={new Date().toISOString().slice(0,10)} onChange={(e)=>setDateFrom(e.target.value)} className="w-full bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" type="date" />
                                </label>
                                <br />
                                <label >
                                    To: 
                                    <br />
                                    <input value={new Date(new Date().setDate(new Date().getDate()-5)).toISOString().slice(0,10)} onChange={(e)=>setDateTo(e.target.value)} type="date" className="w-full bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                                </label>
                            </li>
                            <li className="p-3 rounded shadow-sm border my-2">
                                <label>
                                    Range: 
                                    <br />
                                    <input value={range} onChange={(e)=>setRange(e.target.valueAsNumber)} type="number" placeholder="Starting range" className="bg-transparent placeholder:text-white px-4 py-2 rounded shadow-sm border border-gray-200" />
                                </label>
                            </li>
                            <li className="p-3 rounded shadow-sm border my-2">
                                <p>Total:5000</p>
                                <hr />
                            </li>
                        </ul>
                    </div>
                </div>
            <AddButton/>
            </div>
        </>
    )
}

// export default Page;