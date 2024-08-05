export interface IBooking{
    id: number,
    TransactionNumber:number,
    Quantity:number,
    Paid:number,
    Date:string,
    userId?:number,
    eventsId?:number,    
};