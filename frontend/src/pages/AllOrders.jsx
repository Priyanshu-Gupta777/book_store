import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {Loader} from '../components/Loader/Loader';
import { FaUserTie } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import  SeeUserData  from './SeeUserData';

export const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({status : "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState()
 
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

 
  
  useEffect(() => {
    const fetch = async() => {
      const resp = await axios.get('https://thereadingroom.onrender.com/api/order/get-all-orders', {headers});
      setAllOrders(resp.data.data);
      console.log(resp.data.data);
    }
    fetch();
  }, [AllOrders]);

  const change = (e) => {
    const {value} = e.target;
    console.log(value)
    setValues({status : value});
  }

  const submitChanges = async(i) => {
   
   const id = AllOrders[i]._id;
   console.log('Order ID:', id);
   console.log('Values being sent:', Values);
   const resp = await axios.put(`https://thereadingroom.onrender.com/api/order/update-status/${id}`, Values,{headers});
   alert(resp.data.message);
  }

  

  AllOrders && AllOrders.splice(AllOrders.length -1, 1);
  
  return (
    <>
      {!AllOrders && 
        (<div className='w-full h-screen flex items-center justify-center'><Loader/></div>)}
      {AllOrders && AllOrders.length > 0 && 
        (
        <div className="h-[100%] p-10 text-zinc-100">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              All Orders History
            </h1>
            {AllOrders.map((items,i) => (
              <div
              key={i}
              className="bg-zinc-800 w-full rounded py-4 px-6 mb-4 hover:bg-zinc-900 hover:cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 w-24">Sr.</span>
                  <span className="flex-1">{i + 1}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 w-24">Books</span>
                  <div className="flex-1">
                    <Link
                      to={`/view-book-details/${items.book._id}`}
                      className="hover:text-blue-300"
                    >
                      {items.book.title}
                    </Link>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-zinc-400 w-24">Description</span>
                  <p className="flex-1">{items.book.desc.slice(0, 50)}...</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 w-24">Price</span>
                  <span className="flex-1">₹{items.book.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 w-24">Status</span>
                  <div className="flex-1">
                    <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)}>
                      {items.status === "Order placed" ? (
                        <div className='text-yellow-400'>{items.status}</div>
                      ): items.status === "Cancelled" ? (<div className='text-red-400'>{items.status}</div>) : (<div className='text-green-400'>{items.status}</div>)}
                    </button>
                    
                    <div className={`${Options === i ? "flex" : "hidden"} flex mt-2`}>
                      <select 
                      name="status" 
                      id="" 
                      className="bg-gray-800"
                      value={Values.status}
                      onChange={change}
                      >
                        {[
                          "Order placed",
                          "Out for delivery",
                          "Delivered",
                          "Cancelled",
                        ].map((items,i) => (
                          <option value={items} key={i}>
                            {items}
                          </option>
                        ))}
                      </select>
                      <button 
                      className='text-green-500 hover:text-green-600 ml-2'
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}>
                      <FaCheck />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 w-24">User</span>
                  <div className="flex-1">
                    <button 
                    className='text-xl hover:text-orange-500'
                    onClick={() => {
                      setuserDiv("fixed");
                      setuserDivData(items.user);
                    }}>
                      <IoOpenOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {userDivData && (<SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv}/>)}
    </>
  );
}
