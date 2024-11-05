import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import axios from 'axios'
import {useEffect, useState} from 'react'
import { Loader } from "../components/Loader/Loader";

function Profile() {

  const [Profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://thereadingroom.onrender.com/api/sign/get-user-information",
        { headers }
      );
      setProfile(response.data);
    };
    fetchData();
  }, []);

    return (
      <div className="flex flex-col md:flex-row  bg-zinc-900 px-2 md:px-12 py-8 gap-4">
       {!Profile && 
       (<div className='w-full h-screen flex items-center justify-center'><Loader/></div>)}
       {Profile && ( <>
       <div className="w-full md:w-1/6 h-screen">
        <Sidebar data={Profile} />
        </div>
       <div className="w-full md:w-5/6">
        <Outlet />
        </div>
      
      </> )}
      </div>
    )
  }
  
  export default Profile;