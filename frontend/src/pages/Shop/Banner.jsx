import React,{useState,useEffect} from "react";

const Banner = () => {
   
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-slate-300 to-100%">
      <div className="py-12 flex flex-col md:flex-row-reverse justify-center items-center">
        <div className="space-y-7 px-4 text-center">
          <h2 className="md:text-4xl text-4xl  font-bold md:leading-snug leading-snug">
            Unleash Your Inner <span className="text-red">Geek</span>:{" "}
            <p>Shop Our Exclusive Tech-themed Merchandise!</p>
          </h2>
          <p>
            We offer a curated selection of high-quality products ranging from
            clothing and accessories to home decor and office essentials. Each
            item is carefully chosen to meet our standards of quality.
            functionality, and style.
          </p>
          <a href="" className="btn bg-red text-white px-6 py-3 rounded-full">
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
