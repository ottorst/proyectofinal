import { IEvent } from "@/src/types/IEvent";
import { IBooking } from "@/src/types/IBooking";

interface EventDashboardProps {
  events: IEvent[];
  bookings: (IBooking & { eventTitle: string })[]; // Update to include eventTitle
}

const EventDashboard: React.FC<EventDashboardProps> = ({ events, bookings }) => {
  const now = new Date();

  const activeEvents = bookings.filter(event => new Date(event.Date) > now);
  const eventHistory = bookings.filter(event => new Date(event.Date) <= now);

  return (
    <section className="flex flex-col justify-center items-center bg-gray-500-50 rounded-md w-[90%] mx-auto space-y-6 p-5 my-20">
      <div className="bg-white bg-opacity-30 w-full flex flex-col text-center h-auto rounded-md mx-auto space-y-6 p-6">
        <h1 className="text-gray-100 text-3xl font-bold underline">🎟️ Active Events</h1>
        <ul className="flex flex-wrap gap-4">
          {activeEvents.length > 0 ? (
            activeEvents.map(booking => (
              <li key={booking.TransactionNumber} className="flex-none bg-gray-200 p-4 rounded-md shadow-md w-1/4">
                <h3 className="text-gray-800 text-md font-semibold">{booking.eventTitle}</h3>
                <p className="text-gray-600 text-sm">Transaction: {booking.TransactionNumber}</p>
                <p className="text-gray-600 text-sm">Quantity: {booking.Quantity}</p>
                <p className="text-gray-600 text-sm">Paid: ${booking.Paid}</p>
                <p className="text-gray-600 text-sm">
                  Date: {new Date(booking.Date).toLocaleString('en-US', { 
                    dateStyle: 'short',
                   timeStyle: 'short' 
                  })}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No active events</p>
          )}
        </ul>
      </div>

      <div className="bg-white bg-opacity-30 w-full flex flex-col text-center h-auto rounded-md mx-auto space-y-6 p-6">
        <h1 className="text-gray-100 text-3xl font-bold underline">📖 Event History</h1>
        <ul className="flex flex-wrap gap-4">
          {eventHistory.length > 0 ? (
            eventHistory.map(booking => (
              <li key={booking.TransactionNumber} className="flex-none bg-gray-200 p-4 rounded-md shadow-md w-1/4">
                <h3 className="text-gray-800 text-md font-semibold">Event: {booking.eventTitle}</h3>
                <p className="text-gray-600 text-sm">Transaction: {booking.TransactionNumber}</p>
                <p className="text-gray-600 text-sm">Quantity: {booking.Quantity}</p>
                <p className="text-gray-600 text-sm">Paid: ${booking.Paid}</p>
                <p className="text-gray-600 text-sm">
                  Date: {new Date(booking.Date).toLocaleString('en-US', { 
                    dateStyle: 'short', 
                    timeStyle: 'short' 
                  })}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No booking history</p>
          )}
        </ul>
      </div>
      
    </section>
  );
};

export default EventDashboard;
