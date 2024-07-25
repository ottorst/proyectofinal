'use client'
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../types/IUser';
import { fetchUserById } from './helpers/Helpers'; 

interface DecodedToken {
    id: string;
    email: string;
}

interface AuthContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
    decodedToken: DecodedToken | null;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
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
        }
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('userToken', token);
            try {
                const decoded = jwtDecode<DecodedToken>(token);
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
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');
            setDecodedToken(null);
            setUser(null);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, decodedToken, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};
