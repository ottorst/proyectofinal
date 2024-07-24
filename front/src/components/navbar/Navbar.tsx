
// Vendors
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
const Navbar:React.FC = () => {
  const menuRef = useRef<HTMLInputElement>(null);

  // Función para cerrar el menú
  const handleLinkClick = () => {
    if (menuRef.current) {
      menuRef.current.checked = false;
    }
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
             decoration-4 underline-offset-8 neon-shadow">Home</li></Link>              
             <Link href={"/about"} onClick={handleLinkClick}> <li className="hover:underline 
             decoration-4 underline-offset-8 neon-shadow decoration-yellow-500">About</li></Link>
             <Link href={"/experience"} onClick={handleLinkClick}> <li className="hover:underline 
             decoration-4 underline-offset-8 neon-shadow ">Experiences</li></Link>
             <Link href={"/login"} onClick={handleLinkClick}><li className="hover:underline 
             decoration-4 underline-offset-8 decoration-yellow-500 neon-shadow">Login</li></Link>
      </ul>
    </div>

      </nav>

    </header>
   </div>
  );
};

export default Navbar;
