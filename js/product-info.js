const prod_title = document.querySelector("#prod-title");
const prod_info = document.querySelectorAll(".info-p");
const prod_img = document.querySelector("#img-div");
const comments = document.querySelector("#comments");
const text_area = document.querySelector("#text-area");
const score = document.querySelector("#score")
const submit = document.querySelector("#submit");


// User email
window.addEventListener("load", function() {
    if (localStorage.getItem("emailUsusario")){
        let email_location  = document.getElementsByClassName("user-email");
        email_location[0].innerHTML = localStorage.getItem('emailUsusario');
    } else {
        window.location.href = "login.html";
    }
 }) 


// url of the selected product
const prod_comment_url = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;
const prod_url = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;

// function to add info 
function addInfo(data) {
    contentToAppend = "";

    prod_title.innerHTML = data.name;
    prod_info[0].innerHTML = data.description;
    prod_info[1].innerHTML = `${data.cost} ${data.currency}`;
    prod_info[2].innerHTML = data.category;
    prod_info[3].innerHTML = data.soldCount;

    for (let i of data.images) {
        contentToAppend += `
        <div>
            <img src=" `+ i +`">
        </div>
        ` 
    }

    prod_img.innerHTML = contentToAppend;
}

// Add stars function
function addStars(score) {
    stars = "";
    for (let i = 1; i <= score; i++ ) {
        stars += `
        <span class="fa fa-star checked"></span>
        `         
    }
    for (let i = score + 1; i <= 5; i++ ) {
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
        <div>
            <p>${i.user}</p>
            <p>${i.dateTime}</p>
            <p>${addStars(i.score)}</p>
            <p>${i.description}</p>
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
})

// add coment
submit.addEventListener("click", function(){
    let date = new Date();
    let currentDay = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    let currentTime =  date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    let comentToAdd = {
        product: localStorage.getItem("prodID"),
        score: score.value,
        description: text_area.value,
        user: localStorage.getItem("emailUsusario"),
        dateTime: currentDay + " " + currentTime
    }
    console.log(comentToAdd);
    commentInfo.unshift(comentToAdd);
    addComments(commentInfo);
})