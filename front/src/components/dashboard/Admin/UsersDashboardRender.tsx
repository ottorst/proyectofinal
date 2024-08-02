//Contexts
import { useCrud } from "../../CrudContext"

//Types
import { IUser } from "@/src/types/IUser"




const UsersDashboardRender:React.FC<IUser> = ({id,name,email,country}) => {
  const {handleUserDelete} = useCrud();


  return (
    <div>
      <div className="flex flex-col space-y-3">
     <ul>
      <li className="flex flex-row space-x-2 "> <p className="font-bold">👤Name: {name}</p>

      <button className="text-red-700 text-2xl hover:text-red-400"
      onClick={() => handleUserDelete(id)}
      >X</button></li>
     </ul>
      </div>
   </div>
  )
}

export default UsersDashboardRender;