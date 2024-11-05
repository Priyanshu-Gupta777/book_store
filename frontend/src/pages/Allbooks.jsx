import BookCard from "../components/Bookcard/BookCard";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Loader } from "../components/Loader/Loader";

export default function Allbooks() {
    const [books, setBooks] = useState();

    useEffect(() => {
     const fetch = async() => {
        const resp = await axios.get('https://thereadingroom.onrender.com/api/book/get-all-books');
        //console.log(resp.data.data);
        setBooks(resp.data.data);
     }
     fetch();
    }, [])
 

  return (
    <div className="p-4 bg-gray-900 text-white">
    <div className="m-0 px-4">
      <h4 className="text-3xl mb-3 font-semibold text-yellow-400">All Books</h4>
      {!books && (<div className='w-full h-screen flex items-center justify-center'><Loader/></div>)}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {books && books.map((book, i) => (
            <div key={i}>
          <BookCard data={book} />
          </div>
        ))}
      </div>
    </div>
    </div>

  );
}