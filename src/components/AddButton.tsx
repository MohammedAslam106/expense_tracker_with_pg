import { TbPlus } from "react-icons/tb";

interface AddButtonProps{
    
}

export default function AddButton({}:AddButtonProps ){
    return(
        <>
            <div className=" z-30  hidden fixed top-28 right-5">
                <button className="  p-3 rounded-full shadow-sm ring-1 bg-transparent text-white hover:bg-purple-500 ">
                    <TbPlus size={35}/>
                </button>
            </div>
        </>
    )
}