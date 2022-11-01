const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

const cart_Icon = document.querySelector("#cart-icon");

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

// function to return an array with the date of each product 
async function jsonData(url) {
  const result = {};
  try {
    const response = await fetch(url);
    if (response.ok) {
      result.data = await response.json();
      result.status = "ok";
    } else {
      throw Error(response.statusText);
    }
  }
  catch (error) {
    result.status = 'error';
    result.data = error;
  }
  return result;
}

// redirect user

function redirect(url) {
  window.location.href = url;
}

// set product id 

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}


// cart set localStorage with item from server

const cart_url = CART_INFO_URL + "25801.json";

async function setLocalCart() {
  if (!localStorage.getItem("cart")) {
    let cart = {};
    let response = await jsonData(cart_url);
    if (response.status === "ok") {
      cart = response.data;
    }

    let cartToSave = [];
    for (let prod of cart.articles) {
      cartToSave.push([prod.id, prod.count])
    }

    changeCartIcon(cartToSave);
    localStorage.setItem("cart", JSON.stringify(cartToSave));

  }
}

// function to change value of the cart icon. As argument gets the an array with the items. 
function changeCartIcon(array) {
  let amountProd = 0;
  for (element of array) {
    amountProd += element[1];
  }
  cart_Icon.setAttribute("value", amountProd);
}

// function so inputs don't accept negative numbers
function noNegativeNumberInput(input) {
  input.value = Math.abs(input.value);
}

// round two decimals function
function roundTwoDecimals(valueToRound) {
  return Math.round(valueToRound * 100) / 100;
}

//function to create an object with the info of the user and save it on local storage

function saveUserData(info) {
  let userData = {
    firstName: info[0],
    secondName: info[1],
    firstSurname: info[2],
    secondSurname: info[3],
    email: info[4],
    telephone: info[5]
  }
  localStorage.setItem('userData',JSON.stringify(userData));
}


if (!document.URL.includes("login.html")) {

  // Set User email when page is loaded
  if(localStorage.getItem('userData')) {
    window.addEventListener("load", function () {
      let email_location = document.getElementById("user-email");
      email_location.innerHTML = JSON.parse(localStorage.getItem('userData')).email;
  
    })

    setLocalCart();
    changeCartIcon(JSON.parse(localStorage.getItem("cart")));
    
  } else {
    redirect("login.html");
  }
  
} 






