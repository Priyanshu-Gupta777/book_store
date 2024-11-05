import React from "react";
import { HiXCircle } from "react-icons/hi";

const SeeUserData = ({userDivData, userDiv, setuserDiv}) => {

  
  return (
    <>
      <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div>
      <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
        <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[50%]">
          <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">User Information</h1>
          <button className="text-3xl md:text-3xl font-semibold text-red-500" onClick={() => setuserDiv("hidden")}>
            <HiXCircle />
          </button>
          </div>
          <div className="mt-2">
            <label htmlFor="">Username : </label>
            <span className="font-semibold">{userDivData.username}</span>
          </div>
          <div className="mt-4">
            <label htmlFor="">Email : </label>
            <span className="font-semibold">{userDivData.email}</span>
          </div>
          <div className="mt-2">
            <label htmlFor="">Address : </label>
            <span className="font-semibold">{userDivData.address}</span>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default SeeUserData;