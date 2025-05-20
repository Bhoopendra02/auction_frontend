import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function UserDetails()  {
    //  const id =5;
   const {id } = useParams()

const [data, setdata] =useState({})

useEffect(()=>{
    const fetchData= async()=>{
      console.log("id:", id);

     const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/UserById/${id}`)
      console.log(response.data)
       setdata(response.data)
     }
    
    fetchData()

},[id])
console.log(data)
if(!data) return <p>no data found</p>

  return (

   <>

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center">
        <img
       
          src={data.image}
          alt={`${data.firstName} ${data.lastName}`}
          className="w-32 h-32 rounded-full border shadow-md"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {data.firstName} {data.lastName}
          </h1>
          <p className="text-gray-600 italic">{data.maidenName}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
          <p className="text-gray-800"><strong>Age:</strong> {data.age}</p>
          <p className="text-gray-800"><strong>Gender:</strong> {data.gender}</p>
          <p className="text-gray-800"><strong>Blood Group:</strong> {data.bloodGroup}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
          <p className="text-gray-800"><strong>Email:</strong> {data.email}</p>
          <p className="text-gray-800"><strong>Mobile:</strong> {data.mobile}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Physical Attributes</h2>
          <p className="text-gray-800"><strong>Height:</strong> {data.height} cm</p>
          <p className="text-gray-800"><strong>Weight:</strong> {data.weight} kg</p>
          <p className="text-gray-800"><strong>Eye Color:</strong> {data.eyeColor}</p>
          {/* <p className="text-gray-800"><strong>Hair:</strong> {data.hair}, {data.hair}</p> */}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Account Information</h2>
          <p className="text-gray-800"><strong>Username:</strong> {data.username}</p>
          <p className="text-gray-800"><strong>Password:</strong> {data.password}</p>
          <p className="text-gray-800"><strong>Birth Date:</strong> {data.birthDate}</p>
        </div>
      </div>
    </div>
    
   </>
  );
};

export default UserDetails;