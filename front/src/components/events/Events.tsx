"use client";
import { IEvent } from "@/src/types/IEvent";
import { useState } from "react";
import Image from "next/image";
import { useCrud } from "../CrudContext";
import LoadingPage from "../LoadingPage/loading";

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const { events, loading } = useCrud();

  const handleImageClick = (event: IEvent) => {
    const seatsRemain = event.maxseats - (event.totalPersons || 0);

    setSelectedEvent({
      ...event,
      seatsRemain
    });
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return <LoadingPage />;
  }

  const formatEventDate = (date: string) => {
    return new Date(date).toLocaleString();
  };
  console.log(events, "imagennnn");




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 my-9">
      <title>Experiences</title>

      {events.length === 0 ? (
        <div
          className="lg:flex flex-col justify-center items-center
          text-2xl text-red-800 cursor-not-allowed
          "
        >
          No hay eventos disponibles
        </div>
      ) : (
        events.map((event) => (

          <div
            key={event.id}
            className="flex flex-col h-full bg-gray-800 rounded-md p-4 text-center space-y-4 
               border-2 border-transparent transform transition-colors duration-500 hover:border-white"
          >
            <div>
              <Image
                src={event.picture}
                alt="Event Image"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h1 className="text-xl font-bold text-white mb-4">
                  {event.title}
                </h1>
                <h2 className="text-lg font-medium text-gray-300 mb-4">
                  {event.subtitle}
                </h2>
                <p>Price: {event.price} $</p>
              </div>
              <div className="mt-auto">
                <button
                  className="bg-yellow-500 rounded-md hover:bg-yellow-700 px-8 py-4 mt-4 w-full"
                  onClick={() => handleImageClick(event)}
                >
                  Event Details
                </button>
                
              </div>
            </div>
          </div>
        ))
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-95 p-6 rounded-lg w-11/12 md:w-1/2 max-h-screen overflow-y-auto relative">
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={handleCloseModal}
                className="text-black text-3xl"
              >
                X
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold text-black">
                {selectedEvent.title}
              </h2>
              <Image
                src={selectedEvent.picture}
                alt="Event Picture"
                width={300}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="text-gray-700 mb-2">{selectedEvent.description}</p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold text-black">Date:</span>{" "}
                {formatEventDate(selectedEvent.date)}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold text-black">Location:</span>{" "}
                <a
                  href={selectedEvent.location}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedEvent.location}
                </a>
              </p>

              <p className="text-gray-700 mb-2">
                <span className="font-bold text-black">MaxSeats:</span>{" "}
                {selectedEvent.maxseats}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold text-black">Price:</span> $
                {selectedEvent.price}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold text-black">SeatsRemain:</span>
                {selectedEvent.seatsRemain}
              </p>
              <button className="bg-yellow-500 rounded-md hover:bg-yellow-700 px-8 py-4 mt-4 w-full">
                BookNow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
