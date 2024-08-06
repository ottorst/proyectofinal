"use client"
//bookstores
import Swal from "sweetalert2";
//Vendors 
import { useContext, createContext, Dispatch, SetStateAction, ReactNode, useState, useEffect } from "react";
//Types
import { IEvent } from "../types/IEvent";
import { IUser } from "../types/IUser";
import { IBooking } from "../types/IBooking";
//Helpes
import fetchEvents from "./events/helpers";
import { useAuth } from "./AuthContext";


interface CrudContextProps {
  setEvents: Dispatch<SetStateAction<IEvent[]>>;
  events: IEvent[];
  loading: boolean;
  handleEventDelete: (id: number) => void;
  handleUserDelete: (id: number) => void;
  users: IUser[];
  bookings: IBooking[];
}

const CrudContext = createContext<CrudContextProps | null>(null)



export const CrudProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const handleEventDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "surely you want to delete this Event?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/events/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
          Swal.fire("Deleted!", "Your event has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete the event.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "An error occurred while deleting the event.", "error");
      }
    }
  };


  const handleUserDelete = async (id: number) => {

    const result = await Swal.fire({
      title: `surely you want to delete this user?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/users/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete the event.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "An error occurred while deleting the event.", "error");
      }
    }
  };


  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchAllEvents();
  }, []);





  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await fetch("http://localhost:3001/booking")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch Users:", error);
      } finally {
        setLoading(false);
      }

    }
    fetchAllBookings();
  }, []);



  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users")

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch Users:", error);
      } finally {
        setLoading(false);
      }

    }
    fetchAllUsers();
  }, []);



  return (
    <CrudContext.Provider value={{ setEvents, events, loading, handleEventDelete, handleUserDelete, users, bookings }}>
      {children}
    </CrudContext.Provider>
  );
}

export const useCrud = () => {
  const context = useContext(CrudContext);
  if (!context) {
    throw new Error("useCrud must be used within a CrudProvider");
  }
  return context;
};