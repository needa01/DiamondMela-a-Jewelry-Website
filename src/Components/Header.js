import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-black.png";
import "../css/style.css";
// import '@fortawesome/fontawesome-free/css/all.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  return (
    <div className="max-w-screen ">
      <div
        className="flex header__3 fixed ruby-container items-center justify-between"
        id="header-area"
      >
        <div className="pl-14">
          <Link to={"/Category"}>
            <img src={logo} alt="" />
          </Link>
        </div>

        <div>
          <nav id="">
            <div className="flex gap-10">
              <div className="flex items-center gap-1">
                <div className="flex font-bold text-[14px] leading-3">HOME</div>
                {/* <FontAwesomeIcon icon={faChevronDown} height="10px" width="10px"/> */}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex font-bold text-[14px] leading-3">EARRINGS </div>
                {/* <FontAwesomeIcon icon={faChevronDown} height="10px" width="10px"/> */}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex font-bold text-[14px] leading-3">PENDANTS </div>
                {/* <FontAwesomeIcon icon={faChevronDown} height="10px" width="10px"/> */}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex font-bold text-[14px] leading-3">RINGS</div>
                {/* <FontAwesomeIcon icon={faChevronDown} height="10px" width="10px"/> */}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex font-bold text-[14px] leading-3">NOSEPIN</div>
                {/* <FontAwesomeIcon icon={faChevronDown} height="10px" width="10px"/> */}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex font-bold text-[14px] leading-3">BANGLES</div>
                {/* <FontAwesomeIcon icon={faChevronDown} height="10px" width="10px"/> */}
              </div>
            </div>
          </nav>
        </div>

        
        <div className="pr-14">Search bar</div>
      </div>
    </div>
  );
};
export default Header;
