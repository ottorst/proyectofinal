



const DashboardAdmin = () => {



  return (
<div>
    <header className="flex"></header>
    <section className="flex flex-row justify-center items-center bg-gray-500-50 rounded-md w-[90%] mx-auto my-11">
        <div className="rounde-lg bg-white-500-50 w-80 flex flex-col text-center h-screen rounded-md mx-auto space-y-6">
            <h1 className="text-green-100 text-3xl font-bold md:text-4xl underline">🎟️Active Events</h1>
            <p className="text-black text-xl">Control active events</p>
        </div>

        <div className="rounde-lg bg-white-500-50 w-80 flex flex-col text-center h-screen rounded-md mx-auto my-7 space-y-6">
            <h1 className="text-green-100 text-3xl font-bold md:text-4xl underline">📖Event History</h1>
            <p className="text-black text-xl">View All the booking events</p>
        </div>

        <div className="rounde-lg bg-white-500-50 w-80 flex flex-col text-center h-screen rounded-md mx-auto space-y-6">
            <h1 className="text-green-100 text-3xl font-bold md:text-4xl underline">👤Manage Users</h1>
            <p className="text-black text-xl">Control Users</p>

        </div>
    </section>
</div>
  )
}

export default DashboardAdmin