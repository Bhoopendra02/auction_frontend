import React, { useEffect, useState } from 'react';
import axios from "axios";

function Quote()  {

     const [data, setdata] =useState([]);
    useEffect(()=>{
        axios.get('https://dummyjson.com/quotes')
        .then((res)=>{
            console.log(res.data);
            // setdata(res.data.quotes)
        })
    },[])
//   const quoteData = {
//     text: "The best way to predict the future is to create it.",
//     author: "Peter Drucker",
//   };

return (
  <>

      {data.map(function(singledata){
        return(
          <div className="bg-gray-300 p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
          <p className="text-lg font-semibold  italic text-center">
          {singledata.quote}
          </p>
          <p className="text-sm font-medium  text-center mt-4">
            {singledata.author}
          </p>
        </div>

        )
      }).slice(0,5)}

      </>
  );
};

export default Quote;
