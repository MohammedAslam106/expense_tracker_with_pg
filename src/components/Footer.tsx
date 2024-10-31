import { TbBrandGithub, TbBrandLinkedin, TbBrandX, TbMail, TbMapPin, TbPhone } from "react-icons/tb";

interface FooterProps{
    
}

export default function Footer({}:FooterProps ){
    return(
        <>
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
        </>
    )
}


