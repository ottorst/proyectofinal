//Vendors
import Link from "next/link"
import Image from "next/image"


const Footer:React.FC = () => {
  return (

<div>
    <hr />
    <footer className="w-[90%] mx-auto max-w-screen-xl flex items-center justify-between h-40
    font-lora text-xl
    ">

    

    <Image src={"/assets/cheffooter.svg"} alt="chefFooter" width={110} height={90} className=""/>

    <p>&copy; 2024 culinary experience</p>



        <ul className="flex flex-col md:flex-row md:space-x-5 space-y-2 md:space-y-0">

            <li><Link href={"/"}>Home</Link></li>
            <li><Link href={"/about"}>About</Link></li>
            <li><Link href={"/contact"}>Contact</Link></li>
            <li><Link href={"/privacity"}>Privacity</Link></li>

        </ul>
    </footer>
    
</div>
    
    
  )
}

export default Footer