import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Signup() {
  
  const [Values, setValues] = useState({username:"",email:"",password:"",address:""});
  const navigate = useNavigate();
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
        const resp = await axios.post('https://thereadingroom.onrender.com/api/sign/signup', Values);
        console.log(resp.data);
        navigate('/login')
        
       }
       
    }
    catch(error){
      alert(error.response.data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit} >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              UserName
            </label>
            <input
              type="text"
              id="username"
              value={Values.username}
              onChange={change}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={Values.email}
              onChange={change}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              
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
              
            />
          </div>
          <div>
            <label htmlFor="Address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={Values.address}
              onChange={change}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
             
            />
          </div>
          <button
            type="submit"
            
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          >
            SignUp
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
  }
  
  export default Signup;