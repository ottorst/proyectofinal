const EventDashboard: React.FC = () => {
  return (
    <section className="flex flex-col justify-center items-center bg-gray-500-50 rounded-md w-[90%] mx-auto space-y-6 p-5 my-20">
      <div className="bg-white bg-opacity-30 w-full flex flex-col text-center h-auto rounded-md mx-auto space-y-6 p-6">
        <h1 className="text-gray-100 text-3xl font-bold underline">🎟️ Active Events</h1>
        <p className="text-black text-xl">Control active events</p>
      </div>

      <div className="bg-white bg-opacity-30 w-full flex flex-col text-center h-auto rounded-md mx-auto space-y-6 p-6">
        <h1 className="text-gray-100 text-3xl font-bold underline">📖 Event History</h1>
        <p className="text-black text-xl">View All the booking events</p>
      </div>
    </section>
  );
};

export default EventDashboard;
