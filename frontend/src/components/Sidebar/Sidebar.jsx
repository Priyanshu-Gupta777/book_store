import React from 'react'
import { Link } from 'react-router-dom';
import {authActions} from '../../store/auth';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { ImExit } from "react-icons/im";
import { useSelector } from 'react-redux';

export const Sidebar = ({data}) => {

    const navigate = useNavigate();
    const dispatch= useDispatch();
    const role = useSelector((state) => state.auth.role);
    
    const LogOut = (e) => {
        e.preventDefault();
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear('id');
        localStorage.clear('token');
        localStorage.clear('role');
        navigate('/')
    }
    
  return (
    
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[80vh] md:h-[90vh]">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <img src={data.avatar} className="h-[15vh] mb-4 rounded-full" alt="Profile" />
            <p className="text-xl text-zinc-100 font-semibold">
              {data.username}
            </p>
            <p className="text-sm text-zinc-300">{data.email}</p>
            <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
            </div>
    
          {/* Menu Section */}
       {role === 'user' && (          <div className="w-full flex flex-col items-center justify-center  lg:flex">
  <Link
    to="/profile"
    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
  >
    Favourites
  </Link>

  <Link
    to="/profile/orderHistory"
    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
  >
    Order History
  </Link>

  <Link
    to="/profile/settings"
    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
  >
    Settings
  </Link>
</div>)}
{role === 'admin' && (<div className="w-full flex flex-col items-center justify-center  lg:flex">
  <Link
    to="/profile"
    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
  >
    All Order History
  </Link>

  <Link
    to="/profile/add-book"
    className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
  >
    Add Book
  </Link>
</div>)}
<button type='submit' onClick={LogOut} className="mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 w-3/6 lg:w-full bg-zinc-600 hover:bg-red-700 rounded-lg transition-all duration-300">
        
        Log Out &nbsp;&nbsp;<ImExit />
      </button>
</div>
      );
}
