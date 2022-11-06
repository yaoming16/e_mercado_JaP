const prod_title = document.querySelector("#prod-title");
const prod_info = document.querySelectorAll(".info-p");
const prod_img = document.querySelector("#img-div");
const comments_div = document.querySelector("#comments");
const text_area = document.querySelector("#text-area");
const score = document.querySelector("#score")
const submit = document.querySelector("#submit");
const carouselProdImg = document.querySelector("#carousel-li");
const carouselRelatedProd_li = document.querySelector("#related-prod-li");
const carouselRelatedProd_img = document.querySelector("#related-prod-img");
const alert_p = document.querySelector("#alert-p")


// url of the selected product
const prod_comment_url = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;
const prod_url = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;

// function to add the info of the selected product to the page
function addInfo(data) {
  contentToAppendProd_images = "";
  contentToAppendProd_li = "";
  contentToAppendRelProd_images = "";
  contentToAppendRelProd_li = "";

  prod_title.innerHTML = data.name;
  prod_info[0].innerHTML = data.description;
  prod_info[1].innerHTML = `${data.cost} ${data.currency}`;
  prod_info[2].innerHTML = data.category;
  prod_info[3].innerHTML = data.soldCount;

  //carousel for the images of the selected product
  for (let i = 0; i < data.images.length; i++) {
    contentToAppendProd_images += `
    <div class="carousel-item prodIm-div-Carousel">
      <img class="d-block w-100" src="${data.images[i]}" >
    </div>
    `
    contentToAppendProd_li += `
    <button type="button" data-bs-target="#carousel" data-bs-slide-to="${i}"  aria-current="true" class="prodIm-button-Carousel"></button>
    `
  }

  prod_img.innerHTML = contentToAppendProd_images;
  carouselProdImg.innerHTML = contentToAppendProd_li;

  // we need to add the active class to the first image so the carousel works properly 
  document.getElementsByClassName("prodIm-div-Carousel")[0].classList.add("active");
  document.getElementsByClassName("prodIm-button-Carousel")[0].classList.add("active");

  //carousel for the images of the related products
  for (let i = 0; i < data.relatedProducts.length; i++) {
    contentToAppendRelProd_images += `
    <div class="carousel-item cursor-active relProdIm-div-Carousel"  onclick="setProdID(${data.relatedProducts[i].id})">
      <h5 class="rel-prod-name">${data.relatedProducts[i].name}</h5>
      <img src="${data.relatedProducts[i].image}" class="d-block w-100">   
    </div>
    `
    contentToAppendRelProd_li += `
    <button type="button" data-bs-target="#carousel-relatedprod" data-bs-slide-to="${i}" class="relProdIm-button-Carousel"></button>
    `
  }

  carouselRelatedProd_img.innerHTML = contentToAppendRelProd_images;
  carouselRelatedProd_li.innerHTML = contentToAppendRelProd_li;

  // we need to add the active class to the first image so the carousel works properly
  document.getElementsByClassName("relProdIm-div-Carousel")[0].classList.add("active");
  document.getElementsByClassName("relProdIm-button-Carousel")[0].classList.add("active");

}

// Function to add up to five starts. Used when a new comment is added
function addStars(score) {
  stars = "";
  for (let i = 1; i <= score; i++) {
    stars += `
    <span class="fa fa-star checked"></span>
    `
  }
  for (let j = score + 1; j <= 5; j++) {
    stars += `
    <span class="fa fa-star"></span>
    `
  }
  return stars;
}

// Function that receives an array with the information of the comments that are going to be added
function addComments(comments) {
  contentToAppend = "";

  for (let comment of comments) {

    contentToAppend += `
    <div class="card text-bg-primary mb-3">
      <div class="card-header">${comment.user} ${comment.dateTime}</div>
      <div class="card-body">
        <h5 class="card-title">${addStars(comment.score)}</h5>
        <p class="card-text">${comment.description}</p>
      </div>
    </div>
    `
  }

  comments_div.innerHTML = contentToAppend;

}

// load product info when the page is loaded.
document.addEventListener("DOMContentLoaded", async function () {
  let prodData = await jsonData(prod_url);
  if (prodData.status === "ok") {
    prodInfo = prodData.data;
    addInfo(prodInfo);
  }

  let commentData = await jsonData(prod_comment_url);
  if (commentData.status === "ok") {
    commentInfo = commentData.data;
    addComments(commentInfo);
  }

  // This event will save the information of the new submited comment in an object and add it to the array with the comments that came from the server. 
  submit.addEventListener("click", function () {
    if (text_area.value.trim() !== "") {
      let userData = JSON.parse(localStorage.getItem('userData'));
      let date = new Date();
      let currentDay = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      let currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let comentToAdd = {
        product: localStorage.getItem("prodID"),
        score: parseInt(score.value),
        description: text_area.value,
        user: userData.firstName.trim() !== "" ? userData.firstName : userData.email,
        dateTime: currentDay + " " + currentTime
      }
      text_area.value = "";
      score.value = "";

      commentInfo.unshift(comentToAdd);
      addComments(commentInfo);

      //if the text area is empty the user will get an animation as feedback 
    } else {
      animateCSS('#text-area', 'heartBeat');
    }

  })

})

//add to cart and buy buttons

function addProdToLocalStorage() {
  //we will get the cart info from the local storage and save it on cart (empty string)
  let cart = [];
  cart = JSON.parse(localStorage.getItem("cart"));

  //now we search the cart array to see if the item was already in the cart
  //we use the variable foundInTheCart to keep track if the current prod is in the cart already
  let foundInTheCart = false;
  for (let element of cart) {

    //if we find an element of the array that has the id of the prod on screen we add +1 to the amout of that product in the cart
    // foundInTheCart changes to true because the item is in the cart
    if (element[0] === prodInfo.id) {
      element[1] += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      foundInTheCart = true;
    }
  }

  // if the item was already in the cart, we won't need to add it again so this part won't execute. if it was't in the cart this adds an array containing the prod ID and the amount of prod tot the cart
  if (foundInTheCart === false) {
    let toSave = [prodInfo.id, 1]
    cart.push(toSave);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  changeCartIcon(cart);
}

function cartBtnFunction() {
  addProdToLocalStorage();
  new bootstrap.Toast(document.querySelector("#toast-div")).show();

};

function buyBtnFunction() {
  addProdToLocalStorage();
  window.location = "cart.html";

};




