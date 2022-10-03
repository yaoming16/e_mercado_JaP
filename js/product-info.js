const prod_title = document.querySelector("#prod-title");
const prod_info = document.querySelectorAll(".info-p");
const prod_img = document.querySelector("#img-div");
const comments = document.querySelector("#comments");
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

// function to add info 
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

    contentToAppendProd_images += `
        <div class="carousel-item active">
            <img class="d-block w-100" src="${data.images[0]}" >
        </div>
        ` 
        contentToAppendProd_li += `
    <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" ></button>
    `

    for (let i = 1; i <= data.images.length - 1; i++) {
        contentToAppendProd_images += `
        <div class="carousel-item ">
            <img class="d-block w-100" src="${data.images[i]}" >
        </div>
        ` 
        contentToAppendProd_li += `
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="${i}"  aria-current="true" ></button>
        `   
    }

    prod_img.innerHTML = contentToAppendProd_images;
    carouselProdImg.innerHTML = contentToAppendProd_li;

    // add related products.
    // class of h5 tag: d-none hiddes the label for small devices and d-md-block shows it again for medium devices
    contentToAppendRelProd_images += `
        <div class="carousel-item active cursor-active" onclick="setProdID(${data.relatedProducts[0].id})">
            <h5 class="rel-prod-name">${data.relatedProducts[0].name}</h5>
            <img src="${data.relatedProducts[0].image}" class="d-block w-100">
        </div>
        ` 
    contentToAppendRelProd_li += `
        <button type="button" data-bs-target="#carousel-relatedprod" data-bs-slide-to="0" class="active" aria-current="true" ></button>
    `

    for (let i = 1; i <= data.relatedProducts.length - 1; i++) {
        contentToAppendRelProd_images += `
        <div class="carousel-item cursor-active"  onclick="setProdID(${data.relatedProducts[i].id})">
            <h5 class="rel-prod-name">${data.relatedProducts[i].name}</h5>
            <img src="${data.relatedProducts[i].image}" class="d-block w-100">   
        </div>
        ` 
        contentToAppendRelProd_li += `
        <button type="button" data-bs-target="#carousel-relatedprod" data-bs-slide-to="${i}" ></button>
        `   
    }

    carouselRelatedProd_img.innerHTML = contentToAppendRelProd_images;
    carouselRelatedProd_li.innerHTML = contentToAppendRelProd_li;

}

// Add stars function
function addStars(score) {
    stars = "";
    for (let i = 1; i <= score; i++ ) {
        stars += `
        <span class="fa fa-star checked"></span>
        `         
    }
    for (let j = score + 1; j <= 5; j++ ) {
        stars += `
        <span class="fa fa-star"></span>
        `         
    }
    return stars;
}

// Add comments function 
function addComments(data) {
    contentToAppend = "";

    for (i of data) {
        
        contentToAppend += `
        <div class="card text-bg-primary mb-3">
            <div class="card-header">${i.user} ${i.dateTime}</div>
            <div class="card-body">
                <h5 class="card-title">${addStars(i.score)}</h5>
                <p class="card-text">${i.description}</p>
            </div>
        </div>
        `
    }

    comments.innerHTML = contentToAppend;

}

// load prod info on the page
document.addEventListener("DOMContentLoaded", async function() {
    let prodData = await jsonData(prod_url);
    if (prodData.status === "ok") {
        prodInfo = prodData.data ;
        addInfo(prodInfo);
    }

    let commentData = await jsonData(prod_comment_url);
    if (commentData.status === "ok") {
        commentInfo = commentData.data ;
        addComments(commentInfo);
    }

    // add new comment
    submit.addEventListener("click", function(){
        if (text_area.value.trim() !== "") {
            let date = new Date();
            let currentDay = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
            let currentTime =  date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
            let comentToAdd = {
                product: localStorage.getItem("prodID"),
                score: parseInt(score.value),
                description: text_area.value,
                user: localStorage.getItem("emailUsusario"),
                dateTime: currentDay + " " + currentTime
            }
        text_area.value = "";
        score.value = "";
        
        commentInfo.unshift(comentToAdd);
        addComments(commentInfo);
        console.log(comentToAdd.score);
        } 
        
    })

    //add to cart and buy buttons

    const cartBtn = document.querySelector("#cart");
    const buyBtn = document.querySelector("#buy");

    cartBtn.addEventListener("click", ()=> {
        let cart = [];
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        // find if item is already on the cart
        for (let element of cart) {
            if(element[0] === prodInfo.id) {
                element[1] += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
            }

            else {
                let toSave = [prodInfo.id, 1]
                cart.push(toSave);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
        
    })

    buyBtn.addEventListener("click", ()=> {
        let cart = [];
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        for (let element of cart) {
            if(element[0] === prodInfo.id) {
                element[1] += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                window.location = "cart.html";
            }

            else {
                let toSave = [prodInfo.id, 1]
                cart.push(toSave);
                localStorage.setItem("cart", JSON.stringify(cart));
                window.location = "cart.html";
            }
        }
        
    })

})





