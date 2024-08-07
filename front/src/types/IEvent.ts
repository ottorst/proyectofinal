export interface IEvent {
    id: number,
    title: string,
    subtitle?: string,
    description?: string,
    date: string,
    location?: string,
    maxseats: number,
    price: number,
    picture: string,
    totalPersons?: number,
    totalBookings?: number,
    seatsRemain?: number
}