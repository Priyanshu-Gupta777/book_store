import React from 'react'
import axios from "axios";
import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const UpdateBook = () => {
      
      const {id} = useParams();
      const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
      
     

      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid : id
      };
      
      const navigate = useNavigate();
      const change = (e) => {
        const { id, value } = e.target;
        setData({ ...Data, [id]: value });
      };
    
      const submit = async (e) => {
        e.preventDefault();
        try {
          if (
            Data.url === "" ||
            Data.title === "" ||
            Data.author === "" ||
            Data.price === "" ||
            Data.desc === "" ||
            Data.language === ""
          ) {
            alert("All fields are required");
          } else {
            const response = await axios.put(
              "https://thereadingroom.onrender.com/api/book/update-book",
              Data,
              { headers }
            );
            setData({
              url: "",
              title: "",
              author: "",
              price: "",
              desc: "",
              language: "",
            });
            alert(response.data.message);
            navigate(`/view-book-details/${id}`);
          }
        } catch (error) {
          alert(error.response.data.message);
        }
      };

      useEffect(() => {
        const fetch = async() => {
            const resp = await axios.get(`https://thereadingroom.onrender.com/api/book/get-book-by-id/${id}`);

            setData(resp.data.data);
        }
        fetch();
      }, [])
      
      return (
        <div className="min-h-screen bg-zinc-800 text-gray-300 p-4 sm:p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Update Book</h1>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label htmlFor="image" className="block mb-1 font-medium">
                  Image
                </label>
                <input
                  type="text"
                  id="url"
                  value={Data.url}
                  onChange={change}
                  placeholder="URL of image"
                  className="w-full bg-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="title" className="block mb-1 font-medium">
                  Title of book
                </label>
                <input
                  type="text"
                  id="title"
                  value={Data.title}
                  onChange={change}
                  placeholder="Enter book title"
                  className="w-full bg-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="author" className="block mb-1 font-medium">
                  Author of book
                </label>
                <input
                  type="text"
                  id="author"
                  value={Data.author}
                  onChange={change}
                  placeholder="Enter author name"
                  className="w-full bg-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="language" className="block mb-1 font-medium">
                    Language
                  </label>
                  <input
                    type="text"
                    id="language"
                    value={Data.language}
                    onChange={change}
                    placeholder="Enter language"
                    className="w-full bg-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block mb-1 font-medium">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    value={Data.price}
                    onChange={change}
                    placeholder="Enter price"
                    className="w-full bg-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block mb-1 font-medium">
                  Description of book
                </label>
                <textarea
                  id="desc"
                  rows={4}
                  value={Data.desc}
                  onChange={change}
                  placeholder="Enter book description"
                  className="w-full bg-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <button
                
                type="submit"
                className="w-full bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Update Book
              </button>
            </form>
          </div>
        </div>
      );
}
