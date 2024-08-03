export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string | null;
    phone?: string;
    birthday?: string;
    allergies?: string;
    address?: string;
    city?: string;
    country?: string;
    picture?: string;
    auth0Id?: string;
    admin?: boolean;
}


