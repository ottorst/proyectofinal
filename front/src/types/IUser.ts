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


export interface IUpdateUser {
    id: number;
    email: string;
    name: string;
    password?: string;
    passwordConfirm?: string;
    phone?: string;
    birthday?: Date;
    allergies?: string;
    address?: string;
    city?: string;
    country?: string;
    auth0Id?: string;
    admin?: boolean;
}