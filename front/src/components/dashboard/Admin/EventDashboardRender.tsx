//Types
import { IEvent } from "@/src/types/IEvent"
//Vendors
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Router, { useRouter } from "next/navigation"
//contexts
import { useCrud } from "../../CrudContext"
import { useAuth } from "../../AuthContext"
//Libraries
import Swal from "sweetalert2"




const DataRender:React.FC<IEvent> = ({picture,title,price,date,id,location,maxseats,description,subtitle}) =>  {
const {handleEventDelete,setEvents} = useCrud();
const [editMode,setEditMode] = useState(false);
const [formData, setFormData] = useState<IEvent>({
  id,
    title,
    subtitle: subtitle || "",
    description: description || "",
    date,
    location: location || "",
    maxseats: maxseats || 0,
    price,
    picture: picture || "",
  
});
const router = useRouter();
const {user} = useAuth();


const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
   const {name, value} = event.target;
  if(formData){
    setFormData({
      ...formData,
      [name]:value
    })
  }

};


const handleSubmit = async (event:React.FormEvent) => {
  event.preventDefault();
  if (!formData) return;
  try {
    const response = await fetch(`http://localhost:3001/events/${id}`,
      {
        method:"PUT",
        headers:{'Content-Type': 'application/json',},
        body:JSON.stringify({
          title:formData.title,
          subtitle:formData.subtitle,
          description:formData.description,
          date:String(formData.date),
          location:formData.location,
          maxseats:Number(formData.maxseats),
          price:Number(formData.price),
          picture:formData.picture
        })
      }
    )
       
    if (response.ok) {
      const updatedEvent = await response.json();
      setEvents(prevEvents => prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      ));
      
      setEditMode(false);
      Swal.fire({
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
      }).then(() => {
          router.push(`/account/admin/${user?.id}/dashboard`);
      })
  }else{
    const errorResponse = await response.json();
    console.error('Failed to update event data:', errorResponse.message);
  } 
    
  }catch (error) {
    
    console.error('Error updating Event:',error);
}

setEditMode(false);
}





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

    <button className="bg-blue-500 text-white px-2 py-2 
    rounded w-32 hover:bg-blue-400" onClick={() => setEditMode(true)}>Edit Event</button>
  </div>




  {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
      
            <div className="mb-2">
              <label className="block text-gray-800">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-2 py-1 rounded text-black border"
              />
            </div>
      
            <div className="mb-2">
              <label className="block text-gray-800">Subtitle:</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-2 py-1 rounded text-black border"
              />
            </div>
      
            <div className="mb-2">
              <label className="block text-gray-800">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-2 py-1 rounded text-black border"
              />
            </div>
      
            <div className="mb-2">
              <label className="block text-gray-800">Date:</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-2 py-1 rounded text-black border"
              />
            </div>
      
            <div className="mb-2">
              <label className="block text-gray-800">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-2 py-1 rounded text-black border"
              />
            </div>
      
        
            <div className="mb-2">
              <label className="block text-gray-800">maxseats:</label>
              <input
                type="number"
                name="maxseats"
                value={formData.maxseats}
                onChange={handleChange}
                className="w-full px-2 py-1 rounded text-black border"
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-gray-800">Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-2 py-1 rounded text-black border"
              />
            </div>
      
            <div className="mb-2">
              <label className="block text-gray-800">Picture:</label>
              <input
                type="text"
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                className="w-full px-2 py-1 rounded text-black border"
              />
            </div>
      
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
   </div>
  )
}

export default DataRender

