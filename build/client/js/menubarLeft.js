"use strict";

var menubarLeftBtn = document.querySelector(".menubar-left__Btn");
var menubarLeftWrapper = document.querySelector(".menubar-left__wrapper");

var handleMenubar = function handleMenubar() {
  menubarLeftWrapper.classList.toggle("menubar-left__wide");
};

menubarLeftBtn.addEventListener("click", handleMenubar);