import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = React.useState(false);
  const [sideBar, setSideBar] = React.useState(false);

  // React.useEffect(()=>{
  //     Object.keys(cart).length !== 0 && setSideBar(true)
  // },[])
  const ref = React.useRef();
  const toggleCart = () => {
    setSideBar(!sideBar);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    // <div className='fixed w-full z-10 bg-white mt-0'>
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-start py-2  shadow-md  ">
      <div className="logo ml-6">
        <Link
          className=" flex md:flex-col  items-center justify-center"
          href={"/"}
          passHref
        >
          <Image
            src="/logo.png"
            className=" mx-1"
            alt=""
            width={30}
            height={10}
          />
          <h1 className="p-2 font-semibold">ShopNow.com</h1>{" "}
        </Link>
      </div>

      <div className="nav m-auto">
        <ul className="flex  items-center space-x-6 font-bold md:text-xl ">
          <Link href={"/tshirts"} className="hover:text-gray-500">
            <li>Tshirts</li>
          </Link>
          <Link href={"/hoodies"} className="hover:text-gray-500">
            <li>Hoodies</li>
          </Link>
          <Link href={"/stickers"} className="hover:text-gray-500">
            <li>Stickers</li>
          </Link>
          <Link href={"/mugs"} className="hover:text-gray-500">
            <li>Mugs</li>
          </Link>
        </ul>
      </div>

      <div className=" flex cart cursor-pointer absolute right-0 top-2 mx-5 items-center justify-center">
        <span
          onMouseOver={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          {" "}
          {dropdown && (
            <div className="absolute right-8 bg-gray-200 shadow-lg top-7 rounded-md px-5 w-36">
              <ul>
                <Link href={"myaccount"}>
                  <li className=" hover:font-bold py-1 hover:text-gray-600 hover:underline text-sm">
                    My Account
                  </li>
                </Link>
                <Link href={"/orders"}>
                  <li className=" hover:font-bold py-1 hover:text-gray-600 hover:underline text-sm">
                    Orders
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className=" hover:font-bold py-1 hover:text-gray-600 hover:underline text-sm"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && <MdAccountCircle className=" text-3xl mx-2" />}
        </span>
        {!user.value && (
          <Link href={"/login"}>
            <button className=" flex  mr-2 text-white  py-2 bg-indigo-600 border-0 hover:bg-indigo-700 px-2  focus:outline-none rounded-md text-md">
              Login
            </button>
          </Link>
        )}
        <AiOutlineShoppingCart onClick={toggleCart} className=" text-3xl" />
      </div>

      {/* side cart */}
      <div
        ref={ref}
        className={` z-10 w-full md:w-80 h-[100vh] overflow-y-scroll sideCart absolute top-0 right-0 bg-gray-300 p-10 transition-opacity ${
          sideBar ? "opacity-100 visible" : "opacity-0 invisible"
        } `}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-2xl"
        >
          <AiFillCloseCircle />
        </span>
        <ol className=" list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className=" my-4 semi-bold font-normal">
              Your Cart is Empty
            </div>
          )}
          {Object.keys(cart).map((k) => (
            <div key={k} className="border-blue-600 rounded-md border-2 my-2 pl-2">
              <div className="item flex my-3">
                <div className=" w-2/3 font-semibold">
                  {cart[k].name}({cart[k].size}/{cart[k].variant}){" "}
                </div>
                <div className=" mx-2 font-semibold flex items-center justify-center w-1/3 md:text-sm">
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
            </div>
          ))}
        </ol>
        <div className="font-bold my-3">Sub Total : {subTotal}</div>

        <div className="flex  ">
          <Link href={"/checkout"}>
            <button className="flex  mr-2 text-white  py-2 bg-indigo-600 border-0 hover:bg-indigo-700 px-2  focus:outline-none rounded-md text-md">
              <BsFillBagFill className="m-1" />
              CheckOut
            </button>
          </Link>

          <button
            onClick={clearCart}
            className="flex mr-2  text-white py-2 bg-indigo-600 hover:bg-indigo-700 px-2  focus:outline-none rounded-md text-md"
          >
            <BsFillBagFill className="m-1" />
            ClearCart
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Navbar;
