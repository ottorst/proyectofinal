'use client';
import { useState, useEffect } from 'react';
import DashboardUser from './UserDashboard';
import PaymentMethod from './PaymentDashboard';
import { useAuth } from '../../AuthContext';
import EventDashboard from './EventDashboard';
import { useRouter } from 'next/navigation';
import LoadingPage from '../../LoadingPage/loading';

interface DashboardProps {
    userId: number;
}

const DashboardMenu: React.FC<DashboardProps> = ({ userId }) => {
    const [selectedOption, setSelectedOption] = useState<'Profile' | 'Payment' | 'Events'>('Profile');
    const { user } = useAuth();
    const router = useRouter();

    const handleOptionChange = (option: 'Profile' | 'Payment' | 'Events') => {
        setSelectedOption(option);
    };

    if (!user) {
        return <LoadingPage/>
    }

    return (
        <div>
            <title>Dashboard User</title>
            <h1 className="text-gray-100 text-4xl font-bold mb-7 underline flex justify-center items-center p-6">{`Welcome ${user?.name}`}</h1>
            <div className="flex flex-row mt-8 space-x-6 text-gray-100 pl-4">
                <div className="bg-gray-800 w-1/4 h-80 p-4 rounded-lg flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4">Dashboard Menu</h2>
                    <ul className="space-y-3 w-full">
                        <li>
                            <button
                                className={`w-full py-2 px-4 rounded-lg text-left hover:bg-gray-700 focus:outline-none ${selectedOption === 'Profile' ? 'bg-gray-700 font-semibold' : ''}`}
                                onClick={() => handleOptionChange('Profile')}
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full py-2 px-4 rounded-lg text-left hover:bg-gray-700 focus:outline-none ${selectedOption === 'Payment' ? 'bg-gray-700 font-semibold' : ''}`}
                                onClick={() => handleOptionChange('Payment')}
                            >
                                Payment
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full py-2 px-4 rounded-lg text-left hover:bg-gray-700 focus:outline-none ${selectedOption === 'Events' ? 'bg-gray-700 font-semibold' : ''}`}
                                onClick={() => handleOptionChange('Events')}
                            >
                                Event History
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="flex-grow h-fit">
                    {selectedOption === 'Profile' && (
                        <div className="text-gray-100 rounded-lg h-full">
                            <DashboardUser userId={userId} />
                        </div>
                    )}
                    {selectedOption === 'Payment' && (
                        <div className="bg-gray-800 text-gray-100 rounded-lg h-full p-4">
                            <PaymentMethod userId={userId} />
                        </div>
                    )}
                    {selectedOption === 'Events' && (
                        <div className="bg-gray-800 text-gray-100 rounded-lg h-full p-4">
                            <EventDashboard />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardMenu;
