import React from "react";
import { useState } from "react";
const categoryItem = [
  {
    id: 1,
    title: "Clothing",
    number: 24,
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 2,
    title: "Accessories",
    number: 56,
    image: "/images/home/category/img2.jpg",
  },
  {
    id: 3,
    title: "Gadgets",
    number: 89,
    image: "/images/home/category/img3.jpg",
  },
  {
    id: 4,
    title: "Swag",
    number: 34,
    image: "/images/home/category/img4.jpg",
  },
];

const Categories = () => {
  const [category, setCategory] = useState(categoryItem);
  return (
    <div className="selection-container py-16 ">
      <div className="">
        <div className="text-center">
          <p className="subtitle">Customer Favorites</p>
          <h2 className="title">Popular Categories</h2>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-around item-center mt-12">
          {category.length > 0 &&
            category.map((item) => {
              return (
                <div
                  key={item.id}
                  className="shadow-lg rounded-r-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300"
                >
                  <div className="w-full mx-auto flex items-center justify-center">
                    <img
                      src={item.image}
                      alt=""
                      className="bg-red p-1 rounded-full w-28 h-28"
                    />
                  </div>
                  <div className="mt-5 space-y-1">
                    <h5 className="text-[#1e1e1e] font-semibold">
                      {item.title}
                    </h5>
                    <p className="text-secondary font-semibold">
                      ({item.number} items)
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
