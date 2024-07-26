'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../AuthContext';
import { useEffect } from 'react';

interface DashboardAdminProps {
  userId: number;
}

const DashboardAdmin: React.FC<DashboardAdminProps> = ({ userId }) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user || userId !== user.id || !user.admin) {
            router.push('/login');
        }
    }, [user, userId, router]);

    if (!user || userId !== user.id || !user.admin) {
        return null;
    }

    return (
        <div>
            <div className="flex flex-col items-center bg-yellow-500 bg-opacity-75 w-[90%] mx-auto rounded-md p-10">
                <h1 className="text-gray-100 text-3xl font-bold mb-7 underline">{`Welcome ${user?.name}`}</h1> 
                <section className="flex flex-col space-y-2 text-left">
                    <p className="font-bold">{`👤Name: ${user?.name}`}</p>
                    <p className="font-bold">{`📧Email: ${user?.email}`}</p>
                </section>
            </div>
    
            <section className="flex flex-col md:flex-row justify-center items-center bg-gray-500-50 rounded-md w-[90%] mx-auto space-y-6 md:space-y-0 md:space-x-9 p-5 my-20">
                <div className="bg-white bg-opacity-30 w-full md:w-96 flex flex-col text-center h-auto md:h-screen rounded-md mx-auto space-y-6 p-6">
                    <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline">🎟️Active Events</h1>
                    <p className="text-black text-xl">Control active events</p>
                </div>
        
                <div className="bg-white bg-opacity-30 w-full md:w-96 flex flex-col text-center h-auto md:h-screen rounded-md mx-auto space-y-6 p-6">
                    <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline">📖Event History</h1>
                    <p className="text-black text-xl">View All the booking events</p>
                </div>
        
                <div className="bg-white bg-opacity-30 w-full md:w-96 flex flex-col text-center h-auto md:h-screen rounded-md mx-auto space-y-6 p-6">
                    <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline">👤Manage Users</h1>
                    <p className="text-black text-xl">Control Users</p>
                </div>
            </section>
        </div>
    );
};

export default DashboardAdmin;