interface pageProps{
    
}

export default function page({}:pageProps ){
    return(
        <div className='sm:px-24 px-10 bg-[#010922] text-white h-screen flex flex-col justify-center items-center'>
            <div className=" sm:mb-0 mb-10 flex flex-col justify-center items-center gap-3 bg-purple-500 bg-opacity-10 p-6 sm:p-10 rounded shadow-sm">
                <h1 className=" text-2xl sm:text-3xl font-bold sm:mb-14">Forgot Password?</h1>
                <div className=" ">
                    <label className=" font-semibold mb-2">Email or Username:</label>
                    <input type="text" placeholder="Email or Username" className="px-4 py-2 w-full placeholder:text-white rounded shadow-sm bg-transparent ring-1" />
                </div>
                <button className=" w-full flex justify-center rounded py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-300 hover:to-blue-300 font-semibold">Send Mail</button>
            </div>
        </div>
    )
}