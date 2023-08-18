import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { singleproductapi } from "../Data/DATA";
import { useNavigate } from "react-router-dom";
import {
  getCompareProducts,
  removeCompareProducts,
  setCompareProducts,
} from "../config/compare";
// import CatalogueCards from './CatalogueCards';
var compareData = [];
// var compareBtn;

const SingleProduct = () => {
  const [compareBtn, setcompareBtn] = useState(false);
  const path = useLocation();
  const params = new URLSearchParams(path.search);
  const [isforceUpdate, setisforceUpdate] = useState(false);
  const [productid, setproductid] = useState("");
  const [singleproduct, setsingleproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const isInitialRender = useRef(true);
  const [isChecked, setisChecked] = useState(false);

  const [length, setlength] = useState(0);
  var list=[];
  var list_for_length = [];

  const [compareprod, setcompareprod] = useState([]);

  const nav = useNavigate();
  const payload = {
    product_id: productid,
    customer_id: "",
    metalcarat: "",
    metalqualitycolor: "",
    ringsize: "",
    stone_quality: "",
  };

  function clickhandler() {
    nav(-1);
  }
  function clickhandler2() {
    nav(-2);
  }
  useEffect(() => {
    // console.log(path.pathname);
    var tem = params.get("productID");
    setproductid(tem);
  }, []);

  async function fetchSingleProductData() {
    try {
      console.log("here", productid);
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

      list = getCompareProducts();
      if(list===null){
        list=[];
      }
      console.log("api ", list);
      if (list.includes(obj.proid)) {
        setisChecked(true);
      }

      setloading(false);
      console.log("singleproduct", obj);
    } catch (error) {
      console.log("Error in single products");
    }
  }

  useEffect(() => {
    if (productid !== "") fetchSingleProductData();
  }, [productid]);
  
  // useEffect(() => {
  //   function getData() {
  //     try {
  //       compareData = localStorage.getItem("compareproductID");
  //       compareData = JSON.parse(compareData);

  //       setcompareprod(compareData);
  //     } catch (error) {
  //       console.log("Error");
  //     }
  //   }
  //   getData();
  // }, []);

  // useEffect(() => {
  //   console.log("productid", singleproduct.proid);
  //   compareprod.forEach((element) => {
  //     console.log("element", element);
  //     if (element === singleproduct.proid) {
  //       setisChecked(true);
  //       // console.log("ischecked0",isChecked);
  //     }
  //   });
  //   setisforceUpdate(!isforceUpdate);
  //   console.log("ischecked", isChecked);
  // }, [singleproduct]);

  function checkboxHandler(e) {
    list = getCompareProducts();

    if (list.length < 3) {
      console.log("inside if ", list.length);
      if (e.target.checked) {
        setCompareProducts(singleproduct.proid);
      } else {
        removeCompareProducts(singleproduct.proid);
      }
    } else if (list.length === 3) {
      console.log("inside else ", list.length);
      if (e.target.checked === false) {
        console.log("inside else if ", list.length);
        removeCompareProducts(singleproduct.proid);
      } else {
        console.log("inside else else ", list.length);
        e.preventDefault();
        alert("Only 3 comparisons allowed!!!");
        // setisChecked(false);
        console.log("inside else else ", list.length);
      }
    } else {
      alert("Only 3 comparisons allowed!!!");
    }

    // compareData = getCompareProducts();
    // if (compareData.length > 0) {
    //   compareBtn = true;
    // } else {
    //   compareBtn = false;
    // }
    // setlength(list_for_length.length);
  }

  // useEffect(() => {
  //   console.log("to be emptied setting", compareprod);
  //   if (isChecked) {
  //     setcompareprod((prevCompareProductid) => {
  //       // Check if singleproduct.proid is already present in compareproductID
  //       if (!prevCompareProductid.includes(singleproduct.proid)) {
  //         return [...prevCompareProductid, singleproduct.proid];
  //       }
  //       return prevCompareProductid; // Return the original array if id is already present
  //     });

  //     // console.log("here in ", compareprod);
  //   } else {
  //     // Remove product data when unchecked

  //     setcompareprod((prevCompareProduct) =>
  //       prevCompareProduct.filter(
  //         (productID) => productID !== singleproduct.proid
  //       )
  //     );
  //   }
  //   console.log("compareprod gvvvv", compareprod);
  // }, [isChecked]);
  // console.log("compareprod gvvvv here", compareprod);

  // useEffect(() => {
  //   if (!isInitialRender.current) {
  //     if (compareprod.length !== 0) {
  //       console.log("compareprod", compareprod);
  //       localStorage.setItem("compareproductID", JSON.stringify(compareprod));
  //     }
  //   } else {
  //     isInitialRender.current = false;
  //   }
  // }, [compareprod]);
  // if (compareprod.length > 0) {
  //   compareBtn = true;
  // } else {
  //   compareBtn = false;
  // }
  useEffect(() => {
    
    list = getCompareProducts();
    console.log(list);
    if(list===null){
      list=[];
    }
    setlength(list.length);
  }, [isChecked]);
  useEffect(() => {
    console.log("length",length);
    if (length > 0) {
      setcompareBtn(true);
    } else {
      setcompareBtn(false);
    }
    // setisforceUpdate(!isforceUpdate);
  }, [length]);

  // console.log(typeof compareData);
  return loading ? (
    <label className="flex justify-center items-center h-screen">
      data is loading. Please wait
    </label>
  ) : (
    <div className="px-10 mx-auto">
      <div className="pagetitle-holder mt-[81px] text-center relative col-12 row">
        <ul className="flex gap-9 justify-center w-full text-white breadcrumb font-droid">
          <li className="relative cursor-pointer" onClick={clickhandler2}>
            <p>Home</p>
          </li>
          <li className="relative cursor-pointer" onClick={clickhandler}>
            <p>Categorys</p>
          </li>
          <li className="relative ">
            <p className="active">Products</p>
          </li>
        </ul>
      </div>
      <div className="flex mx-auto max-w-[1200px] gap-8 pt-16 pb-7">
        <img
          src={singleproduct.slider}
          className=" rounded-sm"
          alt=""
          height="500px"
          width="500px"
        />

        <div className="flex flex-col pt-4 items-start space-y-5  w-full">
          <div className="flex flex-col border-2 rounded-md w-full px-6">
            <div className="border-b-2 flex pt-4 font-semibold">OverView</div>
            <div className="flex gap-8 pt-3 pb-8">
              <div className="font-bold">SKU</div>
              <div>{singleproduct.product_details.product_sku}</div>
            </div>
          </div>

          <div className="flex flex-col border-2 rounded-md w-full px-6">
            <div className="border-b-2 flex pt-4 font-semibold">
              Metal Details
            </div>
            <div className="flex  justify-between gap-8 pt-3 pb-8">
              <div className="flex flex-col gap-4">
                <div className="font-bold flex">Purity</div>
                <div>{singleproduct.rts_slider[0].metal_quality_value}</div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-bold flex">Weight(Approx.)</div>
                <div className="flex">
                  {singleproduct.rts_slider[0].diamond_weight}gms
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-bold flex">Estimated Total</div>
                <div className="flex">
                  ₹ {singleproduct.product_details.price}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-2 rounded-md w-full px-6">
            <div className="border-b-2 flex pt-4 font-semibold">
              Diamond Details
            </div>
            <div className="flex  justify-between pt-3 pb-8">
              <div className="flex flex-col gap-4">
                <div className="font-bold flex">Shape</div>
                <div>{singleproduct.rts_slider[0].metal_quality_value}</div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-bold flex">Quality</div>
                <div className="flex">
                  {singleproduct.rts_slider[0].diamond_weight}gms
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-bold flex">Pieces</div>
                <div className="flex">
                  ₹ {singleproduct.product_details.price}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-bold flex">Total Weight</div>
                <div>{singleproduct.rts_slider[0].metal_quality_value}</div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-bold flex">Estimated Total</div>
                <div>{singleproduct.rts_slider[0].metal_quality_value}</div>
              </div>
            </div>
          </div>
          <div className=" w-full h-full flex justify-center pl-4">
            <div className=" text-white flex justify-between w-full h-full items-center z-40 ">
              <button className="rounded-sm bg-[#7f0d48] px-3 py-1">
                Add to Cart
              </button>
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  checked={isChecked}
                  value={`${productid}`}
                  onChange={checkboxHandler}
                  onClick={() => setisChecked(!isChecked)}
                />
                <label htmlFor="myCheckbox" className="text-black">
                  Add to Compare
                </label>
              </div>
            </div>
          </div>

          {/* <div className=''>Product category:{singleproduct.product_category_type}</div>
      <div>diamond_weight:{singleproduct.rts_slider[0]?.diamond_weight}</div> */}
        </div>
      </div>
      <div className="pb-6">
        <Link to={"/compare"}>
          <button
            className={`compareButton ${
              compareBtn ? "activeFixed" : ""
            } flex gap-3`}
          >
            Compare
            <div className="bg-[rgb(16,94,117)] px-[6px] rounded-sm">
              {length}
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default SingleProduct;
