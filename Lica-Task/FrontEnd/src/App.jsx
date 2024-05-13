
import {React,useState} from "react";
import InfiniteScrollComponent from "./components/LandingPage/InfiniteScrollComponent";
import IntroComponent from "./components/LandingPage/IntroComponent";
import Sidebar from "./components/RootPage/Sidebar";
import PostList from "./components/RootPage/PostList";
import CreatePost from "./components/RootPage/CreatePost";
import { SignedOut,SignedIn } from "@clerk/clerk-react";



function App() {
  const [selectedOption, setSelectedOption] = useState('PostList');

  const handleSidebarSelection = (option) => {
    setSelectedOption(option);
  };


  return (
    <>
      <SignedOut>
        <div className="flex">
          <div className="w-1/2">
            <IntroComponent />
          </div>
          <div className="w-1/2">
            <InfiniteScrollComponent />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
      <div className="flex">
          <div className="w-1/5">
          <Sidebar onSelect={handleSidebarSelection} selectedOption={selectedOption}/>
          </div>
          <div className="w-4/5">
            {selectedOption === 'PostList' ? <PostList /> : <CreatePost />}
          </div>
        </div>
      </SignedIn>
    </>
  );
}

export default App;
