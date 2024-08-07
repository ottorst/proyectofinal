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

    const [selectedSection, setSelectedSection] = useState<'Profile' | 'Management' | 'Statistics' | 'Summary' | 'Calendar' | 'Users'>('Profile');


    const handleSectionChange = (section: 'Profile' | 'Management' | 'Statistics' | 'Summary' | 'Calendar' | 'Users') => {
        setSelectedSection(section);
    };


    if (!user) {
        return <LoadingPage />;
    }

    if (loading) {
        return <LoadingPage />;
    }



    const totalRevenue = bookings.reduce((total, book) => total + (book.Quantity * book.Paid), 0)



    return (

        <div className="flex flex-col lg:flex-row mb-10 mt-3">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-gray-800 h-auto shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
                </div>
                <ul>
                    <li className="py-2 px-4 hover:bg-gray-700">
                        <button onClick={() => handleSectionChange('Profile')} className="font-semibold w-full text-left">Profile</button>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-700">
                        <button onClick={() => handleSectionChange('Management')} className="font-semibold w-full text-left">Event Management</button>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-700">
                        <button onClick={() => handleSectionChange('Statistics')} className="font-semibold w-full text-left">Statistics and Reports</button>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-700">
                        <button onClick={() => handleSectionChange('Summary')} className="font-semibold w-full text-left">Summary of Active Events</button>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-700">
                        <button onClick={() => handleSectionChange('Calendar')} className="font-semibold w-full text-left">Event Calendar</button>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-700">
                        <button onClick={() => handleSectionChange('Users')} className="font-semibold w-full text-left">Users</button>
                    </li>
                </ul>
            </div>


            <div className="w-full lg:w-3/4 p-4 lg:p-8">
                {selectedSection === 'Profile' && (
                    <section id="perfil" className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
                        <div className="bg-gray-800 p-4 rounded shadow-md">
                            <p className='text-lg font-semibold mb-4 '>👤Name: {user.name}</p>
                            <p className='text-lg font-semibold mb-4 '>📧Email: {user.email}</p>
                        </div>
                    </section>
                )}

                {selectedSection === 'Summary' && (
                    <section id="resumen" className='mb-8'>
                        <h2 className="text-xl font-semibold mb-4">Summary of active events</h2>
                        {events.map((event) =>
                            <DataRender key={event.id} {...event} />
                        )}
                    </section>
                )}

                {selectedSection === 'Management' && (
                    <section id="gestion" className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Event management</h2>
                        <div className="bg-gray-800 p-4 rounded shadow-md">
                            <EventForm />
                        </div>
                    </section>
                )}

                {selectedSection === 'Statistics' && (
                    <section id="estadisticas" className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Statistics and Reports</h2>
                        <div className="bg-gray-800 p-4 rounded shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-600 p-4 rounded">
                                    <h3 className="text-lg font-bold text-black">Events Held</h3>
                                    <p className="text-2xl">{events.length}</p>
                                </div>
                                <div className="bg-gray-600 p-4 rounded">
                                    <h3 className="text-lg font-bold text-black">Average Attendance</h3>
                                    <p className="text-2xl">85%</p>
                                </div>
                                <div className="bg-gray-600 p-4 rounded">
                                    <h3 className="text-lg font-bold text-black">Total revenue</h3>
                                    <p className="text-2xl">{totalRevenue.toFixed(2)}$</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {selectedSection === 'Calendar' && (
                    <section id="calendario">
                        <h2 className="text-xl font-semibold mb-4">Event Calendar</h2>
                        <div className="bg-white p-4 rounded shadow-md">
                            <CalendarComp events={events} />
                        </div>
                    </section>
                )}

                {selectedSection === 'Users' && (
                    <section id="usuarios" className="mb-8">
                        <UsersDashboardRender users={users} />
                    </section>
                )}
            </div>
        </div>

    )
};

export default DashboardAdmin;
