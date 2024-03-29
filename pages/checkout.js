import React from "react";
import Link from "next/link";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import { BsFillBagFill } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  return (
    <div className="container sm:m-auto mx-2">
      {/* <Head>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
            </Head>
            <Script type='application/javascript' crossOrigin='anonymous' src={`{HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`}  onLoad="onScriptLoad();"></Script> */}

      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className=" text-xl font-semibold">1. Delivery Details</h2>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <div className="px-2 w-full">
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>

          <textarea
            name="address"
            id="address"
            cols="30"
            rows="2"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pin Code
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-xl ">2. Review Cart Items & Pay</h2>

      {/* side cart */}
      <div className="  sideCart  bg-gray-300 p-6 m-2 ">
        <ol className=" list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className=" my-4 semi-bold font-normal">
              Your Cart is Empty
            </div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-3">
                <div className="  font-semibold">
                  {cart[k].name}({cart[k].size}/{cart[k].variant}){" "}
                </div>
                <div className=" mx-2 font-semibold flex items-center justify-center w-1/3 text-lg">
                  <AiOutlineMinusCircle
                    onClick={() =>
                      removeFromCart(
                        k,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].size,
                        cart[k].variant
                      )
                    }
                    className=" mx-2 cursor-pointer"
                  />{" "}
                  {cart[k].qty}{" "}
                  <AiOutlinePlusCircle
                    onClick={() =>
                      addToCart(
                        k,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].size,
                        cart[k].variant
                      )
                    }
                    className="cursor-pointer mx-2"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <span className="font-bold">Sub Total : {subTotal}</span>
      </div>
      <div className="mx-4">
        <Link href={"/checkout"}>
          <button className="flex  mr-2 text-white  py-2 bg-indigo-600 border-0 hover:bg-indigo-700 px-2  focus:outline-none rounded-md text-md">
            <BsFillBagFill className="m-1" />
            Pay ₹ {subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
