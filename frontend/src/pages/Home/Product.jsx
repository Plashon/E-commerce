import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState,useRef,useEffect } from "react";
import Card from "../../components/Card";
import ProductService from "../../services/product.service";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
    >
      Next
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick, style } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
    >
      Back
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const slider = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductService.getAllProducts();
      //console.log(response);
      const data = response.data;
      const special = data.filter((item)=> item.category === "Clothing")
      setProducts(special);
    };
    fetchData();
  }, []);
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    initialSlide: 1,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Items</p>
        <h2 className="title">Standout Items From Our Products</h2>
      </div>
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24 text-2xl">
        <button
          className="btn bg-red p-2 rounded-full h-10 w-10 mt-5 text-white"
          onClick={() => slider?.current?.slickPrev()}
        >
          &lt;
        </button>
        <button
          className="btn bg-red p-2 rounded-full h-10 w-10 mt-5 text-white"
          onClick={() => slider?.current?.slickNext()}
        >
          &gt;
        </button>
        {/* &lt; , &gt; คือ น้อยกว่า และ มากกว่า */}
      </div>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...setting}
          className="overflow-hidden mt-10 space-x-5"
        >
          {products.length > 0 &&
            products.map((item) => {
              return <Card item={item} key={item._id} />;
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Product;
