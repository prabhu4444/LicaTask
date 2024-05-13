
import { UserButton } from "@clerk/clerk-react";
import React, { useState,useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";

const Post = () => {
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

    const {  user } = useUser();

  return (
    <div>
        
      <div className="px-44 pt-12 ">
        
        <div className="border-gray-500 border-2">
          <div className="flex items-center mb-4">
            <div className="p-4">
              <UserButton />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-black ml-2">
                {user.fullName}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {user.primaryEmailAddress.emailAddress}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {formattedDate}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">
                There are 2 types of engineers:
              </h2>
              <ol className="list-decimal pl-8">
                <li className="mb-4">
                  <p>
                    Who do their work by themselves, who take ownership, even if
                    they don’t know they will analyse, do some ground work and
                    take some guidance and get themselves unblocked.
                  </p>
                </li>
                <li>
                  <p>
                    Who always ahead of picking the task, but relies on other
                    engineers for analysis, what changes to be done, where to be
                    done. Need hand holding for each and every task.
                  </p>
                </li>
              </ol>
              <p className="mt-4 font-semibold">
                I would say, be like the 1st engineer rather than the 2nd.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-44 pt-12 ">
        
        <div className="border-gray-500 border-2">
          <div className="flex items-center mb-4">
            <div className="p-4">
              <UserButton />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-black ml-2">
                {user.fullName}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {user.primaryEmailAddress.emailAddress}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {formattedDate}
              </span>
            </div>
          </div>
          <div><div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">The Importance of Continuous Learning for Software Developers</h2>
      <p className="text-gray-700 mb-4">
        In software development, continuous learning is crucial. By staying updated with evolving technologies and best practices, developers can adapt to new challenges, innovate, and deliver high-quality solutions.
      </p>
      <p className="text-gray-700 mb-4">
        Embracing continuous learning helps developers master emerging technologies, drive innovation, and maintain a competitive edge in the market. It's the key to success in the dynamic field of software development.
      </p>
    </div></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
