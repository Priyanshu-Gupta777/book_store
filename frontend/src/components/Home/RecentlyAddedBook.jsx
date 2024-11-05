import BookCard from "../Bookcard/BookCard";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Loader } from "../Loader/Loader";

export default function RecentlyAddedBooks() {
    const [books, setBooks] = useState();

    useEffect(() => {
     const fetch = async() => {
        const resp = await axios.get('https://thereadingroom.onrender.com/api/book/get-recent-books');
        //console.log(resp.data.data);
        setBooks(resp.data.data);
     }
     fetch();
    }, [])
 

  return (
    <div className="m-0 px-4">
      <h4 className="text-3xl text-yellow-400 mt-7">Recently added books</h4>
      {!books && (<div className="flex item-center justify-center"><Loader /></div>)}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {books && books.map((book, i) => (
            <div key={i}>
          <BookCard data={book} />
          </div>
        ))}
      </div>
    </div>
  );
}