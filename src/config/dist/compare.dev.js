"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompareProducts = getCompareProducts;
exports.setCompareProducts = setCompareProducts;
exports.removeCompareProducts = removeCompareProducts;
var localstorage_name = 'compareproductID';

function getCompareProducts() {
  return JSON.parse(localStorage.getItem(localstorage_name));
}

function setCompareProducts(id) {
  var list = getCompareProducts();

  if (list === undefined || list === null) {
    list = [];
  }

  list.push(id);
  localStorage.setItem(localstorage_name, JSON.stringify(list));
}

function removeCompareProducts(id) {
  var list = [];
  list = getCompareProducts();
  if (list === undefined || list === null) list = [];

  if (list.includes(id)) {
    list = list.filter(function (element) {
      return element !== id;
    });
  }

  localStorage.setItem(localstorage_name, JSON.stringify(list));
}