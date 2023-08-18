import React, { useState } from "react";
import "../css/style.css";
// import Select from "react-select";

const FilterOption = ({ filtercategory, filter, setfilter }) => {
  var val = "";
  const filteroption = filtercategory.option_data;
  // console.log("xcvbnm",filtercategory);
  for (let key in filter) {
    if (key === filtercategory.option_name) {
      if (filter[key] !== "") {
        val = filter[key];
        console.log("VAL", val);
      }
      break;
    }
  }

  const handleFilter = (e) => {
    console.log("option cahnge", e.target.name, e.target.value);
    setfilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <>
      {filteroption !== undefined && filteroption.length > 0 ? (
        <div className="border rounded-sm w-full flex justify-center">
          <select
            name={filtercategory.option_name}
            id=""
            className="select multiselect text-[rgb(4,8,12)] flex  text-center w-full py-2 px-3 "
            value={val}
            onChange={handleFilter}
          >
            <option value="" className="" hidden>
              {filtercategory.label}
              &#9662;
            </option>
            {filteroption.map((option, index) => (
              <option key={index} value={option.value} className="text-[#000]">
                {option.label}
                {/* <span className="chevron-button" hidden>&#9662;</span> */}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </>
  );
};
export default FilterOption;
