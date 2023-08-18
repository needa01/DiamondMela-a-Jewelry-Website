import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"

const CategoryCard = ({ categoryData }) => {
  const text = categoryData.name.toLowerCase();
  const link = text.charAt(0).toUpperCase() + text.slice(1);
  //   const [id, setid] = useState("");
//   const history = useLocation();
  function clickhandler() {
    // setid(categoryData.entity_id);
    localStorage.setItem("id",categoryData.entity_id);
    // console.log("called her", categoryData.entity_id);
    // history.push("/products/" + categoryData.entity_id);
  }

  // console.log(component);
  // console.log(link);

  return (
    <div className="rounded-sm border">
      <Link
        to={"/products?id=" + categoryData.entity_id}
        onClick={clickhandler}
        className="flex flex-col  rounded-sm hover:border-slate-50 bg-[rgb(242,245,241)] transition-all duration-200 group relative"
      >
        <div className="image-container relative group hover:scale-90 duration-200  flex items-start pb-6">
          <img
          src={categoryData.category_img}
          alt={categoryData.name} 
         
          className="top-0 flex items-start px-6 mx-auto scale-100 mb-3"
        />
        
          <div className="absolute bg-red scale-0 z-20 w-full h-full divCard">          </div>
          <div className="absolute bottom-0 left-[calc(50%)] translate-x-[-50%] -mb-2 decoration-none group-hover:font-semibold transition-all duration-200 p-4 categoryname">{link}</div>
        
        </div>
        
        
        
      </Link>
    </div>
  );
};
export default CategoryCard;
