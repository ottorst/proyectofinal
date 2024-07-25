import { IRegisterProps } from "../types/IRegisterProps";
import { IRegisterErrorProps } from "../types/IRegisterErrorProps";
import {isBirthdayValid} from "../helpers/validationBirthday";

export function validateFormRegister (dataUser: IRegisterProps) {
    let errors: IRegisterErrorProps = {
    }
    
    if(!dataUser.email){
        errors.email = "El email es requerido.";
    } else if (!/^.+@.+\..+$/.test(dataUser.email)){
        errors.email = "El email no es valido"

    } else if (!dataUser.password){
        errors.password = "La contraseña es requerida.";
    }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,15}$/.test(dataUser.password)){
        errors.password = "La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";

    } else if (!dataUser.name){
        errors.name = "El nombre es requerido.";


    } else if (!dataUser.address){
        errors.address = "La dirección es requerida.";

    } else if (!dataUser.country){
        errors.country = "Country es requerida."; 
         
    } else if (!dataUser.city){
        errors.city = "City es requerida."; 

    } else if (!dataUser.phone){
        errors.phone = "El numero de telefono es requerido.";
    } else if (!isBirthdayValid(dataUser.birthday)) {
        errors.birthday = "La fecha de cumpleaños debe ser anterior a la fecha actual.";

    }  else if (dataUser.passwordConfirm !== dataUser.password){
        errors.passwordConfirm = "Las contraseñas no coinciden.";
    } 
    
        return errors;
}