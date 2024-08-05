import { IEvent } from "@/src/types/IEvent";

interface EventDashboardProps {
  events: IEvent[];
}

const EventDashboard: React.FC<EventDashboardProps> = ({ events }) => {
  const now = new Date();

  const activeEvents = events.filter(event => new Date(event.date) > now);
  const eventHistory = events.filter(event => new Date(event.date) <= now);

  return (
    <section className="flex flex-col justify-center items-center bg-gray-500-50 rounded-md w-[90%] mx-auto space-y-6 p-5 my-20">
      <div className="bg-white bg-opacity-30 w-full flex flex-col text-center h-auto rounded-md mx-auto space-y-6 p-6">
        <h1 className="text-gray-100 text-3xl font-bold underline">🎟️ Active Events</h1>
        <ul className="flex flex-wrap gap-4">
          {activeEvents.length > 0 ? (
            activeEvents.map(event => (
              <li key={event.id} className="flex-none bg-gray-200 p-4 rounded-md shadow-md w-1/4">
                <h3 className="text-gray-800 text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
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
            eventHistory.map(event => (
              <li key={event.id} className="flex-none bg-gray-200 p-4 rounded-md shadow-md w-1/4">
                <h3 className="text-gray-800 text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No event history</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default EventDashboard;
