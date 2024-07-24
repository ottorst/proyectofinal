import { LoginForm, LoginFormErrors } from "./interfaces"; 

export function ValidateLogin(dataUser: LoginForm): LoginFormErrors {
    let errors: LoginFormErrors = {};

    if (!dataUser.email) {
        errors.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(dataUser.email)) {
        errors.email = "Email is not valid";
    }
    

    if (!dataUser.password) {
        errors.password = "Password is required";
    } else if (dataUser.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else if (dataUser.password.length > 20) {
        errors.password = "Password cannot exceed 20 characters";
    }

    return errors;
}

