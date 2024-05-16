import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { IoCart } from 'react-icons/io5';
import ClearCart from '../Utills/ClearCart';
import axios from 'axios';
import { FaRupeeSign } from "react-icons/fa";
import { TfiAlert } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";

const OpenCart = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [cartMessage, setCartMessage] = useState('');

  const pashShopOwnerId = localStorage.getItem("id");
  const address = localStorage.getItem("address");
  const panShopOwner = localStorage.getItem("panShopOwner");
  const panShopOwnerState = localStorage.getItem("state");

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = storedCartItems.map(item => ({
      ...item,
      quantity: item.quantity || 1,
      productNames: item.heading || '' // Use heading as productName
    }));

    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  }, []);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleIncrement = itemNo => () => {
    const updatedCartItems = cartItems.map(item => {
      if (item.itemNo === itemNo) {
        return { ...item, quantity: (item.quantity || 0) + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
    setTimeout(() => {
      setCartMessage('');
    }, 3000);
  };

  const handleDecrement = itemNo => () => {
    const updatedCartItems = cartItems.map(item => {
      if (item.itemNo === itemNo && (item.quantity || 0) > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
    setCartMessage('Product removed from the cart');
    setTimeout(() => {
      setCartMessage('');
    }, 3000);
  };

  const handleRemoveItem = itemNo => () => {
    const updatedCartItems = cartItems.filter(item => item.itemNo !== itemNo);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
    setCartMessage('Product removed from the cart');
    setTimeout(() => {
      setCartMessage('');
    }, 3000);
  };

  const calculateTotalPrice = items => {
    const total = items.reduce((acc, item) => acc + item.quantity * item.noofpieses * item.price, 0);
    setSubTotal(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    console.log("orderNumbr  ", orderNumber)
    const postData = {
      products: cartItems.map(({ heading, quantity, price, description }) => ({
        productNames: heading + "( " +  description +" )",
        quantity,
        price,
      })),
      otp: orderNumber,
      panShopOwnerName: panShopOwner,
      panShopOwneraddress: address,
      panShopOwner_id: pashShopOwnerId,
      panShopOwnerstate: panShopOwnerState,
      orderNumber // Include the random number in the order data
    };

    try {
      await axios.post("http://localhost:5000/api/panshop/order", postData);
      setCartItems([]);
      localStorage.removeItem('cartItems');
      setCartMessage(`Order placed successfully! Your order number is ${orderNumber}.`);
    } catch (error) {
      console.error('Error placing order:', error);
      setCartMessage('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="flex">
      <button onClick={toggleDrawer} className="btn-bg text-black px-4 py-2 rounded-lg w-full mb-20 transition duration-300 ease-in-out hover:bg-gray-700">
        <IoCart />
      </button>

      <div className={`fixed inset-0 z-50 ${openDrawer ? 'visible' : 'invisible'}`} onClick={toggleDrawer}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
      </div>
      <div className={`fixed right-0 top-0 h-full md:w-2/3 lg:w-1/3 bg-gray-900 z-50 transform transition-transform ease-in-out duration-300 ${openDrawer ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="items-center px-10 py-8" style={{ overflowY: 'hidden' }}>
          <div className="flex text-2xl font-bold text-center gap-2 justify-between bg-items-center text-white">
            <div>
              <div className="flex items-center">
                <SlArrowLeft onClick={toggleDrawer} className="mt-1" />
                <h1>Shopping Cart</h1>
              </div>
              <div>
                <p className='text-sm text-[#c8a357] text-left font-semibold flex items-start mt-5'>
                  <TfiAlert className='mr-2 text-xl' /> Your cart is waiting for you! Please complete your order.
                </p>
              </div>
            </div>

            <div>
              <ClearCart />
            </div>
          </div>
          <hr className="border-t border-gray-300 my-8 w-full" />

          <div className="px-6 py-4 items-center justify-center content-center" style={{ maxHeight: '60vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
            <div className="cart-items-container">
              {cartItems.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-4 py-6">
                  <img className="w-60 h-60" src={item.img} alt="Product Image" />
                  <div className="flex flex-col gap-2 text-white">
                    <div className="flex items-center gap-2">
                      <h1 className="text-left text-lg font-semibold">{item.heading}</h1>
                      <span className="text-xl font-semibold">:</span>
                      <h1 className="text-xl font-semibold">{item.price}</h1>
                    </div>
                    <div className="flex items-center gap-4 text-2xl text-black">
                      <button className="btn-bg w-12 h-10 rounded-lg" onClick={handleDecrement(item.itemNo)}>-</button>
                      <p className="text-left m-5 text-white">{item.quantity}</p>
                      <button className="btn-bg w-12 h-10 rounded-lg text-xl" onClick={handleIncrement(item.itemNo)}>+</button>
                    </div>
                    <div className="text-left text-lg font-semibold flex items-center">
                      Price : <FaRupeeSign className='text-sm' /> {item.noofpieses * item.price * item.quantity}
                    </div>
                  </div>
                 <div className='pb-52 '>
                 <button onClick={handleRemoveItem(item.itemNo)} className="bg-red-500 text-2xl  rounded-lg text-black">
                   <RxCross2 className='w-12 h-10 '/>
                  </button>

                 </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 w-full flex items-center justify-between btn-bg py-4 px-2 rounded-xl">
            <p className="text-base font-bold">{cartMessage ? cartMessage : `Total Price: ${subTotal}`}</p>
            <button onClick={handleSubmit} className="bg-blue-900 text-white font-bold py-2 px-4 rounded-xl relative">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenCart;
