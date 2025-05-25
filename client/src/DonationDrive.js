import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// The URL should match your backend server (adjust if needed)
const socket = io();

function DonationDrive() {
  // State for cash and message
  const [cash, setCash] = useState(0);
  const [message, setMessage] = useState('');

  // Connect to the server and set up event listeners
  useEffect(() => {
    // Listen for 'updateCash' events from the server
    socket.on('updateCash', ({ cash, message }) => {
      setCash(cash);
      setMessage(message);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('updateCash');
    };
  }, []);

  // Emit 'donate' or 'redeem' events when buttons are clicked
  const handleDonate = () => socket.emit('donate');
  const handleRedeem = () => socket.emit('redeem');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-2">Donation Drive</h1>
      <h2 className="text-xl mb-4">Total Cash Donation: ${cash}</h2>
      <p className="mb-4 text-center">
        Give according to one's capacity;<br />
        Take according to one's need
      </p>
      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          onClick={handleDonate}
        >
          Donate $10
        </button>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700"
          onClick={handleRedeem}
        >
          Redeem $10
        </button>
      </div>
      <div className="bg-yellow-200 p-4 rounded shadow w-full max-w-md text-center">{message}</div>
    </div>
  );
}

export default DonationDrive;