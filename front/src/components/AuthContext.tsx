'use client';
import { createContext, useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { IUser } from '../types/IUser';
import { fetchUserById } from './helpers/Helpers';
import { useUser as useAuth0User, UserProfile } from '@auth0/nextjs-auth0/client';

interface DecodedToken {
    id: string;
    email: string;
}

interface AuthContextProps {
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
    decodedToken: DecodedToken | null;
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    handleLogout: () => void;  
}

const AuthContext = createContext<AuthContextProps | null>(null);

const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("userToken") || Cookies.get("appSession") || null;
    }
    return null;
};

const mapAuth0UserToIUser = (auth0User: UserProfile): IUser => {
    const auth0Id = auth0User.sub || '';
    const userId = auth0Id.split('|')[1];
    const idNumber = Number(userId);
    const id = isNaN(idNumber) ? 0 : idNumber;

    return {
        id,
        email: auth0User.email || '',
        name: auth0User.name || '',
        password: '',
        phone: typeof auth0User.phone === 'string' ? auth0User.phone : '',
        birthday: typeof auth0User.birthday === 'string' ? auth0User.birthday : '',
        allergies: typeof auth0User.allergies === 'string' ? auth0User.allergies : '',
        address: typeof auth0User.address === 'string' ? auth0User.address : '',
        city: typeof auth0User.city === 'string' ? auth0User.city : '',
        country: typeof auth0User.country === 'string' ? auth0User.country : '',
        picture: auth0User.picture || '',
        auth0Id,
        admin: false,
    };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const { user: auth0User, isLoading } = useAuth0User();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');

        if (urlToken) {
            localStorage.setItem('userToken', urlToken);
            setToken(urlToken);
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            const storedToken = localStorage.getItem('userToken');
            const storedUser = localStorage.getItem('userData');

            if (storedToken) {
                setToken(storedToken);
                try {
                    const decoded = jwtDecode<DecodedToken>(storedToken);
                    setDecodedToken(decoded);
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        fetchUserById(decoded.id, storedToken)
                            .then(userData => {
                                setUser(userData);
                                localStorage.setItem('userData', JSON.stringify(userData));
                            })
                            .catch(error => {
                                console.error('Error fetching user data:', error);
                                setUser(null);
                            });
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    setDecodedToken(null);
                }
            } else {
                const fetchedToken = getToken();
                console.log('Fetched token:', fetchedToken);
                if (fetchedToken) {
                    setToken(fetchedToken);
                    localStorage.setItem('userToken', fetchedToken);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (auth0User && !isLoading) {
            const mappedUser = mapAuth0UserToIUser(auth0User);
            setUser(mappedUser);
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch('http://localhost:3000/auth/me', {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        console.log('Fetched user data:', userData);
                        setUser(userData);
                    } else {
                        console.error('Failed to fetch user profile:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            };

            fetchUserProfile();
        }
    }, [auth0User, isLoading]);

    useEffect(() => {
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                console.log('Decoded token:', decoded);
                setDecodedToken(decoded);
                fetchUserById(decoded.id, token)
                    .then(userData => {
                        setUser(userData);
                        localStorage.setItem('userData', JSON.stringify(userData));
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                        setUser(null);
                    });
            } catch (error) {
                console.error('Error decoding token:', error);
                setDecodedToken(null);
            }
        } else {
            setDecodedToken(null);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("userToken", token);
        } else {
            localStorage.removeItem("userToken");
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        Cookies.remove("appSession", { path: '/' });
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, decodedToken, user, setUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
