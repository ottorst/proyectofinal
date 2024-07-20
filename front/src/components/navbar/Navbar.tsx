// Vendors
import Link from "next/link";
import Image from "next/image";

const Navbar:React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center max-w-screen-xl mx-auto">
      
      <Image src="/assets/cocinero.png" alt="Logo chef" width={118} height={133} className="mt-4 relative flex-shrink-0 w-full md:w-auto"/>

      
      <div className="flex-grow"></div>

      <div className="flex flex-col md:flex-row md:gap-9 mr-12 text-slate-50 text-xl space-y-4 md:space-y-0 ">
        <Link href="#">
          Home
        </Link>
        <Link href="#">
          About
        </Link>
        <Link href="#">
          Register
        </Link>
        <Link href="#">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
