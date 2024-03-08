import React from "react";
import Delivery from "../img/delivery.png";
import logo from "../img/logo.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
import Typed from "typed.js";

const HomeContainer = () => {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "It's noon, <br /> Order your launch <br />from <span class='text-orange-600 text-[2.1rem] md:text-[4rem]'>Nendys!</span>",
        "Have you tried, <br /> Nendys Shawamah?",
        "Order Now and leave a review.",
      ],
      startDelay: 1000,
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      // loop: true,
      smartBackspace: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="w-full">
      <div className="hidden md:flex absolute w-[100%] h-screen top-0 left-0 justify-end align-center ">
        <img src={logo} className="opacity-[0.04]" alt="delivery" />
      </div>
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full relative"
        id="home"
      >
        <div className="py-2 flex-1 flex flex-col items-start  gap-6">
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
            <p className="text-base text-orange-500 font-semibold">
              Quick Delivery
            </p>
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
              <img
                src={Delivery}
                className="w-full h-full object-contain"
                alt="delivery"
              />
            </div>
          </div>

          <p
            ref={el}
            className="mx-auto md:mx-0 text-[2rem] py-2 text-center md:text-left md:text-[3rem] font-[400] tracking-wide leading-[2.5rem] md:leading-[4rem] text-headingColor"
          />

          {/* <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
          eaque fugit distinctio est nam voluptatum architecto, porro iusto
          deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
          suscipit!
        </p> */}
          <div className="flex gap-4 flex-col md:flex-row mx-auto md:mx-0">
            <a href="#menu">
              <button
                type="button"
                className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
              >
                Order Now
              </button>
            </a>
            <button
              type="button"
              className="border border-[black] w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
            >
              Check Available Delivery Areas
            </button>
          </div>
        </div>
        <div className="py-2 flex-1 flex items-center relative">
          {/* <img
            src={HeroBg}
            className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
            alt="hero-bg"
          /> */}

          <div className="w-full h-full top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap">
            {heroData &&
              heroData.map((n) => (
                <div
                  key={n.id}
                  className="w-150 lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={n.imageSrc}
                    className="w-20 lg:w-[7rem] -mt-10 lg:-mt-10 "
                    alt="I1"
                  />
                  <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                    {n.name}
                  </p>

                  <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                    {n.decp}
                  </p>

                  <p className="text-sm font-semibold text-headingColor">
                    <span className="text-xs text-red-600">$</span> {n.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContainer;
