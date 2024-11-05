import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../Loader/Loader';

export default function Component() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [address, setAddress] = useState()
  const [Values, setValues] = useState({address : ""});

  const [ProfileData, setProfileData] = useState();
  
  const change = (e) =>{
    const {name, value} = e.target;
    setValues({...Values, [name] : value});

  }

  
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
      setProfileData(response.data);
      setValues(response.data);

    };
    fetchData();
  }, []);

  
  const UpdateAddress = async(e) => {
    e.preventDefault();
    const resp = await axios.put(
      "http://localhost:8000/api/sign/update-address",
      Values,
      { headers }
    );
    alert(resp.data.message);
    
    // Handle form submission here
    
  }

  return (
    <>
    {!ProfileData && (<div className='w-full h-screen flex items-center justify-center'><Loader/></div>)}

    {ProfileData && (<div className="min-h-screen   bg-zinc-900  flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-800 text-gray-100 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-4 ">
          <h2 className="text-2xl font-bold text-center mb-6">Settings</h2>
          <form onSubmit={UpdateAddress}className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <p className="p-2 rounded bg-zinc-700 mt-2 font-semibold">{Values.username}</p>
             
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <p className="p-2 rounded bg-zinc-700 mt-2 font-semibold">{Values.email}</p>
              
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                Address
              </label>
              
              <textarea
                name="address"
                value={Values.address}
                onChange={change}
                className="w-full px-3 py-2 bg-zinc-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[100px] resize-y"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )}
  </>
  )
}