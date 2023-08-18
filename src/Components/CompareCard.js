import React, { useEffect, useState } from "react";
import numeral from "numeral";
import { singleproductapi } from "../Data/DATA";
import { getCompareProducts, removeCompareProducts } from "../config/compare";

const CompareCard = ({ productid, compareProd ,setcompareProd}) => {

  const payload = {
    product_id: productid,
    customer_id: "",
    metalcarat: "",
    metalqualitycolor: "",
    ringsize: "",
    stone_quality: "",
  };
  
  const [loading,setloading]=useState(true);
  const [singleproduct,setsingleproduct] =useState("");

  async function fetchSingleProductData() {
    try {
      // console.log("here", productid);
      const response = await fetch(singleproductapi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",

          "Access-Control-Allow-Methods": "POST",
          // 'Access-Control-Allow-Headers': 'Content-Type, Authorization'

          // Add any additional headers if required
        },
        body: JSON.stringify(payload),
      });
      const obj = await response.json();

      setsingleproduct(obj);
      setloading(false);
      console.log("singleproduct", obj);
    } catch (error) {
      console.log("Error in single products");
    }
  }

  useEffect(() => {
    if (productid !== "") fetchSingleProductData();
  }, [productid]);

  const num = `${productid.custom_price}`;
  const formattedprice = numeral(num).format("0,0.00");
  function removecompare() {
    removeCompareProducts(productid);
    setcompareProd(()=>{
      return getCompareProducts();
    })
    // setcompareProd((prevData)=>prevData.filter((prod)=>(prod!==productid)));
    // console.log("removing",compareProd);
    // localStorage.setItem("compareproductID", JSON.stringify(compareProd));
  }
  // localStorage.setItem("compareproductID", JSON.stringify(compareProd));
  
  console.log("removing here",compareProd);
  
  return loading?(
    <div className=" w-full h-full flex justify-center items-center">PLEASE WAIT</div>
  ):(
    <div className="flex flex-col justify-between gap-4">
      <div className="pb-4">
        <div className="">
          <div className="p-12 -mt-6 ">
            <div className="relative text-[rgb(163,160,160)] z-30 w-full h-full">
              <button
                className=" absolute bg-[rgb(235,229,229)] w-6 h-6 flex align-middle justify-center right-[8px] top-[8px] text-[1.75rem] rounded-full font-bold text-black cursor-pointer"
                onClick={removecompare}
              >
                <div className="mt-[-10px] mb-[-3px]">&times;</div>
              </button>
            </div>
            <div className="pt-2 pr-2 bg-black">
              <img src={singleproduct.slider} alt="abs" className="" />
            </div>
          </div>
          <div className=" pb-4">
            <div className=" text-lg ">{singleproduct.product_details.product_name}</div>
            <div className="flex justify-center gap-1 font-bold">
              <div>₹</div>
              <div>{singleproduct.product_details.price}</div>
            </div>
          </div>
        </div>

        <div className="py-4 flex flex-col gap-7 border-l-2 -mr-2 font-thin length">
          <div>{singleproduct.metaldetails.metal_quality}</div>

          <div>{singleproduct.metaldetails.color}</div>
          <div>{singleproduct.rts_slider[0].rts_stone_quality}</div>
          <div>{singleproduct?.diamondmainprice[0]?.pices}</div>
          <div>{singleproduct?.diamonddetails[0]?.shape}</div>
          {/* <div>₹{singleproduct?.diamonddetails[0]?.caratrate}</div> */}
        </div>
      </div>
    </div>
  );
};
export default CompareCard;
