import AddButton from "@/components/AddButton"

interface pageProps{
    
}

export default function page({}:pageProps ){
    return(
        <>
            <div className="relative text-white bg-[#010922] min-h-screen sm:px-24 px-6 flex flex-col justify-center items-center    ">
                <div className=" w-full  absolute top-0 left-0 sm:px-24 px-6 my-5">
                    <ul className=" flex flex-col justify-end items-end gap-3">
                        <li className=" w-full">
                            <input placeholder="Search here..." type="text" className=" focus:ring-1 ring-gray-200 w-full rounded-xl py-2 px-5 bg-transparent border" />
                        </li>
                    </ul>
                </div>
                    <div className=" mt-[83px] mb-10 w-full flex flex-col justify-center items-center gap-3">
                        {Array(15).fill(0).map((val,ind)=>{
                            return(
                                <div key={ind} className=" border shadow-sm rounded p-2 w-full">
                                    <h1 className=" text-lg sm:text-2xl font-semibold">This is the title</h1>
                                    <p className="  w-56 sm:w-[800px] truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque repudiandae sit minus odio adipisci explicabo aspernatur perferendis modi temporibus ut corrupti eaque quasi est, inventore velit facere a soluta obcaecati animi dolores rerum natus blanditiis nulla. Maiores nobis nam accusantium, quisquam tempora soluta vero molestias.</p>
                                </div>
                            )
                        })}
                    </div>
            
            </div>
            <AddButton/>
        </>
    )
}