
import React from 'react';
import InfiniteScroll from '../../assets/images/InfiniteScroll.png'

function InfiniteScrollComponent() {
  return (
    <div>
      <h1 className="flex justify-center bg-black text-white">Lica Task</h1>
      <img src={InfiniteScroll} alt="Infinite Scroll Image" className="w-full h-full object-cover" />
    </div>
  );
}

export default InfiniteScrollComponent;
