import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { prodbyCatapi } from "../Data/DATA";
import CatalogueCards from "./CatalogueCards";
import "../css/style.css";
import { getCompareProducts } from "../config/compare";

import Filter from "./Filter";
import useQueryHandler from "../hooks/query";
// import {useNavigate} from 'react-router-dom';
// import { useMemo } from "react";

const Catalogue = () => {
  const navigate = useNavigate();
  // const path = useLocation();
  const params = new URLSearchParams(window.location.search);

  const [isforceUpdate, setisforceUpdate] = useState(false);
  const [id, setid] = useState("");
  const [catalogue, setcatalogue] = useState([]);
  const [loading, setloading] = useState(true);
  const [length, setlength] = useState();
  const [filter, setfilter] = useState({
    price: "",
    gold_purity: "",
    gold_weight: "",
    diamond_quality: "",
    diamond_shape: "",
    diamond_type: "",
    diamond_weight: "",
  });
  console.log("at top", filter);

  // const history = useHistory();

  const [price, setprice] = useState("");
  const [compareBtn, setcompareBtn] = useState(false);
  const [temp, settemp] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    var tem = params.get("id");
    setid(tem);
  }, []);
  console.log(id);



  useEffect(() => {
    
    const searchParams=new URLSearchParams(window.location.search);
    const paramNames = searchParams.keys();

    
    for (let key in filter) {
      // Set the value of each property using setFilter() or any desired logic
      const temp= searchParams.get(key);
      console.log("temp",temp)
      for (const paramName of paramNames) {
        if(key===paramName){
        console.log("param",paramName);

          filter[key]=temp;
          break;
        }
      }
      ;
      
    }
    console.log("srch",filter);
  },[params]);


  useEffect(() => {
    if (id !== "") {
      fetchDatabyCat();
    }
    setisforceUpdate(!isforceUpdate);
  }, [id,filter]);

 
  console.log("catalogue", id);

  async function fetchDatabyCat() {
    console.log("inside fn", filter);

    let payload = {
      category_id: id,
      subcategory_id: "",
      subcategories: "",
      price: filter.price,
      gold_purity: filter.gold_purity,
      diamond_quality: filter.gold_quality,
      diamond_shape: filter.diamond_shape,
      diamond_type: filter.diamond_type,
      sku_certificate: "",
      metalweight_start: "",
      metalweight_to: "",
      diamondweight_start: "0",
      diamondweight_to: filter.diamond_weight,
      search: "",
      sort_by: "",
      customer_id: "",
      limit: "23",
      page: "1",
    };
    try {
      setloading(true);
      const response = await fetch(prodbyCatapi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",

          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify(payload),
      });
      const obj = await response.json();
      
      setcatalogue(obj.data);
      setloading(false);
    } catch (error) {
      console.log("Error");
    }
  }

  const handlefilter = (filter, id) => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log("inside filter handler", id);
    // console.log("query", queryParams.toString());

    // queryParams.delete("id");
    for (let key in filter) {
      // console.log("key", typeof(key));
      queryParams.delete(key);
    }

    const newSearch = queryParams.toString();
    const newUrl = `${window.location.pathname}${
      newSearch ? `?${newSearch}` : ""
    }`;

    navigate(newUrl, {
      replace: true,
    });

    // Adding the filter to the URL
    const currentSearch = window.location.search;
    const separator = currentSearch.length > 0 ? "&" : "?";
    const newPathname = "";
    let newFilterUrl = `${newPathname}${currentSearch}`;
    console.log("sep", separator);
    for (let prop in filter) {
      if (filter[prop] !== "") {
        newFilterUrl += `&${prop}=${filter[prop]}`;
      }
    }

    // console.log(newFilterUrl);

    navigate(newFilterUrl);

  };
  useEffect(() => {
    handlefilter(filter, id);
  }, [filter]);

  // useEffect(()=>{
  //   que
  // })
  function getDatabyCategory() {
    const allProducts = [];
    Object.values(catalogue).forEach((product) => {
      allProducts.push(product);
    });

    return allProducts;
  }
  function clickhandler() {
    nav(-1);
  }

  useEffect(() => {
    console.log("list", length);
    if (length > 0) {
      console.log("here if");
      setcompareBtn(true);
    } else {
      console.log("here else");
      setcompareBtn(false);
    }
  }, [length]);
  // console.log("list in catalogue",list.length);
  console.log("OBJ",catalogue);
  return loading ? (
    <div className="">
      <label
        className={`flex justify-center items-center h-screen w-screen cursor-progress`}
      >
        data is loading. Please wait
      </label>
    </div>
  ) : (
    <div className="px-20 mx-auto">
      <div className="pagetitle-holder mt-[81px] text-center relative  row flex flex-col gap-1">
        <div className="text-white text-[3rem] pagetitle">SHOP</div>
        <ul className="flex gap-9 justify-center w-full text-white breadcrumb font-droid">
          <li className="relative cursor-pointer">
            <p onClick={clickhandler}>Home</p>
          </li>
          <li className="relative">
            <p className="active">Categorys</p>
          </li>
        </ul>
      </div>
      <Filter
        filter={filter}
        setfilter={setfilter}
        fetchDatabyCat={fetchDatabyCat}
        temp={temp}
        settemp={settemp}
      />
      <div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6 pt-16 ">
        {getDatabyCategory().map((dataProducts) => (
          <CatalogueCards
            key={dataProducts.id}
            dataProducts={dataProducts}
            setlength={setlength}
            setcompareBtn={setcompareBtn}
          />
        ))}
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
export default Catalogue;
