// Vendors
import Link from "next/link";
import Image from "next/image";

const Navbar:React.FC = () => {
  return (
    <div>
    <header>

      <nav className="wrapper h-28 flex items-center justify-between">
      <Link href={"/"}
      className="w-1/3 max-w-[100px]"
      ><Image src={"/assets/sombrero.png"} alt="" width={50} height={50} className="w-full"/></Link>

      <input type="checkbox" id="menu" className="peer hidden"/>
      
      <label htmlFor="menu" className="bg-open-menu w-14 h-12 bg-cover bg-center
      cursor-pointer peer-checked:bg-close-menu z-50 md:hidden 
      "></label>
    
    <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-white/70 translate-x-full
    peer-checked:translate-x-0 transition-transform md:static md:bg-none md:translate-x-0 font-lora
    ">
      <ul className="absolute inset-x-0 top-24 p-12 bg-gray-400 w-[90%] mx-auto
      rounded-md h-max text-center grid gap-6 md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static
      text-xl
      ">
             <Link href={""}> <li>Home</li></Link>              
             <Link href={""}> <li>About</li></Link>
             <Link href={""}> <li>Menu</li></Link>
             <Link href={""}> <li>Contact</li></Link>
      </ul>
    </div>

      </nav>

    </header>
   </div>
  );
};

export default Navbar;
