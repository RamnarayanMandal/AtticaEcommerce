import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { FaClipboardList } from "react-icons/fa";


const OrderHistory = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex">
      <button onClick={toggleDrawer} className="btn-bg text-black px-4 py-2 rounded-lg w-full mb-20 transition duration-300 ease-in-out hover:bg-gray-700">
      <FaClipboardList  />
      </button>

      <div
        className={`fixed inset-0 z-50 ${openDrawer ? 'visible' : 'invisible'}`}
        onClick={toggleDrawer}
      >
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
      </div>
      <div
        className={`fixed right-0 top-0 h-full w-2/5 bg-white z-50 transform transition-transform ease-in-out duration-300 ${openDrawer ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
      >
        <div className="flex justify-between items-center px-10 py-8 border-b border-gray-300">
          <div className='flex text-2xl font-bold text-center gap-2'>
            <SlArrowLeft onClick={toggleDrawer} className='mt-1' />
            <h1>Order History</h1>
           
          </div>
        </div>
       
      
      </div>
    </div>
  );
};

export default OrderHistory;
