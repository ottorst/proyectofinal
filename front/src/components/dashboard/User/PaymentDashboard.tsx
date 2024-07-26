'use client';
import { useState } from 'react';

interface DashboardProps {
    userId: number;
}

const PaymentMethod: React.FC<DashboardProps> = ({userId}) => {

  return (
    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9101 1121"
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name on Card</label>
          <input
            type="text"
            id="name"
            placeholder="John Trump"
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentMethod;
