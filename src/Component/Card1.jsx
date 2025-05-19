import React from 'react'


const card1 =[
  {
    name: "Shoes",
  image:"url"
  },
   {
    name: "Bags",
    image:"url"
   },
   {
    name: "Braclets",
    image:"url"
   }
]
function Card1(props) {
  return (
    <>
    <div className='flex justify-center items-center relative '>
    <div className='flex  gap-20 absolute -top-20'>
    {card1.map((card1,index) =>(
    <div className='flex flex-col justify-center items-center h-40 w-40 border  rounded-md shadow-black  '>
      
      <><div className=' h-20 w-20 rounded-full overflow-hidden '>
          <img src='https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className=''></img>
        </div><p className='font-medium mt-2'>{card1.name}</p></>
   
     
    </div>
  ) )}
    </div>

    </div>
    </>
  )
}

export default Card1
