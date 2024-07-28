'use client'
import { createContext, useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { jwtDecode } from 'jwt-decode';
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
}

const AuthContext = createContext<AuthContextProps | null>(null);

const mapAuth0UserToIUser = (auth0User: UserProfile): IUser => {
    return {
        id: parseInt(auth0User.sub?.split('|')[1] || '0', 10),
        email: auth0User.email || '',
        name: auth0User.name || '',
        password: '',
        phone: typeof auth0User.phone === 'string' ? auth0User.phone : '',
        birthday: typeof auth0User.birthday === 'string' ? auth0User.birthday : '',
        allergies:  typeof auth0User.allergies === 'string' ? auth0User.allergies : '',
        address:  typeof auth0User.address === 'string' ? auth0User.address : '',
        city:  typeof auth0User.city === 'string' ? auth0User.city : '',
        country:  typeof auth0User.country === 'string' ? auth0User.country : '',
        picture: auth0User.picture || '',
        auth0Id: auth0User.sub || '',
        admin: false ,
        
    };
};


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const { user: auth0User, isLoading } = useAuth0User();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.error('Failed to fetch user profile:', response.statusText);
            }
        };

        if (auth0User && !isLoading) {
            const mappedUser = mapAuth0UserToIUser(auth0User);
            setUser(mappedUser);
            fetchUserProfile();
        }
    }, [auth0User, isLoading]);

    return (
        <AuthContext.Provider value={{token, setToken, decodedToken, user, setUser}}>
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