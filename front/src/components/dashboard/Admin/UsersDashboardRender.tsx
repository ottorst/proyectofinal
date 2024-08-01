//Contexts
import { useCrud } from "../../CrudContext"

//Types
import { IUser } from "@/src/types/IUser"




const UsersDashboardRender:React.FC<IUser> = ({id,name,email,country}) => {
  const {handleUserDelete} = useCrud();


  return (
    <div>
    <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center space-y-2 min-w-[150px]
    border-transparent transform transition-colors duration-500 hover:bg-black hover:bg-opacity-25
    ">
        <div className="relative bottom-2 left-28"><button onClick={() => handleUserDelete(id)}>❌</button></div>
    <h1 className="text-gray-100 text-xl font-semibold">👤Name: {name}</h1>
    <p className="text-gray-300">Email: {email}</p>
    <p className="text-gray-400">🌎Country: {country}</p>
    <p className="text-gray-400">🪪ID: {id}</p>
  </div>
   </div>
  )
}

export default UsersDashboardRender;