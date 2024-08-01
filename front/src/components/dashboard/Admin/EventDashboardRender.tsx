//Types
import { IEvent } from "@/src/types/IEvent"
//Vendors
import Image from "next/image"
import Link from "next/link"
//contexts
import { useCrud } from "../../CrudContext"



const DataRender:React.FC<IEvent> = ({picture,title,price,date,id}) =>  {
const {handleEventDelete} = useCrud();
   

  return (

    
   <div>
    <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center space-y-2 min-w-[150px]
    border-transparent transform transition-colors duration-500 hover:bg-black hover:bg-opacity-25
    ">
        <div className="relative bottom-2 left-28"><button onClick={()=> handleEventDelete(id)}>❌</button></div>
    <Link href="/experience"><Image src={picture} alt={title} width={120} height={100} 
    className="rounded-md cursor-pointer" /></Link>
    <h1 className="text-gray-100 text-xl font-semibold">{title}</h1>
    <p className="text-gray-300">Price: {price}💲</p>
    <p className="text-gray-400">Date: 📅{new Date(date).toDateString()}</p>
  </div>
   </div>
  )
}

export default DataRender

