const menubarLeftBtn = document.querySelector(".menubar-left__Btn");
const menubarLeftWrapper = document.querySelector(".menubar-left__wrapper");
const menubarLeftIcon = document.querySelectorAll(".icon");

const handleMenubar = () => {
  menubarLeftWrapper.classList.toggle("menubar-left__wide");
  menubarLeftIcon.forEach((x) => x.classList.toggle("icon__wide"));
};

menubarLeftBtn.addEventListener("click", handleMenubar);
