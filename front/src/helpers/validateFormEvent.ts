import { IEventProps } from "../types/IEventProps";
import { IEventErrorProps } from "../types/IEventErrorProps";

export function validateFormEvent(dataEvent:IEventProps, address: string) : IEventErrorProps {
    const { title, subtitle, description, date, price,  maxseats, picture } = dataEvent
    let errors: IEventErrorProps = {
    }
     
       

    if (title.length < 15 || title.length > 30) {
        errors.title = "Event title must be between 15 and 30 characters.";
      

       }  if (subtitle.length < 30 || subtitle.length > 80) {
            errors.subtitle = "Event subtitle must be between 30 and 80 characters.";
          

    } if (description.length < 80 ) {
            errors.description = "Event description must be between 80 characters.";
        

    } if (!date){
        errors.date = "Event date is required.";

    } if (!address){
        errors.location = "Event location is required."

         
    } if (maxseats >= 9 ) {
        errors.maxseats = "The maximum number of seats must be greater than 8.";

     } if (price <= 0) {
        errors.price = "The price is required and must be greater than 0.";
        

    } if (!picture){
        errors.picture = "Image is required.";
    } 
        return errors;
}
