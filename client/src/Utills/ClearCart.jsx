import React from 'react'
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const ClearCart = () => {

    
  const handleClearCart = () => {
    alert("clear cart")
    localStorage.removeItem('cartItems');
    window.location.reload()
};


  return (
    <div><button className='bg-red-500 py-2 px-4' onClick={handleClearCart}>
   <MdOutlineRemoveShoppingCart />

</button></div>
  )
}

export default ClearCart