import React, { useState } from "react";
import {IEventErrorProps} from "../../types/IEventErrorProps";
import { IEventProps } from "@/src/types/IEventProps";
import { validateFormEvent } from "@/src/helpers/validateFormEvent";
import { createEvent } from "@/src/helpers/createEvent";


export const EventForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
 
  const [dataEvent, setDataEvent] = useState<IEventProps>({
    title: "",
    subtitle: "",
    description: "",
    date: Date.now(),
    location: { lat: 0, lng: 0 }, 
    maxseats: 0,
    price:  0,
    picture: "",

  });

  const [errorDataEvent, setErrorDataEvent] = useState<IEventErrorProps>({
    title: "",
    subtitle: "",
    description: "",
    date: "",
    location: "",
    maxseats: "",
    price: "",
    picture: "",

  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataEvent({
      ...dataEvent,
      [event.target.name]: event.target.value,
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const dataToSend = {
        ...dataEvent,
       
      };
  
      const [year, month, day] = date.split('-').map(Number);
      const [hour, minute] = time.split(':').map(Number);
      const eventDate = new Date(year, month - 1, day, hour, minute).getTime();
  
      const errors = validateFormEvent(dataEvent);
      setErrorDataEvent(errors);
  
      if (Object.values(errors).every((error) => error === "")) {
        try {
          await createEvent(dataToSend);
          alert("Creación de nuevo evento exitoso!");
        } catch (error: any) {
          alert(`Error during creation: ${error.message}`);
          console.error("Error during creation:", error);
        }
      } else {
        console.log("Errors in the form", errors);
      }
    };

  }
  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
      onClick={toggleModal}
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="block text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create Event
      </button>

      {/* <!-- Main modal --> */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden={!isModalOpen}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-500 bg-opacity-75"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative !w-500 items-center justify-center bg-slate-800  rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-white dark:text-white">
                  Create New Event
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5 ">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                     Event title
                    </label>
                    {errorDataEvent.title && (
            <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
              {errorDataEvent.title}
            </p>
          )}
                    <input
                      type="text"
                      name="title"
                      id="title"
                    
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type event title"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="subtitle"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                     Subtitle
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      id="subtitle"
                     
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type subtitle"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="maxseats"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      
                    Max. seats
                    </label>
                    <input
                      type="number"
                      name="maxseats"
                      id="maxseats"
                    
                      className="bg-gray-50 border border-gray-300 text-black first-line:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="8"
                      required
                    />
                  </div>
                 
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                   
                      rows={4}
                      className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write menu description here"
                    ></textarea>
                  </div>

                 < div className="col-span-2 sm:col-span-2">
                <div >
                    <label
                      htmlFor="date"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      
                    Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      
                      onChange={(e) => setDate(e.target.value)} 
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="-34.5816"
                      required
                    />
                  </div>
                  <div >
                    <label
                      htmlFor="Time"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      
                    Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                
                      onChange={(e) => setTime(e.target.value)} 
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="-58.4207"
                      required
                    />
                  </div>
                </div>


                
                <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      
                    Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                     
                      className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$"
                      required
                    />
                  </div>
                <div className="col-span-2 sm:col-span-2">
                <div >
                    <label
                      htmlFor="lat"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      
                    Latitude
                    </label>
                    <input
                      type="number"
                      name="lat"
                      id="lat"
                    
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="-34.5816"
                      required
                    />
                  </div>
                  <div >
                    <label
                      htmlFor="lng"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      
                    Longitude
                    </label>
                    <input
                      type="number"
                      name="lng"
                      id="lng"
                      value={dataEvent.location.lng}
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="-58.4207"
                      required
                    />
                  </div>
                </div>
                </div>
                
<label className="block mb-2 text-sm font-medium  text-white dark:text-white" htmlFor="file_input">Select picture</label>
<input className="block w-full text-sm text-gray-900 border  border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

                <button
                  type="submit"
                  className=" mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new event
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};