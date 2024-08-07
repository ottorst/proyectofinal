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
//Types
import { Booking } from "./IBookings"


const DataRender: React.FC<IEvent> = ({ picture, title, price, date, id, location, maxseats, description, subtitle, totalPersons,totalBookings }) => {
  const { handleEventDelete, setEvents, } = useCrud();
  const [editMode, setEditMode] = useState(false);
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
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value
      })
    }

  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData) return;
    try {
      const response = await fetch(`http://localhost:3001/events/${id}`,
        {
          method: "PUT",
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            date: String(formData.date),
            location: formData.location,
            maxseats: Number(formData.maxseats),
            price: Number(formData.price),
            picture: formData.picture
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
      } else {
        const errorResponse = await response.json();
        console.error('Failed to update event data:', errorResponse.message);
      }

    } catch (error) {

      console.error('Error updating Event:', error);
    }

    setEditMode(false);
  }


  const handleFetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/eventsWithBookingsAndUsers?id=${id}`);
      if (response.ok) {
        const eventData = await response.json();
        const event = eventData.find((e: any) => e.id === id);

        if (event && event.bookings) {
          setBookings(event.bookings);
        } else {
          console.error('No bookings found for this event');
        }
        setShowModal(true);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const totalSeatsRemain = maxseats - (totalPersons || 0)


  return (




    <div>


      <section id="resumen" className="mb-8">

        <div className="bg-gray-800 p-4 rounded shadow-md">
          <ul>

            <li key={id} className="flex flex-wrap justify-between items-center py-2 border-b space-x-4 space-y-0">
              <div className="flex-1 min-w-[200px]">
                <Link href={"/experience"}><span className=" hover:text-blue-500">{title} - {new Date(date).toLocaleDateString()}</span></Link>
              </div>
              <div className="min-w-[100px] md:w-32">
                <span className="">Price: {price}$</span>
              </div>
              <div className="min-w-[80px] md:w-28">
                <span className="">Bookings: {totalBookings} </span>
              </div>
              <div className="min-w-[80px] md:w-28">
                <span className="">SeatRemain: {totalSeatsRemain} </span>
              </div>

              <div className="flex space-x-2 mt-2 lg:mt-0">
                <button onClick={() => setEditMode(true)} className="text-white bg-blue-500  hover:bg-blue-400  font-medium rounded-lg text-sm px-1 py-2.5 text-center">
                  Edit Event
                </button>
                <button onClick={() => handleEventDelete(id)} className="text-white bg-red-700 hover:bg-red-500  rounded-lg text-sm px-1 py-2.5 text-center ">
                  Delete Event
                </button>
                <button className="text-white bg-yellow-500 hover:bg-yellow-400  rounded-lg text-sm px-1 py-2.5 text-center"
                  onClick={handleFetchUsers}
                >
                  Users
                </button>
              </div>
            </li>




          </ul>
        </div>
      </section>



      {showModal && (
        <div className="fixed inset-0 flex justify-center bg-gray-800 bg-opacity-75 items-center z-50">
          <div className="bg-gray-800 p-4 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Registered Users</h2>
            {bookings.length > 0 ? (
              <ul>
                {bookings.map((booking) => (
                  <li key={booking.TransactionNumber} className="border-b py-2">
                    <div>
                      <span className="font-medium">👤{booking.user.name}</span> -{" "}
                      📧 {booking.user.email}
                    </div>
                    <div>
                      <span>📱Phone: {booking.user.phone}</span>
                    </div>
                    <div>
                      <span>🎟️Quantity: {booking.Quantity}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-white">No Users regsiter to this event.</p>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-white bg-blue-500 hover:bg-blue-400 rounded-lg px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}



      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-4 text-center">Edit Event</h2>

              <div className="mb-2">
                <label className="block ">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded text-black border"
                />
              </div>

              <div className="mb-2">
                <label className="block ">Subtitle:</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded text-black border"
                />
              </div>

              <div className="mb-2">
                <label className="block ">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded text-black border"
                />
              </div>

              <div className="mb-2">
                <label className="block ">Date:</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded text-black border"
                />
              </div>

              <div className="mb-2">
                <label className="block ">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded text-black border"
                />
              </div>


              <div className="mb-2">
                <label className="block ">maxseats:</label>
                <input
                  type="number"
                  name="maxseats"
                  value={formData.maxseats}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded text-black border"
                />
              </div>

              <div className="mb-2">
                <label className="block ">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-2 py-1 rounded text-black border"
                />
              </div>

              <div className="mb-2">
                <label className="block ">Picture:</label>
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

