const menubarLeftBtn = document.querySelector(".menubar-left__Btn");
const menubarLeftWrapper = document.querySelector(".menubar-left__wrapper");

const handleMenubar = () => {
  menubarLeftWrapper.classList.toggle("menubar-left__wide");
};

menubarLeftBtn.addEventListener("click", handleMenubar);
