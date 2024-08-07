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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-15 z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-lg">
        <div className='flex justify-end'>
          <button
            className='text-xl'
            onClick={onClose}
          >
            ❌
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">👤User Details</h2>
        <p className="text-lg ">🪪Name: {user.name}</p>
        <p className="text-lg">📧Email: {user.email}</p>
        <p className="text-lg">📱Phone: {user.phone}</p>
        <p className="text-lg">🌎Country: {user.country}</p>
        <p className="text-lg">🤧Allergies: {user.allergies}</p>
        <p className="text-lg">📍Address: {user.address}</p>
        {user.admin ? <p className='text-lg'>🆔Admin: True</p> : <p className="text-lg">🆔Admin: False</p>}

      </div>
    </div>
  );
};

export default Modal;
