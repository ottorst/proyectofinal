"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";

import { IRegisterProps } from "@/src/types/IRegisterProps";
import { IRegisterErrorProps } from "@/src/types/IRegisterErrorProps";
import { validateFormRegister } from "@/src/helpers/formValidation";
import { register } from "../../helpers/authRegister";
import Link from "next/link";
import Swal from "sweetalert2";

const Register: React.FC = () => {
  const router = useRouter();

  const [dataUser, setDataUser] = useState<IRegisterProps>({
    email: "",
    password: "",
    passwordConfirm: "",
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
    passwordConfirm: "",
    name: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    birthday: "",
    allergies: "",
  });

  const [passwordConditions, setPasswordConditions] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasValidLength: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });

    if (name === "password") {
      setPasswordConditions({
        hasLowercase: /[a-z]/.test(value),
        hasUppercase: /[A-Z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[@$!%*?&.]/.test(value),
        hasValidLength: value.length >= 8 && value.length <= 15,
      });
    }
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

    console.log("Data to send:", dataToSend);

    const errors = validateFormRegister(dataUser);
    setErrorUser(errors);

    if (Object.values(errors).every((error) => error === "")) {
      try {
        await register(dataToSend);
        Swal.fire({
          title: "Register Successful",
          text: "You have successfully register!",
          icon: "success",
          confirmButtonText: "OK",
        });
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
      <Link href={"/login"}>
        <div className="flex ">
          <button
            id="cerrarButton"
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
      </Link>

      <h2 className="text-3xl text-center justify-center sm:mt-10 sm:mb-4">
        Create new account
      </h2>

      <div className="flex justify-center items-center mb-10 space-x-2">
        <p>Already a member?</p>
        <Link
          href={"/login"}
          className="text-blue-500 underline-offset-4 underline"
        >
          Log In
        </Link>
      </div>
      <form onSubmit={handleSubmit} className=" max-w-md mx-auto ">
        <div className="relative z-0 w-full mb-5 group bg-transparent">
          <input
            className="block py-2.5  px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-b-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500  focus:outline-none focus:ring-0 focus:border-blue-600 peer input:valid:border-blue-600 input-autofill"
            id="email"
            type="email"
            name="email"
            value={dataUser.email}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {errorUser.email && (
            <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
              {errorUser.email}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            className="block py-3 mt-10 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="password"
            type="password"
            name="password"
            value={dataUser.password}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {errorUser.password && (
            <p className="text-red-500 text-xs absolute bottom-[-2.2rem] left-0">
              {errorUser.password}
            </p>
          )}
          <p
            className={`text-xs mt-2 ${
              passwordConditions.hasLowercase
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            Una minuscula
          </p>
          <p
            className={`text-xs ${
              passwordConditions.hasUppercase
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            Una mayuscula
          </p>
          <p
            className={`text-xs ${
              passwordConditions.hasNumber ? "text-green-500" : "text-red-500"
            }`}
          >
            Un numero
          </p>
          <p
            className={`text-xs ${
              passwordConditions.hasSpecialChar
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            Un caracter especial
          </p>
          <p
            className={`text-xs mb-6 ${
              passwordConditions.hasValidLength
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            Longitud entre 8 y 15 caracteres
          </p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            className="block py-3 mt-12 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            value={dataUser.passwordConfirm}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="passwordConfirm"
            className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {errorUser.passwordConfirm && (
            <p className="text-red-500 text-xs absolute bottom-[0rem] left-0">
              {errorUser.passwordConfirm}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-12 group">
            <input
              className="block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-autofill"
              id="name"
              type="text"
              name="name"
              value={dataUser.name}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {errorUser.name && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.name}
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              className="block py-3 mt-4 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-autofill"
              id="phone"
              type="tel"
              name="phone"
              value={dataUser.phone}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-95 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Phone number (011-4567-7890)
            </label>
            {errorUser.phone && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.phone}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              className="block py-3 mt-4 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-autofill"
              id="address"
              type="text"
              name="address"
              value={dataUser.address}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Address (Calle Siempre Viva N° 123)
            </label>
            {errorUser.address && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.address}
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              className="block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-autofill"
              id="country"
              type="text"
              name="country"
              value={dataUser.country}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="country"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Country
            </label>
            {errorUser.country && (
              <p className="text-red-500 text-xs absolute bottom-[0rem] left-0">
                {errorUser.country}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-12 group">
            <input
              className="block py-3  px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-autofill"
              id="city"
              type="text"
              name="city"
              value={dataUser.city}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
            {errorUser.city && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {errorUser.city}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              className="block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="birthday"
              type="date"
              name="birthday"
              value={dataUser.birthday}
              onChange={handleDateChange}
              placeholder=" "
            />
            <label
              htmlFor="birthday"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Birthday
            </label>
            {errorUser.birthday && (
              <p className="text-red-500 text-xs absolute bottom-[-1.5rem] left-0">
                {String(errorUser.birthday)}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              className="block py-3  px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-autofill"
              id="allergies"
              type="text"
              name="allergies"
              value={dataUser.allergies}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="allergies"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Allergies
            </label>
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
