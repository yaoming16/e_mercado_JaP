const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
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

// User email
window.addEventListener("load", function() {
  if (localStorage.getItem("emailUsusario")){
      let email_location  = document.getElementsByClassName("user-email");
      email_location[0].innerHTML = localStorage.getItem('emailUsusario');
  } else {
      window.location.href = "login.html";
  }
}) 