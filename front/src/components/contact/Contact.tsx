"use client"

//Vendors
import Link from "next/link"
import { useState } from "react";



const Contact: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState({
        fullname: "",
        email: "",
        message: ""
    })
    const [dataUser, setDataUser] = useState({
        fullname: "",
        email: "",
        message: ""
    })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setDataUser({
            ...dataUser,
            [name]: value
        })
    };


    return (
        <div className="text-black flex items-center justify-center p-10 ml-6">
            <title>Contact</title>
            <div className="rounded-lg max-w-md p-16 bg-slate-800 mt-2 mb-12 w-full">
                <h2 className="text-3xl font-bold mb-2 text-center text-white">Contact Us</h2>
                <div className="flex items-center justify-center space-x-2">

                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-4 text-white">

                        <label className="block text-gray-700 text-sm font-bold mb-2 peer-focus:font-medium">FullName</label>
                        <input
                            type="text"
                            name="fullname"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input:valid:border-blue-600 input-autofill"
                            onChange={handleChange}
                            value={dataUser.fullname}
                        />
                        {errorMessage.email && <p className="text-red-500 text-xs mt-2">{errorMessage.email}</p>}
                    </div>

                    <div className="mb-4 mt-4 text-white">

                        <label className="block text-gray-700 text-sm font-bold mb-2 peer-focus:font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input:valid:border-blue-600 input-autofill"
                            onChange={handleChange}
                            value={dataUser.email}
                        />
                        {errorMessage.email && <p className="text-red-500 text-xs mt-2">{errorMessage.email}</p>}
                    </div>

                    <div className="mb-6 text-white">
                        <label className="block text-gray-700 text-sm font-bold mb-2 peer-focus:font-medium">Message</label>

                        <textarea
                            name="message"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input:valid:border-blue-600 input-autofill"
                            onChange={handleChange}
                            value={dataUser.message}
                        />

                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
};





export default Contact


