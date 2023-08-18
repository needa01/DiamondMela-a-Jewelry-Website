import React, { useEffect, useState } from "react";
import { filteroptionapi } from "../Data/DATA";
import FilterOption from "./FilterOption";
import { Link } from "react-router-dom";
// import SelectedFilters from "./SelectedFilters";

const Filter = ({ filter, setfilter, fetchDatabyCat, temp, settemp }) => {
  const [filteroptions, setfilteroptions] = useState([]);

  const [id, setid] = useState("");

  useEffect(() => {
    setid(() => {
      return localStorage.getItem("id");
    });
  }, [filter]);

  
  
  async function fetchfilteroption() {
    let payload = {
      category_id: id,
    };
    try {
      const response = await fetch(filteroptionapi, {
        method: "POST",

        body: JSON.stringify(payload),
      });
      const obj = await response.json();
      console.log(obj.data);
      setfilteroptions(obj.data);
    } catch (error) {
      console.log("error");
    }
  }
  
  useEffect(() => {
    if (id !== []) fetchfilteroption();
  }, [id]);
  // console.log("filter", filteroptions);

  // function removefilter(e) {
  //   setfilter((prev) => {
  //     prev.filter((pair) => {
  //       const val = Object.values(pair);
  //       console.log(val);
  //       return val !== e.target.value;
  //     });
  //   });
  // }

  return (
    <div className="bg-[#fff] pb-5">
      <div className="relative">
        <div className=" grid justify-center grid-wrap grid-cols-5 gap-x-5 gap-y-4 pt-4 px-4 pb-6 ">
          {filteroptions.map((filtercategory, index) => (
            <FilterOption
              key={index}
              filtercategory={filtercategory}
              filter={filter}
              setfilter={setfilter}
            />
          ))}
        </div>
        {/* <div className="absolute w-full left-0 bottom-0 pb-5 ">
          {/* <Link to={"/products?id=" + id + "&price=" +filter.price}>
            <button onClick={filterhandler}>
              <span role="img" aria-label="Search">
                🔍
              </span>
            </button>
          </Link> 
        </div> */}
      </div>
      {/* <div className=" w-[100vw] h-full px-5 ">
        {filter !== undefined && filter.length > 0 && (
          <div className="flex gap-x-6">
            {filter.map((pair, index) => (
              <SelectedFilters
                pair={pair}
                key={index}
                removefilter={removefilter}
              />
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};
export default Filter;
