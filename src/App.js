import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  CreateContainer,
  Header,
  MainContainer,
  MenuPage,
  About,
  Footer,
  Checkout,
} from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./firebase.config";

const App = () => {
  const [{ user, foodItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // console.log(cartItems.length)

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header login={login} logout={logout} isMenu={isMenu} setIsMenu={setIsMenu} />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer user={user} />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/store" element={<MenuPage />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default App;
