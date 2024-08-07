//Vendors
import Fullcalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useState } from "react"
import Image from "next/image"
//types
import { IEvent } from "@/src/types/IEvent"

interface CalendarCompProps {
  events: IEvent[]
}



const CalendarComp: React.FC<CalendarCompProps> = ({ events }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const handleEventClick = (info: any) => {
    console.log('Event clicked:', info.event.id);
    const event = events.find(e => e.id === Number(info.event.id));
    if (event) {
      setSelectedEvent(event)
      setModalIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };




  return (
    <div className="text-black">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        events={events.map(event => ({
          id: event.id.toString(),
          title: event.title,
          start: event.date, // Usa `date` como `start`
          end: undefined, // Opcional: ajustar según cómo gestiones las fechas finales
        }))}
        eventClick={handleEventClick}
      />

      {modalIsOpen && selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg max-w-md w-full overflow-auto md:max-w-md lg:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white">{selectedEvent.title}</h2>
            {selectedEvent.subtitle && <h3 className="text-lg text-gray-300">{selectedEvent.subtitle}</h3>}
            <p className="mt-2 text-white">Date: {new Date(selectedEvent.date).toLocaleString()}</p>
            <p className="mt-2 text-white">Location: {selectedEvent.location || 'N/A'}</p>
            <p className="mt-2 text-white">Price: ${selectedEvent.price.toFixed(2)}</p>
            <p className="mt-2 text-white">Max Seats: {selectedEvent.maxseats}</p>
            <Image src={selectedEvent.picture} alt="Event picture" width={200} height={200} />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default CalendarComp