import { useEffect, useState } from 'react'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/Signup'
import Allbooks from './pages/Allbooks'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import RecentlyAddedBooks from './components/Home/RecentlyAddedBook'
import { Routes, Route} from 'react-router-dom'
import { ViewBookDetails } from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { Favourites } from './components/Sidebar/Favourites'
import  UserOrderHistory  from './components/Sidebar/UserOrderHistory'
import Settings  from './components/Sidebar/Settings'
import { AllOrders } from './pages/AllOrders'
import { AddBook } from './pages/AddBook'
import { UpdateBook } from './pages/UpdateBook'

function App() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) { dispatch(authActions.login());
        dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
    
  }, []);

  return (
    <div className='m-0'>
     
      <Navbar />
      <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/all-books' element={<Allbooks />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />}>
      {role === 'user' ? <Route index element={<Favourites />}/> : <Route index element={<AllOrders />}/>}
      {role === 'admin'  && <Route path='/profile/add-book' element={<AddBook />}/>}
      <Route path='/profile/orderHistory' element={<UserOrderHistory />}/> 
      <Route path='/profile/settings' element={<Settings />}/>
      </Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/update-book/:id' element={<UpdateBook />} />
      <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
      </Routes>
      <Footer />
     
    </div>
  )
}

export default App
