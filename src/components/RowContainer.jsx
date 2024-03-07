import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { IoIosBookmark } from "react-icons/io";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import r3 from "../img/r3.png";
import r5 from "../img/r5.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { fetchCart } from "../utils/fetchLocalStorageData";
// const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItens"))

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);
  // localStorage.setItem("cart", JSON.stringify(items));

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-300 min-w-[300px] md:w-350 md:min-w-[350px] bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col justify-evenly "
          >
            <div className="h-[188px] w-[100%] flex items-center justify-between relative">
              <motion.div
                className="w-full h-full drop-shadow-2xl" // Added the h-full class
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="object-cover hover:w-full mx-auto h-full"
                />
              </motion.div>

              {/* <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md absolute top-1"
                onClick={() => setItems([...cartItems, item])}
              >
                <IoIosBookmark className="text-white" />
              </motion.div> */}
              <motion.div className=" h-8 rounded  flex items-center justify-center cursor-pointer absolute top-1 right-0">
                <p className="text-[0.9rem]">&#x1F44D; 100% (20)</p>
              </motion.div>
            </div>

            <div className="flex flex-col items-start justify-start bg-[green">
              <div className="w-full">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item?.title}
                </p>
              </div>

              <div className="flex justify-between w-full">
                <div className="w-[50%]">
                  <p className="mt-1 text-sm text-gray-500">
                    {item?.calories} Calories
                  </p>
                  <div className="flex items-center gap-8">
                    <p className="text-lg text-headingColor font-semibold">
                      <span className="text-sm text-red-500">&#x20A6;</span>{" "}
                      {item?.price}
                    </p>
                  </div>
                </div>
                <div>
                  <motion.button
                    whileTap={{ scale: 0.75 }}
                    className="flex items-center gap-2 p-2 py-1 bg-red-600 text-white rounded-[10px] text-[0.9rem] "
                    onClick={() => setItems([...cartItems, item])}
                  >
                    Add To Cart <MdShoppingBasket />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;

// <div
// key={item?.id}
// className="w-300 h-[175px] min-w-[300px] md:w-350 md:min-w-[350px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-row items-center justify-evenly "
// >
// <div className="w-[60%] flex items-center justify-between bg-[red]">a
//   <motion.div
//   className="h-inherit drop-shadow-2xl bg-[green]"
//     whileHover={{ scale: 1.2 }}
//   >
//     {/* <img
//       src={item?.imageURL}
//       alt=""
//       className="w-full h-full object-contain"
//     /> */}
//   </motion.div>
//   {/* <motion.div
//     whileTap={{ scale: 0.75 }}
//     className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
//     onClick={() => setItems([...cartItems, item])}
//   >
//     <MdShoppingBasket className="text-white" />
//   </motion.div> */}
// </div>

// <div className="w-[30%] flex flex-col items-end justify-end -mt-8 bg-[green]">
//   <p className="text-textColor font-semibold text-base md:text-lg">
//     {item?.title}
//   </p>
//   <p className="mt-1 text-sm text-gray-500">
//     {item?.calories} Calories
//   </p>
//   <div className="flex items-center gap-8">
//     <p className="text-lg text-headingColor font-semibold">
//       <span className="text-sm text-red-500">$</span> {item?.price}
//     </p>
//   </div>
// </div>
// </div>
