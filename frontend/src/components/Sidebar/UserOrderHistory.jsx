import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Loader } from '../Loader/Loader'
import { Link } from 'react-router-dom'

export default function Component() {
  const [OrderHistory, setOrderHistory] = useState()

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }

  useEffect(() => {
    const fetchOrder = async () => {
      const resp = await axios.get(
        "https://thereadingroom.onrender.com/api/order/get-order-history",
        { headers }
      )
      console.log(resp.data)
      setOrderHistory(resp.data.data)
    }
    fetchOrder()
  }, [])

  return (
    <>
      {!OrderHistory && (<div className='w-full h-screen flex items-center justify-center'><Loader/></div>)}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-full p-4 md:p-10 text-zinc-100">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-zinc-500 mb-4 md:mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-2 md:px-4 flex gap-2 text-xs md:text-base">
            <h1 className="w-[10%] text-center">Sr.</h1>
            <h1 className="w-[30%] md:w-[22%]">Books</h1>
            <h1 className="hidden md:block md:w-[45%]">Description</h1>
            <h1 className="w-[30%] md:w-[15%]">Price</h1>
            <h1 className="w-[30%] md:w-[16%]">Status</h1>
          </div>
          {OrderHistory.map((items, i) => (
            <div
              key={i}
              className="bg-zinc-800 w-full rounded py-2 px-2 md:px-4 flex gap-2 md:gap-4 hover:bg-zinc-900 hover:cursor-pointer text-xs md:text-base"
            >
              <h1 className="w-[10%] text-center">{i + 1}</h1>
              <div className="w-[30%] md:w-[22%] truncate">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <h1 className="hidden md:block md:w-[45%] truncate">
                {items.book.desc.slice(0, 50)}...
              </h1>
              <h1 className="w-[30%] md:w-[15%]">₹{items.book.price}</h1>
              <div className="w-[30%] md:w-[16%]">
                {items.status === "order placed" ? (
                  <h1 className="font-semibold text-green-300 text-xs md:text-sm truncate">Order Placed</h1>
                ) : items.status === "Cancelled" ? (
                  <h1 className="text-red-500 text-xs md:text-sm truncate">{items.status}</h1>
                ) : (
                  <h1 className="text-green-500 text-xs md:text-sm truncate">{items.status}</h1>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}