
import React from 'react';
import { useClerk } from "@clerk/clerk-react";
//import { SignIn } from '@clerk/clerk-react';
//import { SignedIn, UserButton } from "@clerk/clerk-react";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import axios from 'axios';


function IntroComponent() {
  const clerk = useClerk();

  const handleSignIn = () => {
    
    axios.get('/api/auth')
      .then(response => {
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  };

  
  return (
    
    <div className="flex flex-col p-16 h-full font-roboto font-light">
      <div className="flex flex-row mb-4">
        {/* <img src="path/to/logo.png" alt="Logo" className="w-16 h-16" /> */}
        <svg className="rounded-xl bg-blue-500 text-white" width="45" height="45" viewBox="0 0 80 80">
          <rect width="80" height="80" fill="#2563EB" rx="12" ry="12"/>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="45" fontWeight="bold">cf</text>
          <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="10" >beta</text>
        </svg>
        <h1 className="text-xl p-2">create<span className="font-bold">ful</span></h1>
      </div>
      <h1 className='font-sans font-semibold text-5xl pt-14'>Your linkedin Growth companion</h1>
      <br/>
      <h3 className='font-normal  text-lg'>Grow your personal brand on linkedin with:</h3>
      <br/>
      <ul className=" text-left mt-4 mb-8">
        <li className="flex font-normal text-lg "><div className="p-1"><HiOutlineCheckBadge /></div> <span className="pb-2 pl-2 pt-0 mt-0">Efficient scheduling</span></li>
        <li className="flex font-normal text-lg "><div className="p-1"><HiOutlineCheckBadge /></div><span className="pb-2 pl-2">Native AI grammar check</span></li>
        <li className="flex font-normal text-lg "><div className="p-1"><HiOutlineCheckBadge /></div><span className="pb-2 pl-2">Draft, schedule & publish</span></li>
        <li className="flex font-normal text-lg opacity-50 "><div className="p-1"><HiOutlineCheckBadge /></div><span className="pb-2 pl-2">More features coming soon</span></li>
      </ul>
      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
      <button onClick={() => clerk.openSignIn({})} className="bg-blue-600 text-white px-4 py-2 rounded-md mb-2 w-1/2 hover:scale-110 shadow-2xl hover:shadow-blue-900">Connect your LinkedIn account(with clerk)</button>
      <p className="text-sm font-normal">Already have an account? <span onClick={() => clerk.openSignIn({})} className="font-normal text-blue-600 hover:underline hover:underline-offset-4">Log in instead</span></p>
      <br />
      <br />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mb-2 w-1/2 hover:scale-110 shadow-2xl hover:shadow-blue-900"onClick={handleSignIn}>Sign In with LinkedIn (with custum backend)</button>
    </div>
  );
}

export default IntroComponent;
