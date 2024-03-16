import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { saveCheckoutItem } from "../utils/firebaseFunctions";
// import Loader from "./Loader";
import { stringify } from "@firebase/util";
import { PaystackButton } from "react-paystack";

// export const payRef = 'E'+(new Date()).getTime();

const Checkout = () => {
  const [{ cartItems, user }, dispatch] = useStateValue();
  const udata = stringify({ cartItems });
  // console.log({cartItems});
  const email = user.email;
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [localGovArea, setChangeText1] = useState("L.G.A *");
  const [state, setChangeText2] = useState("State *");
  const [country, setChangeText3] = useState("Country *");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const totalPrice = tot + 2.5;
  const amount = totalPrice * 100;

  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [orderType, setOrderType] = useState("null");
  // const [isLoading, setIsLoading] = useState(false);

  const name = firstName;
  const phone = phoneNumber;

  // const setData = () => {
  //     if (data && data) {
  //         localStorage.setItem("Data", JSON.stringify(data, data));
  //     }
  // }

  // if (!firstName || !lastName || !address || !localGovArea || !state || !country || !zipCode || !phoneNumber || !totalPrice) {
  //     setFields(true);
  //     setMsg("Required fields can't be empty");
  //     setAlertStatus("danger");
  //     setTimeout(() => {
  //         setFields(false);
  //         setIsLoading(false);
  //     }, 4000);
  // } else {

  //     } catch (error) {
  //     console.log(error);
  //     //   setFields(true);
  //     setMsg("Error : Try AGain 🙇");
  //     setAlertStatus("danger");
  //     setTimeout(() => {
  //         setFields(false);
  //         setIsLoading(false);
  //     }, 4000);
  // }

  // const handlePayment = (e) => {
  //     e.preventDefault();
  //     const handler = PaystackPop.setup({
  //     key: process.env.REACT_APP_PAYSTACK_TEST_KEY,
  //     email,
  //     amount,
  //     ref: payRef,
  //     onClose: () =>{
  //         alert("Wait! You need this oil, don't go!!!!");
  //     },
  //     callback: (response) => {
  //         const message = 'Payment complete! Reference: ' + response.reference;
  //         alert(message);
  //         saveCheckoutDetails()
  //         }
  //     });
  //     handler.openIframe();
  // }

  const publicKey = process.env.REACT_APP_PAYSTACK_TEST_KEY;

  const handlePaystackSuccessAction = (reference) => {
    console.log(reference);
    // Implementation for whatever you want to do with reference and after success call.
    alert("Thanks for doing business with us! Come back soon!!");
    // console.log(reference.trxref);
    saveCheckoutDetails(reference);
  };

  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    alert("Wait! Don't leave :(");
    console.log("closed");
  };

  // const handlePaymentDataCheck = () => {
  //     if (!firstName || !lastName || !address || !localGovArea || !state || !country || !zipCode || !phoneNumber || !totalPrice) {
  //         setFields(true);
  //         setMsg("Required fields can't be empty");
  //         setAlertStatus("danger");
  //         setTimeout(() => {
  //             setFields(false);
  //             setIsLoading(false);
  //         }, 4000);
  //     } else {
  //     }
  // };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const saveCheckoutDetails = (reference) => {
    const checkoutData = {
      id: `${Date.now()}`,
      firstName: firstName,
      lastName: lastName,
      address: address,
      addressLine: addressLine,
      localGovArea: localGovArea,
      state: state,
      country: country,
      zipCode: zipCode,
      phoneNumber: phoneNumber,
      totalPrice: tot + 2.5,
      ref: reference.trxref,
      items: udata,
    };
    const orderId = reference.trxref;
    saveCheckoutItem(checkoutData, orderId);
    // setIsLoading(false);
    setFields(true);
    setMsg("Your Order Was Sucessful 😊");
    setAlertStatus("success");
    setTimeout(() => {}, 4000);
    // clearData();
    console.log("sucess");
  };

  const HandleText1 = (e) => {
    setChangeText1(e);
    setDropdown1(false);
  };
  const HandleText2 = (e) => {
    setChangeText2(e);
    setDropdown2(false);
  };
  const HandleText3 = (e) => {
    setChangeText3(e);
    setDropdown3(false);
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    // console.log(tot);
  }, [tot, flag]);

  return (
    <div className="overflow-y-hidden">
      <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
        <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center  lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
          <div className="flex w-full  flex-col justify-start items-start">
            <div>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Check out
              </p>
            </div>
            {/* {fields && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                  alertStatus === "danger"
                    ? "bg-red-400 text-red-800"
                    : "bg-emerald-400 text-emerald-800"
                }`}
              >
                {msg}
              </motion.p>
            )} */}
            <div className="mt-8">
              <p className="text-xl font-semibold leading-5 text-gray-800">
                Please Chose Your Order Type
              </p>
            </div>

            {orderType === "null" && (
              <div className=" w-full flex flex-col gap-4 py-8">
                <div>
                  <button
                    onClick={() => setOrderType("pickup")}
                    className="leading-4 hover:bg-black py-3 w-full text-[black] hover:text-[white] bg-[white] border-[black] border-[2px] font-[600]  rounded-[10px]"
                  >
                    Pick Up At Nenedys Spot
                  </button>
                </div>
                <div className="flex w-full items-center text-[black]">
                  <hr style={{ flex: 1 }} />
                  <span style={{ margin: "0 10px" }}>or</span>
                  <hr style={{ flex: 1 }} />
                </div>
                <div>
                  <button
                    onClick={() => setOrderType("delivery")}
                    className="leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800 rounded-[10px] font-[600] "
                  >
                    Delivery To Your Location
                  </button>
                </div>
              </div>
            )}

            {orderType === "delivery" && (
              <>
                <div className="flex flex-row gap-4 py-4">
                  <div>
                    <button onClick={() => setOrderType("pickup")} className="leading-4 hover:bg-black py-1 px-2 w-full text-[black] hover:text-[white] bg-[white] border-[black] border-[2px] font-[600] rounded-[10px] text-[.8rem]">
                      Pick Up At Nenedys Spot
                    </button>
                  </div>
                  <div>
                    <button className="leading-4 hover:bg-black py-1 px-2 w-full md:w-4/12 lg:w-full text-white bg-[black] rounded-[10px] font-[600]  text-[.8rem] border-[black] border-[2px]">
                      Delivery To Your Location
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-col justify-start items-start w-full space-y-8 ">
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="First Name *"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="Last Name *"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="Address *"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                    <div
                      className="relative w-full"
                      onClick={() => setDropdown1(!dropdown1)}
                    >
                      <p
                        id="button1"
                        className=" px-2 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full"
                      >
                        {localGovArea}
                      </p>
                      <button
                        onClick={() => setDropdown1(!dropdown1)}
                        className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0"
                      >
                        <svg
                          id="close"
                          className={` transform ${
                            dropdown1 ? "rotate-180" : ""
                          }  `}
                          width={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6L8 10L4 6"
                            stroke="#4B5563"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        className={`shadow absolute z-10 bg-white top-10  w-full mt-3 ${
                          dropdown1 ? "" : "hidden"
                        }`}
                      >
                        <div className="flex flex-col  w-full">
                          <p
                            tabIndex={0}
                            onClick={() => HandleText1("Gwagwalada")}
                            className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full"
                          >
                            Gwagwalada
                          </p>
                          <p
                            tabIndex={0}
                            onClick={() => HandleText1("Apo")}
                            className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full"
                          >
                            Apo
                          </p>
                          <p
                            tabIndex={0}
                            onClick={() => HandleText1("Gwarimpa")}
                            className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full"
                          >
                            Gwarimpa
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative w-full"
                      onClick={() => setDropdown2(!dropdown2)}
                    >
                      <p
                        id="button2"
                        className=" px-2 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full"
                      >
                        {state}
                      </p>
                      <button
                        onClick={() => setDropdown2(!dropdown2)}
                        className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0"
                      >
                        <svg
                          id="close"
                          className={` transform ${
                            dropdown2 ? "rotate-180" : ""
                          }  `}
                          width={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6L8 10L4 6"
                            stroke="#4B5563"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        className={`shadow absolute z-10 bg-white top-10  w-full mt-3 ${
                          dropdown2 ? "" : "hidden"
                        }`}
                      >
                        <div className="flex flex-col  w-full">
                          <p
                            tabIndex={0}
                            onClick={() => HandleText2("Abuja")}
                            className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full"
                          >
                            Abuja
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full"
                    type="text"
                    placeholder="Phone Number *"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </>
            )}

            {orderType === "pickup" && (
              <div className="flex flex-row gap-4 py-4">
                <div>
                  <button className="leading-4 hover:bg-black py-1 px-2 w-full md:w-4/12 lg:w-full text-white bg-[black] rounded-[10px] font-[600]  text-[.8rem] border-[black] border-[2px]" >
                    Pick Up At Nenedys Spot
                  </button>
                </div>
                <div>
                  <button onClick={() => setOrderType("delivery")} className="leading-4 hover:bg-black py-1 px-2 w-full text-[black] hover:text-[white] bg-[white] border-[black] border-[2px] font-[600] rounded-[10px] text-[.8rem]">
                    Delivery To Your Location
                  </button>
                </div>
              </div>
            )}

            {/* <div className="mt-4 flex justify-start items-center w-full">
              <Link className="text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600">
                Back to my bag
              </Link>
            </div> */}
          </div>
          <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
            <div>
              <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                Order Summary
              </h1>
            </div>
            <div className="flex mt-7 flex-col items-end w-full space-y-6">
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total items</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  {cartItems.length}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  &#x20A6; {tot}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">
                  Shipping charges
                </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  &#x20A6; 2.5
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Sub total </p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  &#x20A6; {totalPrice}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full items-center mt-16">
              <p className="text-xl font-semibold leading-4 text-gray-800">
                Estimated Total{" "}
              </p>
              <p className="text-lg font-semibold leading-4 text-gray-800">
                &#x20A6; {totalPrice}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-[red] font-[500]">
                Select order type and delivery details to continue with payment
              </p>
              <button
                type="button"
                className="mt-1 text-base font-medium leading-4 py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-500 cursor-not-allowed"
                disabled
              >
                Pay
              </button>
            </div>

            <PaystackButton
              className="hidden focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800 disabled"
              {...componentProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
