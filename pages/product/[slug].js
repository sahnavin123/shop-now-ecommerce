import React from "react";
import { useRouter } from "next/router";
import Product from "@/models/Products";
import mongoose from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";

const Slug = ({ error, buyNow, addToCart, product, variants }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = React.useState();
  const [service, setService] = React.useState();

  const [color, setColor] = React.useState(product.color);
  const [size, setSize] = React.useState(product.size);

  React.useEffect(() => {
    if (!error) {
      setColor(product.color);
      setSize(product.size);
    }
  }, [router.query]);

  const checkServiceAvailability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("Your Pincode is serviceable", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setService(false);
      toast.error("Sorry, Pincode is not serviceable", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChangePin = (event) => {
    setPin(event.target.value);
  };

  const refreshVariant = (newSize, newColor) => {
    // let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    // router.push(url);
    const productSlug = variants[newColor][newSize]?.slug;
    if (productSlug) {
      const url = `${window.location.origin}/product/${productSlug}`;
      router.push(url);
    }
  };

  if (error == 404) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Ecommerce
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.size}/{product.color}){" "}
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("white") &&
                    Object.keys(variants["white"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "white");
                        }}
                        className={` border-2 border-gray-300 bg-white rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-400"
                        }`}
                      ></button>
                    )}

                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "red");
                        }}
                        className={` border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-400"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "black");
                        }}
                        className={` border-2 border-gray-300 ml-1 bg-black  rounded-full w-6 h-6 focus:outline-none  ${
                          color === "black"
                            ? " border-red-400"
                            : "border-gray-400"
                        } `}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "blue");
                        }}
                        className={` border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none  ${
                          color === "blue" ? "border-black" : "border-gray-400"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">{size}</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => refreshVariant(e.target.value, color)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {color && Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {color && Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {color && Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {color &&
                        Object.keys(variants[color]).includes("XXL") && (
                          <option value={"XXL"}>XXL</option>
                        )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex ">
                {product.availableQty > 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{product.price}
                  </span>
                )}
                {product.availableQty <= 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Out of Stock !!
                  </span>
                )}
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-8 text-white disabled:bg-indigo-400 bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  disabled={product.availableQty <= 0 ? true : false}
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-4 text-white disabled:bg-indigo-400 bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add To Cart
                </button>
              </div>

              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  placeholder="enter your pin code"
                  onChange={onChangePin}
                  className="px-2 border-2 rounded-md border-gray-400"
                  type="text"
                />
                <button
                  onClick={checkServiceAvailability}
                  className=" flex ml-14 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Check Pin Code
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-700 text-sm mt-3">
                  sorry we donot deliver to this pincode
                </div>
              )}

              {service && service != null && (
                <div className="text-green-700 text-sm mt-3">
                  This pincode is serviceable
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });

  if (product == null) {
    return {
      props: { error: 404 },
    };
  }

  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {}; // {red : {xl:{slug : 'wear-the-code-xl'}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      error: error,
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Slug;
