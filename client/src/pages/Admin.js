import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DrawerCard from '../components/DrawerCard';
import OpenCart from '../components/OpenCart';
import OrderHistory from "../components/OrderHistory";
import product1 from "../../src/assets/product1.jpeg"
import product2 from "../../src/assets/product2.jpeg"
import product3 from "../../src/assets/product3.jpeg"
import product4 from "../../src/assets/product4.jpeg"
import product5 from "../../src/assets/product5.jpeg"
import product6 from "../../src/assets/product6.jpeg"


const Cards = ({ img, heading, price, itemNo, quantity,noofpieses, setCartItemCount }) => {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = () => {
        const cartItem = { img, heading, price, itemNo, quantity, noofpieses };
        const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // Check if an item with the same itemNo already exists
        const itemExists = existingItems.some(item => item.itemNo === itemNo);
    
        if (!itemExists) {
            const updatedItems = [...existingItems, cartItem];
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            // Update the state of cartItems directly
            setCartItems(updatedItems);
            // Update cartItemCount
            setCartItemCount(updatedItems.length);
            window.location.reload()
        } else {
            console.log('Item with the same itemNo already exists in the cart.');
        }
    };

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(cartItems);
        setCartItemCount(cartItems.length);
      
    }, [setCartItemCount]);

    return (
        <div className='px-5 py-10 '>
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '1rem', backgroundColor: '#0E1125', textAlign: 'center', padding: '35px' , borderRadius:"20px" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="50px"
                    width="100%"
                    image={img}
                    alt={heading}
                    sx={{ aspectRatio: '4/4' }}
                />
                <CardContent sx={{ flex: 1, color: "#C8A357" }}>
                    <Typography gutterBottom variant="h5" component="div">
                       <p className='text'>{heading}</p> 
                    </Typography>
                    <div className='text-white text-center text-2xl font-bold'>
                        MRP ₹{price}
                    </div>
                </CardContent>
            </CardActionArea>
            <div onClick={handleAddToCart}><DrawerCard /></div>
        </Card>
        </div>
    );
};

export default function Admin() {
    const [cartItemCount, setCartItemCount] = useState(0);

    return (
        <>
         
            <div className=" mx-auto max-w-screen-xl home-bg py-10 flex flex-col md:p-10 ">
                <section className='h-10 mb-4 '>
                    <div className='flex float-right gap-2'>
                        <button>
                            <OpenCart show="!openDrawer" />
                            {cartItemCount > 0 && <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-6 right-88">{cartItemCount}</span>}
                        </button>
                        <div className=' flex items-center justify-center px-4 rounded-md'>
                            <button>  <OrderHistory /></button>
                        </div>
                    </div>
                </section>
               

                <section className=' grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 '>
                    <Cards
                        img={product1}
                        heading="Attica Gold Pan Masala"
                        price="5"
                        itemNo="1"
                        quantity=""
                        noofpieses="30"
                        setCartItemCount={setCartItemCount}
                    />
                    <Cards
                        img={product2}
                        heading="Attica Gold Pan Masala"
                        price="5"
                        itemNo="2"
                         quantity=""
                         noofpieses="30"
                        setCartItemCount={setCartItemCount}
                    />
                    <Cards
                        img={product3}
                        heading="Attica Gold Pan Masala"
                        price="10"
                        itemNo="3"
                        quantity=""
                        noofpieses="30"
                        setCartItemCount={setCartItemCount}
                    />
                    <Cards
                        img={product4}
                        heading="Attica Gold Pan Masala"
                        price="10"
                        itemNo="4"
                         quantity=""
                         noofpieses="30"
                        setCartItemCount={setCartItemCount}
                    />
                     <Cards
                        img={product5}
                        heading="Attica Gold Pan Masala"
                        price="20"
                        itemNo="5"
                         quantity=""
                         noofpieses="30"
                        setCartItemCount={setCartItemCount}
                    />
                    <Cards
                        img={product6}
                        heading="Attica Gold Pan Masala"
                        price="20"
                        itemNo="6"
                         quantity=""
                         noofpieses="30"
                        setCartItemCount={setCartItemCount}
                    />
                </section>
              
              
            </div>
        </>
    );
}
