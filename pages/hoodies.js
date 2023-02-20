import Link from 'next/link'
import React from 'react'
import Product from "@/models/Products";
import mongoose from "mongoose";


const Hoodies = ({ products }) => {
  // console.log(products)
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center">
          {Object.keys(products).length === 0 && <p>Sorry all the hoodies are currently out of stock.</p>}
          {Object.keys(products).map((item) => (

            <Link key={products[item]._id} href={`/product/${products[item].slug}`} passHref legacyBehavior>
              <div className="lg:w-1/5 md:w-1/2 p-4 w-full 
           shadow-lg cursor-pointer m-5">
                <a className="block relative  rounded overflow-hidden">
                  <img alt="ecommerce" className=" h-[30vh] md:h-[36vh] m-auto " src={products[item].img} />
                </a>
                <div className=" text-center mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className=' mt-1'>
                    {products[item].size.includes('S') && <span className=' border px-1 mx-1 border-gray-500'>S</span>}
                    {products[item].size.includes('M') && <span className=' border px-1 mx-1 border-gray-500'>M</span>}
                    {products[item].size.includes('L') && <span className=' border px-1 mx-1 border-gray-500'>L</span>}
                    {products[item].size.includes('XL') && <span className=' border px-1 mx-1 border-gray-500'>XL</span>}
                    {products[item].size.includes('XXL') && <span className=' border px-1 mx-1 border-gray-500'>XXL</span>}

                  </div>
                  <div className=' mt-1'>
                    {products[item].color.includes('red') && <button className=' border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6  focus:outline-none'></button>}
                    {products[item].color.includes('blue') && <button className=' border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6  focus:outline-none'></button>}
                    {products[item].color.includes('green') && <button className=' border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6  focus:outline-none'></button>}
                    {products[item].color.includes('black') && <button className=' border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6  focus:outline-none'></button>}
                  </div>
                </div>
              </div>

            </Link>

          ))}


        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  // mongoose.set("strictQuery", false);
  if (!mongoose.connections[0].readyState) {
    
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'hoodies' })
  let hoodies = {}
  for (let item of products) {
    if (item.title in hoodies) {
      if (!hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoodies[item.title].color.push(item.color)
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodies[item.title].size.push(item.size)
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color]
        hoodies[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(hoodies)) } // will be passed to the page component as props
  }


}

export default Hoodies