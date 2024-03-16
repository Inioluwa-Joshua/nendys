import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";
import { clearCookie, getCookie, setCookie } from "../utils/cookieFunctions";

const CartContainer = ({ login }) => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce((accumulator, item) => {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [cartItems, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    clearCookie("cartItems");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* Body */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* Cart Items Section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                setFlag={setFlag}
                flag={flag}
              />
            ))}
          </div>

          {/* Cart Total Section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                &#x20A6; {tot + 2.5}
              </p>
            </div>
            {user ? (
              <Link
                to="/checkout"
                whileTap={{ scale: 0.8 }}
                onClick={showCart}
                className="w-full p-2 text-center rounded-full bg-gradient-to-tr from-orange-800 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg font-[600]"
              >
                Check Out
              </Link>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={login}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-800 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg font-[600]"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        // Empty Cart Section
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
