import ProductItem from "../../components/ProductItem";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-slate-300 to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center">
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="banner" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-16 gap-4">
            <ProductItem
              image="/images/home/gamepad.png"
              name="Game pad"
              price={499}
              rating={4}
            />
            <ProductItem
              image="/images/home/headphone.png"
              name="Headphone"
              price={999}
              rating={3}
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-snug">
            Discover Unique <span className="text-red"> Software Swag </span>for Every Coding Enthusiast
          </h2>
          <p>Our Mission: To Merge Fashion with Functionality in the World of Software Engineering</p>
          <a href="" className="btn bg-red text-white px-6 py-3 rounded-full">Order Now</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
