import { IEventProps } from "../types/IEventProps";
import { IEventErrorProps } from "../types/IEventErrorProps";

export function validateFormEvent(dataEvent:IEventProps){
    let errors: IEventErrorProps = {
    }
    
    if(!dataEvent.title){
        errors.title = "El  title es requerido.";

    } else if (!dataEvent.subtitle){
        errors.subtitle = "El  subtitle es requerido.";


    } else if (!dataEvent.description){
        errors.description = "El  description es requerido.";


    } else if (!dataEvent.date){
        errors.date = "El  title es requerido.";


    } else if (!dataEvent.location){
        errors.location = "El  location es requerido.";

         
    } else if (dataEvent.maxseats === undefined || dataEvent.maxseats <= 0) {
        errors.maxseats = "El número máximo de asientos es requerido y debe ser mayor a 0.";

     } else if (dataEvent.price === undefined || dataEvent.price <= 0) {
        errors.price = "El precio es requerido y debe ser mayor a 0.";
        

    } else if (!dataEvent.picture){
        errors.picture = "La imagen es requerido.";
    }
        return errors;
}
