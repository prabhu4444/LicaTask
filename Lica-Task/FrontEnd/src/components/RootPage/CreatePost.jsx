import React, { useState, useRef, useEffect } from 'react';
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { GoImage } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { PiMagicWand } from "react-icons/pi";

function CreatePost() {
  const [postContent, setPostContent] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleButtonClick = (action) => {
    
    switch (action) {
      case 'photo':
        
        fileInputRef.current.click();
        break;
      
      default:
        break;
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID); 
  }, []);

  function tick() {
    setCurrentDate(new Date());
  }

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const { user } = useUser();

  return (
    <div className="px-44 py-16">
      
      <div className="flex items-center mb-4">
        <div className="p-4"><UserButton /></div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-black ml-2">{user.fullName}</span>
          <span className="text-sm text-gray-500 ml-2">{user.primaryEmailAddress.emailAddress}</span>
          <span className="text-sm text-gray-500 ml-2">{formattedDate}</span>
        </div>
      </div>
      
      <div className="flex justify-between mb-4 p-3 rounded-lg bg-gray-200">
        
        <div className="flex space-x-2">
          <button className="bg-white hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md" onClick={() => handleButtonClick('photo')}><GoImage /></button>
          
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} />
          <button className="bg-white hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"><BsEmojiSmile /></button>
          <button className="bg-white hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md "><LuEye /></button>
          <button className="bg-white hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"><PiMagicWand /></button>
        </div>
        
        <div className="flex space-x-2">
          <button className="bg-white hover:bg-gray-300 text-gray-400 px-4 py-2 rounded-md">Save as Draft</button>
          <button className="bg-white hover:bg-gray-300 text-gray-400 px-4 py-2 rounded-md">Schedule</button>
          <button className="bg-gray-800 hover:bg-gray-300 text-gray-200 px-4 py-2 rounded-md">Publish</button>
        </div>
      </div>
      
      {imagePreview && <img src={imagePreview} alt="Preview" className="mb-4 flex align-center p-2 w-max-40 max-h-32 rounded-md h-auto" />}
      
      <textarea
        className="resize-none border rounded-md px-3 py-2 w-full mb-4"
        placeholder="Write your new post..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        required
      ></textarea>
    </div>
  );
}

export default CreatePost;
