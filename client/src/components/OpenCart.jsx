import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { IoCart } from "react-icons/io5";
import ClearCart from '../Utills/ClearCart';

const OpenCart = () => {
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
      <IoCart />
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
        <div className="items-center px-10 py-8 border-b border-gray-300">
          <div className='flex text-2xl font-bold text-center gap-2 justify-between items-center'>
            <div className='flex items-center'>
              <SlArrowLeft onClick={toggleDrawer} className='mt-1' />
              <h1>Shopping Cart</h1>
            </div>

            <div>
              <ClearCart />
            </div>

          </div>
        <div className="px-20 py-10 items-center justify-center content-center">
          <div className="cart-items-container">
            {cartItems.map((item, index) => (
              <div key={index} className='flex items-center gap-20'>
                <img className='w-60 h-60' src={item.img} alt="Product Image" />
                <div className='flex flex-col gap-4'>
                  <div className="flex items-center gap-4">
                    <h1 className='text-xl font-semibold'>{item.heading}</h1>
                    <h1 className='text-xl font-semibold'>{item.price}</h1>
                  </div>
                  <select value={selectedOption} onChange={handleOptionChange} className="border border-gray-300 rounded-lg px-2 py-1 w-14">
                    <option value="Option 1">1</option>
                    <option value="Option 2">2</option>
                    <option value="Option 3">3</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default OpenCart;
