import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {authActions} from '../store/auth';
import { useDispatch } from 'react-redux';

function Login() {
  
  const [Values, setValues] = useState({username:"",password: ""});

  const navigate = useNavigate();
  const dispatch= useDispatch();
  const change = (e) =>{
   const {id, value} = e.target;
   setValues({...Values, [id] : value});
  }
 
  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    try
    {
       if(Values.username === "" || Values.email === "" || Values.address === "" || Values.password === "" ){
        
        alert("All fields are required");
       }
       else{
        const resp = await axios.post('https://thereadingroom.onrender.com/api/sign/signin', Values);
        //console.log(resp.data);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(resp.data.role));
        localStorage.setItem("id", resp.data.id);
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("role", resp.data.role);
        navigate('/profile');
       }
       
    }
    catch(error){
      alert(error.response.data.message);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={Values.username}
              onChange={change}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={Values.password}
              onChange={change}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            
          >
           Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/signup" className="text-sm text-indigo-600 hover:text-indigo-500">
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};


  
export default Login;