import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from "../Loader/Loader";
import { Link,useParams } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { GrLanguage } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

export const ViewBookDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  const role = useSelector((state) => state.auth.role);
  const [Data, setData] = useState();
  const [books, setBooks] = useState( ); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid : id,
  };

  const handleFavourite = async() => {
    const resp = await axios.put("https://thereadingroom.onrender.com/api/favourite/add-book-to-favourite", {} ,{headers});
    alert(resp.data.message);
  }

  const handleCart = async() => {
    const cart = await axios.put("https://thereadingroom.onrender.com/api/cart/add-book-to-cart", {}, {headers});
    alert(cart.data.message);
  }

  const deleteBook = async() => {
    const resp = await axios.delete("https://thereadingroom.onrender.com/api/book/delete-book", {headers});
    alert(resp.data.message);
    navigate('/all-books');
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await axios.get(`https://thereadingroom.onrender.com/api/book/get-book-by-id/${id}`);
        setBooks(resp.data.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetch();
  }, []);

  // Show loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  // If books is null, handle that case
  if (!books) {
    return <div className="text-white">Book not found.</div>;
  }

  return (
    <>
    {!books && <div className='bg-gray-800 text-white h-screen flex items-center justify-center'><Loader /></div>}
    {books && (
    <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 item-start'> 
      <div className='w-full lg:w-3/6 '>
      <div className='bg-zinc-800 rounded  p-12 flex flex-col lg:flex-row justify-around'>
        <img src={books.url} alt={books.title} className='h-[65vh] md:h-[80vh]  lg:h-[90vh]' />

        {isLoggedIn === true && role === 'user' && 
         (<div className='flex flex-col md:flex-row lg:flex-col item-center justify-between lg:justify-start mt-8 lg:mt-0'>
         <button className="bg-zinc-800 rounded lg:rounded-full p-2 text-3xl lg:text-3xl text-red-500 flex item-center justify-center" onClick={handleFavourite}><FaHeart />&nbsp; <span className='text-lg block lg:hidden'>Favourites</span></button>
         <button className="bg-zinc-800 rounded lg:rounded-full p-3 text-3xl lg:text-3xl mt-8 md:mt-0 lg:mt-8 text-yellow-500 flex item-center justify-center" onClick={handleCart}><FaCartArrowDown />&nbsp; <span className='text-lg block lg:hidden'>Add to cart</span></button>
        </div>)}

        {isLoggedIn === true && role === 'admin' && 
        (<div className='flex flex-col md:flex-row lg:flex-col item-center justify-center lg:justify-start mt-8 lg:mt-0'>
         <Link to={`/update-book/${id}`} className="bg-zinc-800 rounded lg:rounded-full p-2 text-4xl lg:text-4xl text-green-400 flex item-center justify-center"><MdEditNote />&nbsp; <span className='text-lg block lg:hidden'>Edit book</span></Link>
         <button className="bg-zinc-800 rounded lg:rounded-full p-3 text-2xl lg:text-3xl mt-8 md:mt-0 lg:mt-8 text-yellow-500 flex item-center justify-center" onClick={deleteBook}><RiDeleteBinFill />&nbsp; <span className='text-lg block lg:hidden'>Delete book</span></button>
        </div>)}
      </div>
      </div>
      <div className='p-4 text-white w-full lg:w-3/6'>
        <h1 className="text-4xl text-white">{books.title}</h1>
        <p className="mt-2 text-zinc-400 font-semibold">by {books.author}</p>
        <p className="mt-2 text-zinc-400 font-semibold">{books.desc}</p>
        <p className="mt-2 text-zinc-300 font-semibold"><span>language&nbsp;:</span>&nbsp;{books.language}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">₹{books.price}</p>
      </div>
    </div>)}

    </>
  );
};
