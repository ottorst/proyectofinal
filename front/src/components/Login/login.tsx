"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { ValidateLogin } from "./validateLogin";
import { LoginFormErrors, LoginForm } from "./interfaces";
import { useRouter } from "next/navigation";
import { loginUser } from "./helpers";
import Link from "next/link";
import { useAuth } from "../AuthContext";
import { jwtDecode } from "jwt-decode";
import { fetchUserById } from "../helpers/Helpers";

const LoginFormClient: React.FC = () => {
  const router = useRouter();
  const { setToken, setUser } = useAuth();

  const [dataUser, setDataUser] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setFormError("");
      if (!errorMessage.email && !errorMessage.password) {
        const response = await loginUser(dataUser.email, dataUser.password);

        if (response.token) {
          setToken(response.token);
          localStorage.setItem("userToken", response.token);

          Swal.fire({
            title: "Login Successful",
            text: "You have successfully logged in!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            const decodedToken = jwtDecode<{ id: string }>(response.token);
            fetchUserById(decodedToken.id, response.token).then((user) => {
              setUser(user);
              console.log("User ID:", user.id);
              console.log("Is Admin:", user.admin);
              if (user.admin) {
                router.push(`/account/admin/${user.id}/dashboard`);
              } else {
                router.push(`/account/user/${user.id}/dashboard`);
              }
            });
          });
        } else {
          setFormError("Failed to retrieve token. Please try again.");
        }
      }
    } catch (error) {
      if (!errorMessage.email && !errorMessage.password) {
        if (error instanceof Error) {
          setFormError(error.message);
        }
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = ValidateLogin(dataUser);
    setErrorMessage(errors);
    if (!errors.email && !errors.password) {
      handleLogin();
    }
  };

  return (
    <div className="text-black flex items-center justify-center p-10 ml-6">
      <div className="rounded-lg max-w-md p-16 bg-slate-800 mt-2 mb-12 w-full">
        <h2 className="text-3xl font-bold mb-2 text-center text-white">
          Log In
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <p className="text-white">Not a member?</p>
          <Link
            href={"/register"}
            className="text-blue-500 underline-offset-4 underline"
          >
            Register
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-4 text-white">
            <label className="block text-gray-700 text-sm font-bold mb-2 peer-focus:font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input:valid:border-blue-600 input-autofill"
              onChange={handleChange}
              value={dataUser.email}
            />
            {errorMessage.email && (
              <p className="text-red-500 text-xs mt-2">{errorMessage.email}</p>
            )}
          </div>
          <div className="mb-6 text-white">
            <label className="block text-gray-700 text-sm font-bold mb-2 peer-focus:font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-b-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input:valid:border-blue-600 input-autofill"
              onChange={handleChange}
              value={dataUser.password}
            />
            {errorMessage.password && (
              <p className="text-red-500 text-xs mt-2">
                {errorMessage.password}
              </p>
            )}
          </div>
          {formError && !errorMessage.email && !errorMessage.password && (
            <p className="text-red-500 text-xs mt-2">{formError}</p>
          )}
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
              mb-4
              "
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => window.location.href = 'http://localhost:3001/auth/auth0/callback'}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Conectarse con Google
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormClient;
