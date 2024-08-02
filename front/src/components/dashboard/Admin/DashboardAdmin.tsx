'use client';
//Vendors
import { useRouter } from 'next/navigation';
import { EventForm } from '../../eventForm/EventForm';
import { useEffect, useState } from 'react';
//Contexts
import { useAuth } from '../../AuthContext';
import { useCrud } from '../../CrudContext';

//Components
import LoadingPage from '../../LoadingPage/loading';
import DataRender from './EventDashboardRender';
import UsersDashboardRender from './UsersDashboardRender';

interface DashboardAdminProps {
    userId: number;
}

const DashboardAdmin: React.FC<DashboardAdminProps> = ({ userId }) => {
    const router = useRouter();
    const { user} = useAuth();
    const {events, loading, users, bookings} = useCrud();
    const [errors,setErrors] = useState<Error | null>(null);
    

    if (!user) {
        return <LoadingPage/>
    }
    
    if (loading) {
        return <LoadingPage/>
    }


    

    return (
       
        <div>
            <title>Dashboard Admin</title>
            <div className="flex flex-col items-center bg-yellow-500 w-[90%] mx-auto rounded-lg p-10">
                <h1 className="text-gray-100 text-3xl font-bold mb-7 underline">{`Welcome ${user.name}`}</h1>
                <section className="flex flex-col space-y-2 text-left">
                    <p className="font-bold">{`👤Name: ${user.name}`}</p>
                    <p className="font-bold">{`📧Email: ${user.email}`}</p>
                </section>
            </div>
            <div className='flex justify-center items-center mt-6 '>
                <EventForm />
            </div>


            <section className="flex flex-col md:flex-row justify-center items-center bg-gray-500-50 rounded-md w-[90%] mx-auto space-y-6 md:space-y-0 md:space-x-9 p-5 my-12">
                <div className="bg-gray-800 w-full md:w-full flex flex-col text-center rounded-md mx-auto space-y-6 p-6">
                    <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline mb-5">🎟️Active Events</h1>
                  
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                        {Array.isArray(events) && events.map(event => (
  
                     <DataRender key={event.id} id={event.id} title={event.title} price={event.price} date={event.date} 
                    picture={event.picture} description={event.description} location={event.location}
                    maxseats={event.maxseats} subtitle={event.subtitle}
                        />
                        ))}
                        </div>
                <hr />
               
                
                <div className="bg-gray-800 w-full md:w-full  flex flex-col text-center rounded-md mx-auto space-y-6 p-6 ">
                    <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline mb-5">👤Manage Users</h1>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 m-auto'>
                        {users.map((user)=>
                        <UsersDashboardRender 
                        key={user.id} name={user.name} email={user.email} id={user.id}
                        password={user.password}
                        phone={user.phone}
                        allergies={user.allergies}
                        address={user.address}
                        birthday={user.birthday}    
                        city={user.city}
                        country={user.country}
                        admin
                        />
                        )}
                        </div>
                </div> 

                  <hr />
                <div className="bg-gray-800 w-full md:w-full flex flex-col text-center rounded-md mx-auto space-y-6 p-6">
                    <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline">📖Users Bookings</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-24 m-auto'>
                        {bookings.map((booking) => 
                        <div className='bg-gray-500-50 rounded-md hover:bg-slate-600 hover:bg-opacity-50 cursor-pointer'>
                            <h1 className='text-xl font-bold'>UserID: {booking.userId}</h1>
                            <p className='text-gray-400'>📅{new Date(booking.Date).toDateString()}</p>
                            <p className='text-gray-400'>🧾{booking.Quantity}</p>
                            <p className='text-gray-400'>Price: {booking.Paid}💲</p>

                        </div>
                        )}
                    </div>
                </div>
                   
                </div>
                
            </section>

        </div>
    );
};

export default DashboardAdmin;
