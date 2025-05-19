import React from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    comment:
      "AuctionPro helped me find rare collectibles at great prices! The bidding process was smooth and exciting.",
    image: "https://media.istockphoto.com/id/1315976553/photo/portrait-of-a-smiling-man-of-indian-origin.jpg?s=612x612&w=0&k=20&c=0N93El-QxguVn9whsAiVvsSNYiscqbsucWlQE9i84co=", // Replace with actual image URL
  },
  {
    name: "Priya Patel",
    comment:
      "I sold my antique watch here and got an amazing deal. Highly recommended for both buyers and sellers!",
    image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Amit Verma",
    comment:
      "Excellent user experience and secure transactions. AuctionPro is the best online auction site!",
    image: "https://media.istockphoto.com/id/1200961327/photo/studio-portrait.jpg?s=612x612&w=0&k=20&c=pz9V6gmaUwNi7Z27REl94MSjanmIEStlwsB22cu5EC0=",
  },
];

const Testimonial = () => {
  return (
    <section className="mt-18 w-7/10 m-auto">
      <div className="container mx-auto px-4 ">
        <h2 className="text-5xl font-semibold text-center text-gray-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ">
          {testimonials.map((testimonial, index) => (
            <div key={index} className=" p-6 rounded-lg shadow-2xl  text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4  "
              />
              <h4 className="font-semibold text-lg mt-4">{testimonial.name}</h4>
              <p className="">{testimonial.comment}</p>
              
              
            </div>
            
          ))}
          
        </div>
      </div>
      
    </section>
  );
};

export default Testimonial;