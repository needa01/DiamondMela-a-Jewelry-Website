"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRouterDom = require("react-router-dom");

var useQueryHandler = function useQueryHandler(filter, id) {
  var navigate = (0, _reactRouterDom.useNavigate)();
  var queryParams = new URLSearchParams(window.location.search);
  console.log("query", queryParams.toString());
  queryParams["delete"]("id");

  for (var key in filter) {
    console.log("key", key);
    queryParams["delete"]({
      key: key
    });
  }

  var newSearch = queryParams.toString();
  var newUrl = "".concat(window.location.pathname).concat(newSearch ? "?".concat(newSearch) : "");
  navigate(newUrl, {
    replace: true
  }); // Adding the filter to the URL

  var currentSearch = window.location.search;
  var separator = currentSearch.length > 0 ? "&" : "?";
  var newPathname = "";
  var newFilterUrl = "".concat(newPathname).concat(currentSearch).concat(separator, "id=").concat(id);

  for (var prop in filter) {
    if (filter[prop] !== "") {
      newFilterUrl += "&".concat(prop, "=").concat(filter[prop]);
    }
  }

  navigate(newFilterUrl);
};

var _default = useQueryHandler;
exports["default"] = _default;