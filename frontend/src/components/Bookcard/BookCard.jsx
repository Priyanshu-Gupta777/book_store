import { Link } from "react-router-dom";
import React from 'react';
import axios from "axios";

export default function Component({ data, favourite }) {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id,
  };

  const handleRemove = async () => {
    try {
      const resp = await axios.put("https://thereadingroom.onrender.com/api/favourite/remove-book-from-favourite", {}, { headers });
      // Handle successful removal
    } catch (error) {
      console.error("Error removing book from favourites:", error);
      // Handle error
    }
  }

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col h-full">
      <Link to={`/view-book-details/${data._id}`} className="flex-grow flex flex-col">
        <div className="flex-grow flex flex-col">
          <div className="bg-zinc-900 rounded flex items-center justify-center mb-4">
            <img src={data.url} alt={data.title} className="h-[250px]" />
          </div>
          <p className="mt-2 text-zinc-400 font-semibold line-clamp-2">{data.title}</p>
          <p className="mt-1 text-zinc-400 font-semibold text-sm">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">₹{data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button 
          className="bg-yellow-50 px-4 py-2 mt-4 rounded border border-yellow-500 text-zinc-800 hover:bg-yellow-500 transition-colors w-full"
          onClick={handleRemove}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
}