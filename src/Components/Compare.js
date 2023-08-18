import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import CompareCard from "./CompareCard";
import "../css/style.css";
import { useNavigate } from "react-router-dom";
import {getCompareProducts} from "../config/compare";
import { setCompareProducts } from "../config/compare";

const Compare = () => {
  const nav = useNavigate();
  var compareData = [];
  var emptylist = false;
  const [compareProd, setCompareProd] = useState([]);
 var list=[];
  
  function goback() {
    nav(-1);
  }
  console.log("comp", compareProd);
  

  if (compareProd.length === 0) {
  // localStorage.setItem("compareproductID", JSON.stringify(compareProd));

    emptylist = true;
  }
  useEffect(() => {
    compareData = getCompareProducts();
    console.log("to be emptied", compareData);
    setCompareProd(compareData);
  }, [compareProd.length]);

  return emptylist ? (
    <div className="grid grid-cols-3 gap-5 justify-center items-center h-screen w-screen bg-white">
      <div>No Products found</div>
      <button className="bg-[#f1f3f6] border" onClick={goback}>
        Go Back
      </button>
    </div>
  ) : (
    <div className="flex gap-2 w-full h-full px-20 pt-20 bg-white">
      <div className="flex flex-col justify-between pb-4 pr-4 pt-6">
        <div className="flex flex-col pt-4 px-2 gap-3">
          <div className="font-semibold c1">
            <div className="">
              Compare
              {compareProd.length === 2 ? (
                <div className="flex flex-wrap">
                  
                  {compareProd.map((prod, index) => (
                    <React.Fragment key={prod.sku}>
                      <span> {prod.sku} </span> 
                      {index !== 2 && (
                        <span className=" px-2"> vs </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div>
                 
                  {compareProd[0]?.sku}
                  vs Others
                </div>
              )}
            </div>
          </div>
          <div className=" w-full flex gap-1 justify-center length">
            <div> {compareProd.length} </div> <div> items </div>
          </div>
        </div>
        <div className="py-4 pt-2 flex flex-col gap-7 mx-auto w-fit items-start font-semibold length">
          <div> Metal Quality </div> 
          
          <div> Color </div> 
          <div> Stone Quality </div>
          <div className="whitespace-nowrap">Diamond pieces</div>
          <div> Diamond Shape</div>
          {/* <div> Carat Rate </div> */}
        </div>
      </div>
      {compareProd.map((productid) => (
        <CompareCard
          // emptylist={emptylist}
          key={productid}
          productid={productid}
          list={list}
          compareProd={compareProd}
          setcompareProd={setCompareProd}
        />
      ))}{" "}
    </div>
  );
};
export default Compare;
