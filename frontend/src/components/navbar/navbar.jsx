import { useState } from 'react'
import { BookOpen, Menu, X } from "lucide-react"
import {Link} from 'react-router-dom';
import { MdMenuBook } from "react-icons/md";
import {useSelector} from 'react-redux';

import { useDispatch } from 'react-redux';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const links = [
    {
    title : 'Home',
    link : '/',
  },
 
  {
    title : 'All Books',
    link : '/all-books',
  },
  {
    title : 'Cart',
    link : '/cart',
  },
  {
    title : 'Admin Profile',
    link : '/profile',
  },
  {
    title : 'Profile',
    link : '/profile',
  },

  ]
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  
  if(isLoggedIn === false){
    links.splice(2,2);
  }
  
  if(isLoggedIn === true && role === 'admin'){
    links.splice(4,1);
  }

  if(isLoggedIn === true && role === 'user'){
    links.splice(3,1);
  }
  

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MdMenuBook  className="w-8 h-10 text-orange-500"  />
          <span className="text-2xl text-cyan-500 font-bold">The Reading Room</span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {links.map((items,i) => (<Link className="hover:text-yellow-400 hover:text-sm" to={items.link} key={i}>{items.title}</Link>))}
          </ul>
          </nav>
        <div className="hidden md:flex space-x-2">
          {isLoggedIn === false ? (<Link to='/login' className="px-4 py-2 border border-green-500 rounded hover:bg-green-500">Login</Link>):<></>}
          {isLoggedIn === false ? (<Link to='/signup' className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-600">SignUp</Link>):<></>}
          
        </div>
        
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4">
            <ul className="space-y-2">
            {links.map((items,i) => (<li><Link className="hover:text-yellow-400" to={items.link} key={i}>{items.title}</Link></li>))}
            </ul>
          </nav>
          <div className="px-4 pt-2 pb-4 space-y-2">
            {isLoggedIn===false ?(<Link to='/login'><button className="w-full px-4 py-2 border border-green-500 rounded hover:bg-green-500">Login</button></Link>):<></>}
            {isLoggedIn===false ?(<Link to='/signup'><button className="w-full px-4 py-2 mt-2 bg-yellow-400 rounded hover:bg-yellow-600">SignUp</button></Link>):<></>}
            
          </div>
        </div>
      )}
    </header>
  )
}