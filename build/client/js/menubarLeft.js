"use strict";

var menubarLeftBtn = document.querySelector(".menubar-left__Btn");
var menubarLeftWrapper = document.querySelector(".menubar-left__wrapper");
var menubarLeftIcon = document.querySelectorAll(".icon");

var handleMenubar = function handleMenubar() {
  menubarLeftWrapper.classList.toggle("menubar-left__wide");
  menubarLeftIcon.forEach(function (x) {
    return x.classList.toggle("icon__wide");
  });
};

menubarLeftBtn.addEventListener("click", handleMenubar);