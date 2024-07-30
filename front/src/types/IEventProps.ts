import {ILocation} from "./ILocation"



export interface IEventProps{
    title: string;
    subtitle: string;
    description: string;
    date: number;
    location: ILocation;
    maxseats: number;
    price: number;
    picture: string;

}