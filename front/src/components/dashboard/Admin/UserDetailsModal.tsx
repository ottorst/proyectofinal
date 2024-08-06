// Vendors
import React from 'react';
//Types
import { IUser } from '@/src/types/IUser';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg text-black">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ❌
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">👤User Details</h2>
        <p className="text-lg ">🪪Name: {user.name}</p>
        <p className="text-lg">📧Email: {user.email}</p>
        <p className="text-lg">📱Phone: {user.phone}</p>
        <p className="text-lg">🌎Country: {user.country}</p>
        <p className="text-lg">🤧Allergies: {user.allergies}</p>
        <p className="text-lg">📍Address: {user.address}</p>
        {user.admin ? <p className='text-lg'>🆔Admin: True</p>:<p className="text-lg">🆔Admin: False</p>}

      </div>
    </div>
  );
};

export default Modal;
