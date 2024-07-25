"use client"

// Vendors
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { FaUser } from 'react-icons/fa';
import { useState,useEffect } from "react";



const Navbar:React.FC = () => {
  const menuRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(false);
   const[token,setToken] = useState<string|null>(null);
   
   useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [])
   

  const handleLinkClick = () => {
    if (menuRef.current) {
      menuRef.current.checked = false;
    }
  };

  const handleLogOut = () => {
    if (menuRef.current) {
      menuRef.current.checked = false;
    }
    localStorage.removeItem("token");
    setToken(null);
  };

  

  
  return (
    <div>
    <header>
    <p></p>
    <p></p>
      <nav className="wrapper h-40 flex items-center justify-between">
      <Link href={"/home"}
      className="w-1/3 max-w-[100px] transition-transform duration-300 ease-in-out transform hover:scale-110"
      ><Image src={"/assets/sombrerologo.svg"} alt="" width={100} height={100} className="w-full ml-4"/></Link>

      <input type="checkbox" id="menu" className="peer hidden" ref={menuRef} />
      
      <label htmlFor="menu" className="bg-open-menu w-14 h-12 bg-cover bg-center
      cursor-pointer peer-checked:bg-close-menu z-50 md:hidden 
      "
      ></label>
    
    <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-white/70 translate-x-full
    peer-checked:translate-x-0 transition-transform md:static md:bg-none md:translate-x-0 font-lora
    ">
      <ul className="absolute inset-x-0 top-24 p-12 w-[90%] mx-auto
      rounded-md h-max text-center grid gap-6 md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static
      text-xl mr-6
      ">
             <Link href={"/home"} onClick={handleLinkClick}> <li className="hover:underline 
             decoration-4 underline-offset-8 ">Home</li></Link> 

             <Link href={"/about"} onClick={handleLinkClick}> <li className="hover:underline 
             decoration-4 underline-offset-8  decoration-yellow-500">About</li></Link>

             <Link href={"/experience"} onClick={handleLinkClick}> <li className="hover:underline 
             decoration-4 underline-offset-8  ">Experiences</li></Link>

             {token ?<Link href={"/login"} onClick={handleLogOut}><li className="hover:underline
             offset-8 decoration-yellow-500">
              <Image src={"/assets/signout-icon.svg"} alt="" width={45} height={50} className="red-filter shadow-xl"/>
              </li></Link>:

            <Link href={"/login"} onClick={handleLinkClick}><li className="hover:underline 
              decoration-4 underline-offset-8 decoration-yellow-500">
                <Image src={"/assets/signin-icon.svg"} alt="" width={45} height={50} className="green-filter shadow-xl"/>
                </li></Link>}

             {token ? <Link href={"/dashboardadmin"} onClick={handleLinkClick}><li className="hover:underline 
             decoration-4 underline-offset-8 decoration-yellow-500 "><FaUser size={45}
             className=" transition-transform duration-300 ease-in-out transform hover:scale-125
             hover:text-yellow-500
             "/></li></Link>:null}
             

             
      </ul>
    </div>

      </nav>

    </header>
   </div>
  );
};

export default Navbar;
