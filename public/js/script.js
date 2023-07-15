document.addEventListener("DOMContentLoaded", () => {
  console.log("budbudgeting JS imported successfully!");
});

const mainUl = document.querySelector("#main-ul");
const hamburgerIconElement = document.querySelector(".hamburger-icon");
const searchBarElement = document.querySelector(".search-bar");
const dateInputElement = document.querySelector("#inp-search-date");
const specificBalanceElement = document.querySelector(".specific-balance-container");





const showTheSearchBar = () => {
  if(searchBarElement.style.display === "none" || searchBarElement.style.display === "") {
    searchBarElement.style.display = "flex";
  } else {searchBarElement.style.display = "none";}
};

const showTheSpecificBalance = (e) => {
  e.preventDefault() 

  if(dateInputElement.value) {
    specificBalanceElement.style.display = "flex";
    console.log("success")
  } else { specificBalanceElement.style.display = "none";}
};



const handleHamburgerClick = () => {
  if (window.innerWidth < 700) {
    if (mainUl.style.display === "block") {
      mainUl.style.display = "";
    } else {
      mainUl.style.display = "block";
    }
  }
};

hamburgerIconElement.addEventListener("click", handleHamburgerClick);

// Add event listener to all menu items to hide the mainUl when clicked
const menuItems = document.querySelectorAll("#main-ul li a ul");
menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    if (window.innerWidth < 700) {
      mainUl.style.display = ""; // Hide the mainUl
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 700) {
    mainUl.style.display = ""; // Restores the default display property
  }
});
