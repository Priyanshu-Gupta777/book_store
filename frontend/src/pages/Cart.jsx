import React, {useEffect, useState} from 'react';
import {Loader} from '../components/Loader/Loader'
import { Minus, Plus, Trash2 } from "lucide-react"
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [Cart, setCart] = useState([]);
  const [total, settotal] = useState(0);

  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async() => {
      const resp = await axios.get("https://thereadingroom.onrender.com/api/cart/get-user-cart", {headers})
      setCart(resp.data.data);
      
    }
    fetch();
  }, [Cart]);

  useEffect (() => {
    if(Cart && Cart.length > 0){
      let total = 0;
      Cart.map((item,i) => {total += item.price;});
      settotal(total);
      total = 0;
    }
  }, [Cart])

  const deleteItem = async(bookid) => {
    const resp = await axios.put(`https://thereadingroom.onrender.com/api/cart/remove-from-cart/${bookid}`,{}, {headers});

  }

  const placeOrder = async() => {

    try{
      const resp = await axios.post(`https://thereadingroom.onrender.com/api/order/place-order`,{order : Cart}, {headers});
      console.log(resp.data)
      navigate("/profile/orderHistory");
      setCart([]);
    }
    catch(error){
      console.log(error);
    }
  }



  return (
    <div className='bg-zinc-800 px-12 h-[100%] py-8'>
    {!Cart && (<div className='w-full h-screen flex items-center justify-center'><Loader/></div>)}
    {Cart && Cart.length === 0 && (
  <div className="h-screen">
    <div className="h-[100%] flex items-center justify-center flex-col m-4">
      <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
        Empty Cart
      </h1>
      <img
        src="/empty-cart(1).gif"
        alt="empty cart"
        className="h-[30vh] md:h-[40vh] lg:h-[50vh]"
      />
    </div>
  </div>
)}
    
    {Cart && Cart.length >0 && 
    <>
        <h1 className="text-3xl font-bold text-zinc-100 mb-8 text-center">Your Cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            {Cart.map((item, i) => (
              <div key={item.id} className="bg-zinc-700 text-zinc-200 rounded-lg shadow-md p-6 mb-4  flex flex-col sm:flex-row items-center justify-between">
                <img src={item.url} alt="/" className='h-[40vh] md:h-[30vh] object-cover'/>
                <div className="flex-grow sm:mr-6 m-7">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-zinc-200 text-lg">{item.author}</p>
                  <p className="text-zinc-200 text-lg mt-2">₹{item.price.toFixed(2)}</p>
                  <button className='text-red-600 rounded-full mt-3 hover:text-red-800 text-2xl md:text-3xl' onClick={() => deleteItem(item._id)}><AiFillDelete /></button>
                </div>
                
              </div>
            ))}
          </div>
          {Cart && Cart.length > 0 && 
          <div className="md:w-1/4">
            <div className="bg-zinc-700 text-zinc-100 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹40.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₹{(total + 40).toFixed(2)}</span>
              </div>
              <button className="w-full mt-4 bg-yellow-500 p-3 text-lg hover:bg-yellow-600" onClick={placeOrder}>Place Order</button>
            </div>
          </div>
           }
        </div>
     
      
    </>
}
    </div>
  )
  }
  
  export default Cart;