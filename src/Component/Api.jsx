import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Api() {
     const [data,setdata]=useState([]);

      useEffect(()=>{
        axios.get('https://dummyjson.com/carts')
        .then((response)=>{
             console.log(response.data.carts);
             setdata(response.data.carts)
        })
      },[] );

  return (

    <>
        {data.map(function(post){
            return (
            <div>
      <div className='flex justify-center items-center '>
      <div className='flex flex-col  border-2 h-40 w-80'>
        <p className='mt-4'>{post.id} </p>
        <p className='mt-4'>{post.total}</p>
        <p className='mt-4'>{post.userId}</p>
      </div>
      </div>
    </div>
            )
        }).slice(0,10)}

    </>
    
  )
}

export default Api
