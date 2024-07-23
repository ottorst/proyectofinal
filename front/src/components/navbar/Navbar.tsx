// Vendors
import Link from "next/link";
import Image from "next/image";

const Navbar:React.FC = () => {
  return (
    <div>
    <header>
    <p></p>
    <p></p>
      <nav className="wrapper h-40 flex items-center justify-between">
      <Link href={"/"}
      className="w-1/3 max-w-[100px]"
      ><Image src={"/assets/sombrerologo.svg"} alt="" width={100} height={100} className="w-full"/></Link>

      <input type="checkbox" id="menu" className="peer hidden"/>
      
      <label htmlFor="menu" className="bg-open-menu w-14 h-12 bg-cover bg-center
      cursor-pointer peer-checked:bg-close-menu z-50 md:hidden 
      "></label>
    
    <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-white/70 translate-x-full
    peer-checked:translate-x-0 transition-transform md:static md:bg-none md:translate-x-0 font-lora
    ">
      <ul className="absolute inset-x-0 top-24 p-12 bg-black-smoked w-[90%] mx-auto
      rounded-md h-max text-center grid gap-6 md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static
      text-xl
      ">
             <Link href={"/"}> <li>Home</li></Link>              
             <Link href={"/about"}> <li>About</li></Link>
             <Link href={"experience"}> <li>Experience</li></Link>
             <Link href={"/login"}><li>Login</li></Link>
      </ul>
    </div>

      </nav>

    </header>
   </div>
  );
};

export default Navbar;
