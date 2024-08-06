'use client';

//Components
import { EventForm } from '../../eventForm/EventForm';
import LoadingPage from '../../LoadingPage/loading';
import DataRender from './EventDashboardRender';
import UsersDashboardRender from './UsersDashboardRender';
import CalendarComp from '../../calendarComp/CalendarComp';
//Vendots
import { useState } from 'react';
//Contexts
import { useAuth } from '../../AuthContext';
import { useCrud } from '../../CrudContext';


interface DashboardAdminProps {
    userId: number;
}

const DashboardAdmin: React.FC<DashboardAdminProps> = ({ userId }) => {
    const { user } = useAuth();
    const { events, loading, users, bookings } = useCrud();
    const [errors, setErrors] = useState<Error | null>(null);


    if (!user) {
        return <LoadingPage />;
    }

    if (loading) {
        return <LoadingPage />;
    }



    const totalRevenue = bookings.reduce((total, book) => total + (book.Quantity * book.Paid), 0)



    return (

        <div className="bg-gray-100 flex flex-col lg:flex-row mb-10 mt-3">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white h-auto lg:h-screen shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome {user.name}</h1>
                </div>
                <ul>
                    <li className="py-2 px-4 hover:bg-gray-200">
                        <a href="#perfil" className="text-gray-700">Profile</a>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200">
                        <a href="#gestion" className="text-gray-700">Event management</a>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200">
                        <a href="#estadisticas" className="text-gray-700">Statistics and Reports</a>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200">
                        <a href="#resumen" className="text-gray-700">Summary of active events</a>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200">
                        <a href="#calendario" className="text-gray-700">Event Calendar</a>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200">
                        <a href="#usuarios" className="text-gray-700">Users</a>
                    </li>
                </ul>
            </div>


            <div className="w-full lg:w-3/4 p-4 lg:p-8">

                <section id="perfil" className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Profile Info</h2>
                    <div className="bg-white p-4 rounded shadow-md">
                        <p className='text-lg font-semibold mb-4 text-gray-900'>👤Name: {user.name}</p>
                        <p className='text-lg font-semibold mb-4 text-gray-900'>📧Email: {user.email}</p>

                    </div>
                </section>


                <section id="resumen" className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Summary of active events</h2>

                    {events.map((event) =>
                        <DataRender key={event.id} {...event}
                        />
                    )}

                </section>


                <section id="gestion" className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Event management</h2>
                    <div className="bg-white p-4 rounded shadow-md">
                        <EventForm />
                    </div>
                </section>


                <section id="estadisticas" className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Statistics and Reports</h2>
                    <div className="bg-white p-4 rounded shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-100 p-4 rounded">
                                <h3 className="text-lg font-bold text-gray-800">Events Held</h3>
                                <p className="text-2xl text-gray-900">{events.length}</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                <h3 className="text-lg font-bold text-gray-800">Average Attendance</h3>
                                <p className="text-2xl text-gray-900">85%</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                <h3 className="text-lg font-bold text-gray-800">Total revenue</h3>
                                <p className="text-2xl text-gray-900">{totalRevenue.toFixed(2)}$</p>

                            </div>
                        </div>
                    </div>
                </section>


                <section id="calendario">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Event Calendar</h2>
                    <div className="bg-white p-4 rounded shadow-md">

                        <CalendarComp events={events} />
                    </div>
                </section>

                <section id="usuarios" className="mb-8">
                    <UsersDashboardRender users={users} />
                </section>
            </div>
        </div>

    )
};

export default DashboardAdmin;
