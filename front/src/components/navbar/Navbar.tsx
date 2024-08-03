'use client';
import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useAuth } from '../AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const menuRef = useRef<HTMLInputElement>(null);
    const { token, setToken, setUser, user } = useAuth();
    const router = useRouter();

    const handleLinkClick = () => {
        if (menuRef.current) {
            menuRef.current.checked = false;
        }
    };

    const handleLogOut = async () => {
        try {
            Cookies.remove("appSession");

            localStorage.removeItem("userToken");
            localStorage.removeItem("userData");

            setToken(null);
            setUser(null);

            window.location.href = 'http://localhost:3001/auth/logout'
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const extractUserIdFromToken = (token: string): string | null => {
        try {
            if (!token) {
                console.error('Token is empty or null');
                return null;
            }

            const decoded: any = jwt.decode(token);
            console.log('Decoded token:', decoded);

            if (decoded && decoded.sub) {
                const auth0Id = decoded.sub;
                const userId = auth0Id.split('|')[1];
                return userId || null;
            }
            return null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const handleDashboardRedirect = () => {
        if (user) {
            if (user.admin) {
                router.push(`/account/admin/${user.id}/dashboard`);
            } else {
                router.push(`/account/user/${user.id}/dashboard`);
            }
        } else if (token) {
            const userId = extractUserIdFromToken(token);
            if (userId) {
                router.push(`/account/user/${userId}/dashboard`);
            } else {
                console.error('User ID could not be extracted from token');
            }
        } else {
            console.error('User or token is not available for redirection');
        }
    };

    useEffect(() => {
        console.log('Current token:', token);
        console.log('Current user:', user);
    }, [token, user]);

    return (
        <header>
            <nav className="wrapper h-40 flex items-center justify-between">
                <Link href="/home" className="w-1/3 max-w-[100px] transition-transform duration-300 ease-in-out transform hover:scale-110">
                    <Image src="/assets/sombrerologo.svg" alt="Logo" width={100} height={100} className="w-full ml-4" />
                </Link>

                <input type="checkbox" id="menu" className="peer hidden" ref={menuRef} />
                <label htmlFor="menu" className="bg-open-menu w-14 h-12 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu z-50 md:hidden"></label>

                <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-white/70 translate-x-full peer-checked:translate-x-0 transition-transform md:static md:bg-none md:translate-x-0 font-lora">
                    <ul className="absolute inset-x-0 top-24 p-12 w-[90%] mx-auto rounded-md h-max text-center grid gap-6 md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static text-xl mr-6">
                        <Link href="/home" onClick={handleLinkClick}>
                            <li className="hover:underline decoration-4 underline-offset-8 neon-shadow">Home</li>
                        </Link>
                        <Link href="/about" onClick={handleLinkClick}>
                            <li className="hover:underline decoration-4 underline-offset-8 neon-shadow">About</li>
                        </Link>
                        <Link href="/experience" onClick={handleLinkClick}>
                            <li className="hover:underline decoration-4 underline-offset-8 neon-shadow">Experiences</li>
                        </Link>
                        <Link href="/contact" onClick={handleLinkClick}>
                            <li className="hover:underline decoration-4 underline-offset-8 neon-shadow">Contact</li>
                        </Link>

                        {token || user ? (
                            <>
                                <li onClick={handleLogOut} className="hover:underline offset-8 decoration-yellow-500 cursor-pointer">
                                    <Image src="/assets/signin-icon.svg" alt="Sign Out" width={45} height={50} className="red-filter shadow-xl" />
                                </li>
                                <li className="hover:underline decoration-4 underline-offset-8" onClick={handleDashboardRedirect}>
                                    <FaUser size={45} className="transition-transform duration-300 ease-in-out transform hover:scale-125 hover:text-yellow-500 cursor-pointer" />
                                </li>
                            </>
                        ) : (
                            <Link href="/login" onClick={handleLinkClick}>
                                <li className="hover:underline decoration-4 underline-offset-8">
                                    <Image src="/assets/signout-icon.svg" alt="Sign In" width={45} height={50} className="green-filter shadow-xl" />
                                </li>
                            </Link>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
