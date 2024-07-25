import { IRegisterProps } from "../types/IRegisterProps";

export async function register(userData: IRegisterProps) {
    try {
        const res = await fetch (`http://localhost:3001/auth/signup`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)

        })
        if (res.ok){
            return res.json()
        } else { 
            const errorData = await res.json();
          /*   alert ("Error al registrarse") */
            throw new Error(errorData.message || "Error al registrarse");
        }

    } catch (error: any) {
        throw new Error(error)
    }
} 

    