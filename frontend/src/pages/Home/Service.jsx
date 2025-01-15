import React from "react";
import { useState } from "react";
const serviceList = [
  {
    id: 1,
    title: "High-Quality Products",
    description: "We offer a curated selection of high- quality products.",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description: "We deliver your order promptly to your door",
    image: "/images/home/services/fast-delivery.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    description: "Explore products & order with ease using our Online Ordering",
    image: "/images/home/services/order.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    description: "Give the gift of exceptional dining with SE Shop Gift Cards",
    image: "/images/home/services/gift.png",
  },
];

const Service = () => {
  const [service, setService] = useState(serviceList);
  return (
    <div className="section-container py-16  ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:4/5">
            <p className="subtitle">OUR STORY & SERVICES</p>
            <h2 className="title"> Our Journey And Services</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              We provide a curated selection of high-quality tech-inspired
              products, backed by fast shipping and exceptional customer
              service. Our mission is to empower and inspire tech enthusiasts
              through our carefully chosen merchandise and community engagement
              initiatives.
            </blockquote>
            <button className="btn bg-red text-white px-6 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {service.length > 0 &&
              service.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="shadow-md rounded-sm px-5 py-4 text-center space-y-4 text-red cursor-pointer hover:border hover:border-red transition-all duration-300 hover:bg-rose-50"
                  >
                    <img src={item.image} alt={item.title} className="mx-auto h-16 " />
                    <div>
                      <h5 className="font-semibold">{item.title}</h5>
                      <p className="text-secondary">{item.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
