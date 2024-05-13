import React from 'react';
import { CgAdd } from "react-icons/cg";
import { MdPostAdd } from "react-icons/md";
import { MdOutlineViewCarousel } from "react-icons/md";
import { PiFlowerTulipLight } from "react-icons/pi";
import { IoBulbOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { PiHammer } from "react-icons/pi";

import { SignedIn,UserButton,SignOutButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";


function Sidebar({ onSelect, selectedOption }) {
    const handleSelection = (option) => {
      onSelect(option);
    };
    const {  user } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 p-4">
      <div className="flex flex-row p-4 mb-16">
      <svg className="rounded-xl bg-blue-500 text-white" width="45" height="45" viewBox="0 0 80 80">
          <rect width="80" height="80" fill="#2563EB" rx="12" ry="12"/>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="45" fontWeight="bold">cf</text>
          <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="10" >beta</text>
        </svg>
        
        <h1 className="text-xl p-2 ml-2">create<span className="font-bold">ful</span></h1>
      </div>
      <ul className="pb-28">
        
        <li 
          className={`text-black flex flex-row rounded-lg border-2 hover:border-gray-300 cursor-pointer px-4 py-1 hover:bg-white ${selectedOption === 'createPost' ? 'bg-white text-black' : ''}`}
          onClick={() => handleSelection('createPost')}
        >
          <div className="p-1"><CgAdd /> </div><span className="pb-2 pl-2">Create Post</span>
          </li>
        <li 
          className={`text-black flex flex-row rounded-lg border-2 hover:border-gray-300 cursor-pointer px-4 py-1 hover:bg-white ${selectedOption === 'PostList' ? 'bg-white text-vlack' : ''}`}
          onClick={() => handleSelection('PostList')}
        >
          <div className="p-1"><MdPostAdd /></div><span className="pb-2 pl-2">Posts</span>
        </li>
        <li className="flex flex-row mb-2 px-4 py-1 cursor-not-allowed opacity-50">
        <div className="p-1"><MdOutlineViewCarousel /></div><span className="pb-2 pl-2">Carousel Creator</span>
        </li>
        <li className="flex flex-row mb-2 px-4 py-1 cursor-not-allowed opacity-50">
        <div className="p-1"><IoBulbOutline /></div><span className="pb-2 pl-2">Idea Generator</span>
        </li>
        <li className="flex flex-row mb-2 px-4 py-1 cursor-not-allowed opacity-50">
        <div className="p-1"><TbBrandGoogleAnalytics /></div><span className="pb-2 pl-2">Analytics</span>
        </li>
        <li className="flex flex-row mb-2 px-4 py-1 cursor-not-allowed opacity-50">
        <div className="p-1"><PiHammer /></div><span className="pb-2 pl-2">Tools</span>
        </li>
        <li className="flex flex-row mb-2 px-4 py-1 cursor-not-allowed opacity-50">
        <div className="p-1"><LuCrown /></div><span className="pb-2 pl-2">Upgrade</span>
        </li>
      </ul>
      
      <div className="relative bottom-0">
        
        <button className="bg-blue-100 border-2 border-blue-400 shadow-blue-300 shadow w-full h-12 hover:bg-gray-400 text-black px-4 py-2 flex flex-row justify-center rounded-md mb-2"><div className="p-2"><PiFlowerTulipLight /></div><span className="p-1">Send Feedback</span></button>
        
        <div className="flex flex-row mb-2 px-4 py-4 justify-center ">
          <span className="p-1 h-8 w-8"><UserButton/></span>
          <span className="pb-0 text-lg font-normal mb-0 pt-1 pl-2">{user.fullName}</span>
        </div>
          
        <div className="relative bottom-0 bg-blue-600 text-blue-600 px-4 py-2 rounded-md mb-2 w-full hover:scale-110 shadow-2xl hover:shadow-blue-900"><SignOutButton/><span className='text-white pl-5 text-lg'>Sign out</span></div>
        
      </div>
    </div>
  );
}

export default Sidebar;
