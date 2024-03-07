import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import event from "../img/event.jpg";
import corporate from "../img/corporate.jpg";
import CartContainer from "./CartContainer";
import MenuContainer_2 from "./MenuContainerTwo";
// import { cartInfo } from "../utils/fetchLocalStorageData";
const MainContainer = () => {
  const [{ foodItems }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our fresh & healthy fruits
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>

      <MenuContainer />
      
      <section className="w-full my-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5">
          <div className="md:w-[42%] ">
            <div className="w-full h-[150px] relative">
              <div className="w-full h-full bg-[black] opacity-[0.2] absolute rounded-[10px]"></div>
              <p className="absolute bottom-0 left-0 text-white p-4 text-[1.8rem] font-[500]">
                Event
              </p>
              <img
                src={event}
                alt="event"
                className="object-cover h-full w-full bg-cover bg-center rounded-[10px]"
              />
            </div>
            <div className="py-5 font-[300] md:w-[90%]">
              <p>
                An event without Smallchops is definitely just a gathering. It
                gets better; you can customise your order however you deem fit.
              </p>
            </div>
            <a
              href="#"
              className="text-[1.1rem] md:text-[1.5rem] text-red-800 underline font-[500]"
            >
              Order Nendys For Your Event
            </a>
          </div>
          <div className="md:w-[42%] ">
            <div className="w-full h-[150px] relative">
              <div className="w-full h-full bg-[black] opacity-[0.3] absolute rounded-[10px]"></div>
              <p className="absolute bottom-0 left-0 text-[#ffffff] p-4 text-[1.8rem] font-[500]">
                Corporate
              </p>
              <img
                src={corporate}
                alt="event"
                className="object-cover h-full w-full bg-cover bg-center rounded-[10px]"
              />
            </div>
            <div className="py-5 font-[300] md:w-[90%]">
              <p>
              Sometimes all you need for culture fit is a corporate hangout/event with a lot Smallchops. This is what we go to work for.
              </p>
            </div>
            <a
              href="#"
              className="text-[1.1rem] md:text-[1.5rem] text-[black] underline font-[500]"
            >
              Place Order
            </a>
          </div>
        </div>
      </section>
      {/* <MenuContainer_2 /> */}
    </div>
  );
};

export default MainContainer;
