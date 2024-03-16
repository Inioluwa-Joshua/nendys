import { fetchCart } from "../utils/cookieFunctions";
import { fetchUser } from "../utils/fetchLocalStorageData";

// const cartInfo = fetchCart();
const userInfo = fetchUser();


export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: fetchCart(),
};