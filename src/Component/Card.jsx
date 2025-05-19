import React from 'react'

function Card() {
  return (
    <div className="h-80 w-70 m-56 rounded-2xl shadow-2xl">
      <div className="flex justify-around ">
        <p className="mt-4 font-bold ">Google</p>

        <button className="mt-4 bg-gray-300 rounded-lg w-16 h-7 font-medium hover:bg-gray-600">
          saved
        </button>
      </div>
      
      <div className="ml-6 mt-8">
        <p>
          <span className="text-lg font-semibold">Google</span>
          <span className="ml-2 text-gray-400">30 days ago</span>
        </p>
      </div>
      
      <div className="mt-4 ml-6 font-medium text-2xl">
        <p>Graphic Designer</p>
      </div>
      
      <div className="mt-2 ml-6">
        <button className="bg-gray-300 rounded-md h-7 w-20 font-semibold hover:bg-gray-600">
          Full Time
        </button>
        <button className="bg-gray-300 rounded-md h-7 w-34 font-semibold ml-2 hover:bg-gray-600">
          Flexible Schedule
        </button>
      </div>
     
      <div className="flex mt-20 ml-6">
        <div>
          <p>$150-220k</p>
          <p className="text-gray-500">Indore, India</p>
        </div>
        <div className="ml-14   ">
          <button className="bg-gray-950 rounded-md h-8 w-24 text-white hover:bg-sky-600 ">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card

