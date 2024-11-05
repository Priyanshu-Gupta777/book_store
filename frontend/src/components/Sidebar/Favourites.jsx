import axios from 'axios'
import React, {useEffect,useState} from 'react'
import BookCard from '../Bookcard/BookCard'

export const Favourites = () => {

  const [FavouriteBook,setFavouriteBook] = useState();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async() => {
      const resp = await axios.get("https://thereadingroom.onrender.com/api/favourite/get-favourite-books", {headers})
      setFavouriteBook(resp.data.data);
    }
    fetch();
  }, [FavouriteBook])
  
  return (
    <>
      {FavouriteBook && FavouriteBook.length === 0 && (
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold h-[100vh] text-yellow-400 flex flex-col items-center justify-center w-full'>
          No Favourite Books
        </div>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
        {FavouriteBook && FavouriteBook.map((items, i) => (
          <div key={i} className="w-full">
            <BookCard data={items} favourite={true} />
          </div>
        ))}
      </div>
    </>
  )
}
