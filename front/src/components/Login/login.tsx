'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ValidateLogin } from './validateLogin'; 
import { LoginFormErrors, LoginForm } from './interfaces'; 
import { useRouter } from 'next/navigation';
import { loginUser } from './helpers';
import Link from 'next/link';
import { useAuth } from '../AuthContext';

const LoginFormClient: React.FC = () => {
    const router = useRouter();
    const { setToken } = useAuth();

    const [dataUser, setDataUser] = useState<LoginForm>({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState<LoginFormErrors>({
        email: "",
        password: ""
    });

    const [formError, setFormError] = useState<string>(""); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value
        });
    };

    const handleLogin = async () => {
        try {
            setFormError("");
            const userData = await loginUser(dataUser.email, dataUser.password);
            
            setToken(userData.token)

            Swal.fire({
                title: 'Login Successful',
                text: 'You have successfully logged in!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                router.push('/home');
            });
        } catch (error) {
            if (error instanceof Error) {
                setFormError(error.message); 
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleLogin();
    };

    useEffect(() => {
        const errors = ValidateLogin(dataUser);
        setErrorMessage(errors);
    }, [dataUser]);

    return (
        <div className="text-black flex items-center justify-center p-10 ml-6">
            <title>Login</title>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-2 text-center text-black">Log In</h2>
                <div className="flex items-center justify-center space-x-2">
                            <p>Not a member?</p>
                            <Link href={"/User"} className="text-blue-500 underline-offset-4 underline">
                                Register
                            </Link>
                        </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            value={dataUser.email}
                        />
                        {errorMessage.email && <p className="text-red-500 text-xs mt-2">{errorMessage.email}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            value={dataUser.password}
                        />
                        {errorMessage.password && <p className="text-red-500 text-xs mt-2">{errorMessage.password}</p>}
                    </div>
                    {formError && <p className="text-red-500 text-xs mt-2">{formError}</p>}
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginFormClient;
