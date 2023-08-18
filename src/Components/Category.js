import React, { useEffect, useState } from "react";
import { catapi } from "../Data/DATA";
import CategoryCard from "./CategoryCard";
import "../css/style.css";
// import { useNavigate } from "react-router-dom";
// import titleline from "../assets/img/title-line.png"
// import { useLocation } from "react-router-dom";

const Category = () => {
  const [categorys, setCategorys] = useState([]);
  
//   const path = useLocation();
  async function fetchcatdata() {
    try {
      const response = await fetch(catapi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",

          // 'Access-Control-Allow-Methods': 'POST',
          // 'Access-Control-Allow-Headers': 'Content-Type, Authorization'

          // Add any additional headers if required
        },
      });
      const obj = await response.json();
      setCategorys(obj.data);
    } catch (error) {
      //   toast.error("problem");
    }
  }
  useEffect(() => {
    fetchcatdata();
  }, []);

  function getCategory() {
    const allCategorys = [];
    Object.values(categorys).forEach((category) => {
      allCategorys.push(category);
    });
    console.log(allCategorys);
    return allCategorys;
  }
  
  return (
    <div className="px-14 mx-auto pt-20">

      <div className="category-title">
        <h2 className="categories">Categories</h2>
        <p className="font-droid text-red">Trending stunning Unique</p>
      </div>
    
      <div className="grid grid-cols-3 gap-6 pt-2 mt-14">
      {getCategory().map((categoryData) => (
        <CategoryCard key={categoryData.entity_id} categoryData={categoryData} />
      ))}
    </div>
    </div>
    
  );
};
export default Category;
