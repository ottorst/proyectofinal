"use client"
//Types
import { IEvent } from "@/src/types/IEvent"
//Vendors
import { useState,useEffect } from "react"
import Image from "next/image"
//Helpers
import fetchEvents from "./helpers"



const Events:React.FC = () => {


const [events,setEvents] = useState<IEvent[]>([]);
const [loading,setLoading] = useState(true);
const [error,setErrors] = useState<Error|null>(null);
   
useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error:unknown) {
        if(error instanceof Error){
            setErrors(error)
        }else {
            setErrors(new Error("Unknown error occurred"));
        }
       } finally{
      setLoading(false);
      }

    }
    loadEvents();

},[]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 my-9">
      {events.map((event)=>
       <div className="flex flex-col items-center bg-gray-800 bg-opacity-75 rounded-md p-4
       text-center space-y-4
       ">

        <div>
          <Image src={event.picture} alt="Event Picture" width={200} height={300}/>
        </div>

        
         <h1 className="text-xl font-bold text-white">{event.title}</h1>
       <h2 className="text-lg font-medium text-gray-300">{event.subtitle}</h2>
       <p className="text-gray-200">{event.description}</p>
       <p className="text-gray-400">{`Date: ${new Date(event.date).toLocaleDateString()}`}</p>
       <p className="text-gray-400">{`Location: ${event.location}`}</p>
       <p className="text-gray-400">{`MaxSeats: ${event.maxseats}`}</p>
       <p className="text-gray-400">{`Price: $${event.price}`}</p>
       <button className="bg-yellow-500 rounded-md hover:bg-yellow-700
       px-8 py-4
       ">BookNow</button>
         </div>

    
      )}
    </div>

  
  );
};

export default Events