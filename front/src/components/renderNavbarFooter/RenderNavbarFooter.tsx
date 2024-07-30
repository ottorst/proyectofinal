"use client"

//Vendors
import { usePathname } from "next/navigation"
import { ReactNode } from "react";
//Components
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

interface ClientProps{
  children:ReactNode
}

const RenderNavbarFooter:React.FC<ClientProps> = ({children}) => {

const pathname = usePathname();
const showNavbarAndFooter = pathname !== "/" && pathname !== "/404" && pathname !== "/loading";

return (

    <div> 
  {showNavbarAndFooter ? <Navbar/>:null}
    {children}
  {showNavbarAndFooter ? <Footer/>:null}
    </div>
  )
}

export default RenderNavbarFooter