import React, { useEffect, useState  } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const UserTable = () => {

    const [data, setdata] =useState([])

    useEffect(()=>{
         axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getAll`)
         .then((res)=>{
            console.log(res);
            setdata(res.data.users)
       })
        .catch((error)=>{
           console.log(error)
        })
    },[])

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
      <table className="min-w-full bg-white">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium">ID</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Image</th>
            <th className="px-6 py-4 text-left text-sm font-medium">UserName</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Number</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition ease-in-out duration-150 bg-white"
            >
              <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
              <td className="px-6 py-4"><img
                  src={user.image}
                  alt="User"
                  className="h-12 w-12 rounded-full border border-gray-300 object-cover shadow-sm"
                /></td>
              <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{user.phone}</td>
              <td className="px-6 py-4">
                  <Link
                    to={`/UserDetails/${user._id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    View Details
                  </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;