"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";

import { IRegisterProps } from "@/src/types/IRegisterProps";
import { IRegisterErrorProps } from "@/src/types/IRegisterErrorProps";
import { validateFormRegister } from "@/src/helpers/formValidation";
import { register } from "../../helpers/authRegister";

const Register: React.FC = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<IRegisterProps>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    birthday: "",
    allergies: "",
  });

  const [errorUser, setErrorUser] = useState<IRegisterErrorProps>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    birthday: "",
    allergies: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataToSend = {
      ...dataUser,
      birthday: dataUser.birthday
        ? new Date(dataUser.birthday).toISOString()
        : "",
    };

    const errors = validateFormRegister(dataUser);
    setErrorUser(errors);

    if (Object.values(errors).every((error) => error === "")) {
      try {
        await register(dataToSend);
        alert("Registro exitoso!");
        router.push("/login");
      } catch (error: any) {
        alert(`Error during registration: ${error.message}`);
        console.error("Error during registration:", error);
      }
    } else {
      console.log("Errors in the form", errors);
    }
  };


  useEffect(() => {
    const errors = validateFormRegister(dataUser);
    setErrorUser(errors);
  }, [dataUser]);

  return (
    <div className="rounded-lg max-w-fit p-6 bg-slate-800 mt-2 mb-12">
      <form onSubmit={handleSubmit} className=" max-w-md mx-auto ">
        <div className="relative z-0 w-full mb-5 group">
          <label
            aria-label="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="email"
            type="email"
            name="email"
            value={dataUser.email}
            onChange={handleChange}
          />
          {errorUser.email && (
            <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
              {errorUser.email}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            aria-label="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="password"
            type="password"
            name="password"
            value={dataUser.password}
            onChange={handleChange}
          />
          {errorUser.password && (
            <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
              {errorUser.password}
            </p>
          )}
          <p className="text-xs">Una minuscula</p>
          <p className="text-xs">Una mayuscula</p>
          <p className="text-xs">Un numero</p>
          <p className="text-xs">Un caracter especial</p>
          <p className="text-xs">Longitud entre 8 y 15 caracteres</p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            aria-label="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={dataUser.confirmPassword}
            onChange={handleChange}
          />
          {errorUser.confirmPassword && (
            <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
              {errorUser.confirmPassword}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              aria-label="first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="name"
              type="text"
              name="name"
              value={dataUser.name}
              onChange={handleChange}
            />
            {errorUser.name && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.name}
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              aria-label="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-95 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Phone number (011-4567-7890)
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="phone"
              type="tel"
              name="phone"
              value={dataUser.phone}
              onChange={handleChange}
            />
            {errorUser.phone && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.phone}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              aria-label="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Address (Calle Siempre Viva N° 123)
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="address"
              type="text"
              name="address"
              value={dataUser.address}
              onChange={handleChange}
            />
            {errorUser.address && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.address}
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              aria-label="country"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Country
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="country"
              type="text"
              name="country"
              value={dataUser.country}
              onChange={handleChange}
            />
            {errorUser.country && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.country}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              aria-label="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="city"
              type="text"
              name="city"
              value={dataUser.city}
              onChange={handleChange}
            />
            {errorUser.city && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.city}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              aria-label="birthday"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Birthday
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="birthday"
              type="date"
              name="birthday"
              value={dataUser.birthday}
              onChange={handleDateChange}
            />
            {errorUser.birthday && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {String(errorUser.birthday)}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              aria-label="allergies"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Allergies
            </label>
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="allergies"
              type="text"
              name="allergies"
              value={dataUser.allergies}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
