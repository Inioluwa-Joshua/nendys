// export const fetchCart = () => {
//   const cartInfo = JSON.parse(
//     localStorage.getItem("cartItems") !== "undefined")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : localStorage.clear();


//   return cartInfo ? cartInfo : {};
// };
// import { getCookie } from "./cookieFunctions";
// export const fetchCart = () => {
//   const cartInfo = getCookie("cartItems") || {};
//   return cartInfo;
// };
export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};
// export const cartInfo = JSON.parse(localStorage.getItem("cartItems") || "[]" )
