import React from 'react'

function Portfolio() {
  return (

    
    <div className='mt-18 text-center bg-gray-200 p-18 '>
      <div >
        <p className='text-5xl font-semibold  text-gray-800 '>OUR PORTFOLIO</p>
        <p className='mt-2 text-lg font-semibold text-gray-700'>Proven Expertise Across Indutries</p>
        <div className='flex justify-center items-center flex-wrap gap-20 mt-12'>
            <p className='border-8 border-gray-600 rounded-full h-40 w-40 flex justify-center items-center flex-col'><span className='text-4xl font-medium'>2 Years</span> of experience</p>
            <p className='border-8 border-gray-600 rounded-full h-40 w-40 flex justify-center items-center flex-col'><span className='text-4xl font-medium'>300+ </span>Auction conducted </p>
            <p className='border-8 border-gray-600 rounded-full h-40 w-40 flex justify-center items-center flex-col'><span className='text-4xl font-medium'>1200+</span>Bidder connection </p>
            <p className='border-8 border-gray-600 rounded-full h-40 w-40 flex justify-center items-center flex-col'><span className='text-4xl font-medium'>25</span>Company onboarded </p>
            
        </div>
      </div>
    </div>
  )
}

export default Portfolio
