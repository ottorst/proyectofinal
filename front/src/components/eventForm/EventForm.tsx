"use client"

import React, { useEffect, useState } from "react";
import { IEventErrorProps } from "../../types/IEventErrorProps";
import { IEventProps } from "@/src/types/IEventProps";
import { validateFormEvent } from "@/src/helpers/validateFormEvent";
import { createEvent } from "@/src/helpers/createEvent";
import "leaflet/dist/leaflet.css";
import { uploadFile } from "@/src/helpers/uploadFile";
/*  import MapComponent from "../mapComponent/MapComponent";  */



export const EventForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [dataEvent, setDataEvent] = useState<IEventProps>({
    title: "",
    subtitle: "",
    description: "",
    date: "",
    location: "",
    maxseats: 0,
    price: 0,
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





  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataEvent({
      ...dataEvent,
      [event.target.name]: event.target.value,
    });

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);


  
    // Puedes actualizar la validación aquí si es necesario
    // Por ejemplo:
    if (!selectedFile) {
      setErrorDataEvent((prevErrors) => ({
        ...prevErrors,
        picture: "Please select a picture.",
      }));
    } else {
      setErrorDataEvent((prevErrors) => ({
        ...prevErrors,
        picture: "",
      }));
    }

  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const googleMapsUrl = address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`
      : "";

    const newEvent = {
      ...dataEvent,
      location: googleMapsUrl,
      picture: file ? await uploadFile(file) : dataEvent.picture,
    };



    const errors = validateFormEvent(newEvent, address);
    setErrorDataEvent(errors);

    if (Object.values(errors).every((error) => error === "")) {
      try {
        await createEvent(newEvent);
        alert("Successful new event creation!");
        toggleModal();
      } catch (error: any) {
        alert(`Error during creation: ${error.message}`);
        console.error("Error during creation:", error);
      }
    } else {
      console.log("Errors in the form", errors);
    }
  };


  useEffect(() => {
    const errors = validateFormEvent(dataEvent, address);
    setErrorDataEvent(errors);
  }, [dataEvent, address, ]);

  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        onClick={toggleModal}
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="block text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              <form onSubmit={handleSubmit} className="p-4 md:p-5 ">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Event title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={dataEvent.title}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type event title"
                    />
                    {errorDataEvent.title && (
                      <p className="text-red-500 text-xs bottom-[-1.5rem] left-0">
                        {errorDataEvent.title}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="subtitle"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Subtitle
                    </label>
                    {errorDataEvent.subtitle && (
                      <p className="text-red-500 text-xs bottom-[-1.5rem] left-0">
                        {errorDataEvent.subtitle}
                      </p>
                    )}
                    <input
                      type="text"
                      name="subtitle"
                      id="subtitle"
                      value={dataEvent.subtitle}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type subtitle"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="maxseats"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Max. seats
                    </label>
                    {errorDataEvent.maxseats && (
                      <p className="text-red-500 text-xs bottom-[-1.5rem] left-0">
                        {errorDataEvent.maxseats}
                      </p>
                    )}
                    <input
                      type="number"
                      name="maxseats"
                      id="maxseats"
                      value={dataEvent.maxseats}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-black first-line:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="8"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Description
                    </label>
                    {errorDataEvent.description && (
                      <p className="text-red-500 text-xs bottom-[-1.5rem] left-0">
                        {errorDataEvent.description}
                      </p>
                    )}
                    <textarea
                      id="description"
                      name="description"
                      value={dataEvent.description}
                      onChange={handleChange}
                      rows={4}
                      className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write menu description here"
                    ></textarea>
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <div>
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                      >
                        Date
                      </label>
                      {errorDataEvent.date && (
                        <p className="text-red-500 text-xs bottom-[-1.5rem] left-0">
                          {errorDataEvent.date}
                        </p>
                      )}
                      <input
                        type="datetime-local"
                        name="date"
                        id="date"
                        value={dataEvent.date}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="-34.5816"
                        required
                        pattern="\d{4}-\d{2}-\d{2}"
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
                    {errorDataEvent.price && (
                      <p className="text-red-500 text-xs bottom-[-1.5rem] left-0">
                        {errorDataEvent.price}
                      </p>
                    )}
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={dataEvent.price}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <div>
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                      >
                        Location
                      </label>
                      {errorDataEvent.location && (
                        <p className="text-red-500 text-xs bottom-[-1.5rem] left-0">
                          {errorDataEvent.location}
                        </p>
                      )}
                      <input
                        type="text"
                        name="location"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Street No., district"
                      />
                    </div>
                  </div>
                </div>

                <label
                  className="block mb-2 text-sm font-medium  text-white dark:text-white"
                  htmlFor="picture"
                >
                  Select picture
                </label>
                {errorDataEvent.picture && (
                  <p className="text-red-500 text-xs bottom-[-1.5rem] left-0">
                    {errorDataEvent.picture}
                  </p>
                )}
                <input
                  className="block w-full text-sm text-gray-900 border  border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="picture"
                  type="file"

                name="picture"
              
                 onChange={handleFileChange} 

                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>

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
