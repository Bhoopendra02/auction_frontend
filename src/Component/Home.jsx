import { NavLink } from "react-router-dom";

function Home(){
    return (
      <>
      <div className="relative flex flex-col justify-center items-center text-gray-800 min-h-[500px] px-4 bg-gray-200">
        {/* Content */}
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-center leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Auctions</span>
            <br/>
            <span className="text-4xl text-gray-700">your next great find awaits!</span>
          </h1> 
          <p className="mt-4 text-xl text-gray-600 font-medium max-w-2xl text-center">
            Discover exclusive treasures and experience the thrill of online auctions
          </p>
          <NavLink to={"/Explore"}>
          <button className="mt-10 px-6 py-2 rounded-md bg-blue-600 text-white font-semibold text-base shadow-md hover:bg-blue-700 ">
            Explore More
          </button>
          </NavLink>
        </div>
      </div>
      </>
    );
}
export default Home