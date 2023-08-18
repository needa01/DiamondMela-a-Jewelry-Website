"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filteroptionapi = exports.singleproductapi = exports.prodbyCatapi = exports.catapi = void 0;
var catapi = "http://203.112.156.61/dmlsoftwaretest/public/api/getallcategorys";
exports.catapi = catapi;
var prodbyCatapi = "http://203.112.156.61/dmlsoftwaretest/public/api/getallproductbycategorywebrtsForCatalog";
exports.prodbyCatapi = prodbyCatapi;
var singleproductapi = "http://203.112.156.61/dmlsoftwaretest/public/api/getproductdetails";
exports.singleproductapi = singleproductapi;
var filteroptionapi = "http://203.112.156.61/dmlsoftwaretest/public/api/getreadytoshipfilteroptionForCatalog";
exports.filteroptionapi = filteroptionapi;