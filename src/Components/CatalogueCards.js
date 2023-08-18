import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import SingleProduct from "./SingleProduct";
import "../css/style.css";
import {
  setCompareProducts,
  getCompareProducts,
  removeCompareProducts,
} from "../config/compare";
// import { list } from "postcss";
var list;
var list_for_length;
var i = 0;
var listforcheckbox=[];

const CatalogueCards = ({ dataProducts,  setlength }) => {
  console.log("dP",dataProducts);

  const [isChecked, setisChecked] = useState(false);
  // console.log("ytype",typeof(dataProducts.id));
  useEffect(() => {
    
    listforcheckbox=getCompareProducts();
    
    if(listforcheckbox!==null){
      if(listforcheckbox.includes(dataProducts.id)){
        setisChecked(true);
        // setcompareBtn(true);
        setlength(listforcheckbox.length);
      }
    }

  },[listforcheckbox]);

  // useEffect(() => {
  //   console.log(1);
  //   // if (isChecked) {
  //   //   setCompareProducts(dataProducts.id);
  //   // } else {
  //   // console.log(1,i++);

  //   //   // Remove product data when unchecked
  //   //   removeCompareProducts(dataProducts.id);
  //   // }
  //   // list=getCompareProducts();
  //   // console.log("comparepro", list.length);
  //   // setlength(list.length);
  // }, []);
  var amount;

  if (dataProducts.total_amount !== "")
    amount = <p>{dataProducts.custom_price}</p>;
  else {
    return;
  }

  function checkboxHandler(e) {
    list = getCompareProducts();
    if(list===null){
      list=[];
    }
    if (list.length < 3) {
      console.log("inside if ", list.length);
      if (e.target.checked) {
        setCompareProducts(dataProducts.id);
      } else {
        removeCompareProducts(dataProducts.id);
      }
    } 
    else if (list.length === 3) {
      console.log("inside else ", list.length);
      if (e.target.checked ===  false) {
        // console.log("inside else if ", list.length);
        removeCompareProducts(dataProducts.id);
      } 
      else {
        console.log("inside else else ", list.length);
        e.preventDefault();
        alert("Only 3 comparisons allowed!!!");
        // setisChecked(false);
        // console.log("inside else else ", list.length);
      }
    } 
    else {
      alert("Only 3 comparisons allowed!!!");
    }
    list_for_length=getCompareProducts();
    setlength(list_for_length.length);
    // setcompareBtn(()=>{
    //   return list_for_length.length>0?(true):(false)});
  }

  return (
    <div className="">
      <div className="flex flex-col bg-[rgb(242,245,241)]  border rounded-sm relative group-last:border  catalogueCard  scale-100 z-10 boxshadow">
        <div>
          <div className="divHover z-30"></div>
        </div>

        {/* at line 489 at style.css */}
        <div className="mx-auto">
          <div className="relative">
            <img
              src={dataProducts.product_image}
              className="border-4 border-black rounded-sm"
              alt=""
            />
            <div className="absolute bg-transparent btn-grp flex justify-center">
              <div className=" text-white flex justify-center h-full items-center z-40 gap-1">
                <Link to={"/product?productID=" + dataProducts.id} className="">
                  <button className="rounded-sm bg-[rgb(15,150,129)] px-3 py-1 btns">
                    View Detail
                  </button>
                </Link>

                <button className="rounded-sm bg-[#7f0d48] px-3 py-1 btns">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 px-3">
          <div className="pt-3 sku">{dataProducts.sku}</div>
          {/* <div>Color: {dataProducts.color}</div> */}

          <div className="flex gap-1 font-thin">
            <div>{dataProducts.metal_quality}</div>
            <div>|</div>
            <div>{dataProducts.rts_stone_quality}</div>
          </div>
          {/* <div>{dataProducts.weight}g</div> */}
          <div className="flex justify-between items-center w-full">
            <div className="flex text-lg  price gap-[5px]">
              <div>₹</div>
              <div>{amount}</div>
            </div>
            <div className="flex compareCheck gap-1 items-center">
              <input
                type="checkbox"
                id={`${dataProducts.id}`}
                checked={isChecked}
                value={`${dataProducts.id}`}
                onChange={checkboxHandler}
                onClick={() => setisChecked(!isChecked)}
              />
              <label htmlFor={`${dataProducts.id}`}>Add to Compare</label>
            </div>
          </div>

          {/* <div className='pb-5 pt-1 addButton '>
              <button className=' font-semibold btn rounded-full border-2 text-[12px] leading-3 py-2 px-4 border-[#929292]'>
             + ADD TO CART 
              </button>
            </div>  */}
        </div>
      </div>
    </div>
  );
};
export default CatalogueCards;
