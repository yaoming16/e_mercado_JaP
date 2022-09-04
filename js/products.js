const sub_title = document.getElementById("sub-title");
const container = document.getElementById("product-cont");
const filterMin = document.getElementById("rangeFilterCountMin");
const filterMax = document.getElementById("rangeFilterCountMax");
const ascPriceFilter = document.getElementById("sortAsc");
const descPriceFilter = document.getElementById("sortDesc");
const relFilter = document.getElementById("sortByCount")
const filterPriceBtn = document.getElementById("rangeFilterCount");
const email_location  = document.getElementsByClassName("user-email")
const searchInput = document.getElementById("search")
const clearFilterBtn = document.getElementById("clearRangeFilter");

let listAfterSearch = {};
let currentList = {};
let productInfo = {};

// User email

window.addEventListener("load", function() {
    if (localStorage.getItem("emailUsusario")){
        email_location[0].innerHTML = localStorage.getItem('emailUsusario');
    } else {
        window.location.href = "login.html"
    }
 }) 

// Load productos on the page 

// url of the selected category
const prod_url = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";

// function to show the corresponding subtitle depending on the selected category 
function subTitle(category) {
    let content = "Veras aquí todos los productos de la categoría " + category.catName;
    sub_title.innerHTML = content;
}

// function to add the products information to the page 
function addProduct(jsonData) {
    let content_to_append = "" ;
    let products = jsonData.products;
    
    for (let i = 0; i < products.length; i++) {
        content_to_append += `
        <div class="product-div">
            
            <img class="product-img" src=` + products[i].image + `>

            <div class="product-name-div">
                <h3 class="product-title">` + products[i].name + " - " + products[i].currency + " " + products[i].cost + `</h3>
                <p class="product-description">`+ products[i].description +`<p>
            </div>

            <p class="sold-amount">`+ products[i].soldCount +` Vendidos</p>

        </div>
        `
    }

    container.innerHTML = content_to_append;
}


// event to show the products on the page when the dom is loaded 
document.addEventListener("DOMContentLoaded", async function() {
    let productData = await jsonData(prod_url);
    if (productData.status === "ok") {
        productInfo = productData.data ;
        addProduct(productInfo);
        subTitle(productInfo);
        currentList = productInfo;
    }
})

// Filter by price 

// callback function to filter by prices
function priceFilter(arrayelement) {
    let minPrice = filterMin.value;
    let maxPrice = filterMax.value;

    if (minPrice !== undefined && maxPrice !== undefined) {
        return (arrayelement.cost >= minPrice && arrayelement.cost <= maxPrice);
    } 
    
}

// filter by price when the button is pressed
filterPriceBtn.addEventListener("click", function(){
    searchInput.value = "";
    let filter = {};
    filter.products = productInfo.products.filter(priceFilter);
    addProduct(filter);
    currentList = filter;
})

// Clear filter
clearFilterBtn.addEventListener("click", function(){
    filterMin.value = "";
    filterMax.value = "";
    searchInput.value = "";
    
    addProduct(productInfo);
    currentList = productInfo;

});

// Order products by price 

// sort function by price 
function sortPrice(data, method) {
    let orderedProducts = [];

    if (method === "asc") {
        orderedProducts = data.products.sort(function(a,b){
            return a.cost - b.cost;
        }) 
    } 
    else if (method === "desc"){
        orderedProducts = data.products.sort(function(a,b){
            return b.cost - a.cost;
        })
    } 
    else if (method === "rel") {
        orderedProducts = data.products.sort(function(a,b){
            return b.soldCount - a.soldCount;
        })
    } else {return data;}
    
    data.products = orderedProducts;
    return data;
}

// function to search a string in the title and description 
function search(text,data) {

    let productsSearchresult = [];
    let lowerText = text.toLowerCase();
    console.log(lowerText);
    let result = {};

    for (let i = 0; i < data.products.length; i++) {
        
        let lowerTitle = data.products[i].name.toLowerCase();
        let lowerDescription = data.products[i].description.toLowerCase();

        if ((lowerTitle.match(lowerText) !== null || lowerDescription.match(lowerText) !== null)) {
            productsSearchresult.push(data.products[i]);   
        } 
    }
    
    result.products = productsSearchresult;
    return result;

}

// search bar. 
searchInput.addEventListener("input",  function(){
    let texToSearch = searchInput.value.trim();
    listAfterSearch = search(texToSearch,currentList);
    addProduct(listAfterSearch); 
})


// Para los tres botones:
// Van a ordenar el resultado de lo que el usuario busque en la searchbar. Si el usuario no ingresa ningún texto se va a ordenar la lista completa, en caso ocntrario se ordena los
// productos que resultaron de la busqueda. 

// sort by asc price. 
ascPriceFilter.addEventListener("click",  function() {
    sortPrice(listAfterSearch, "asc"); 
    addProduct(listAfterSearch);      
})

// sort by desc price
descPriceFilter.addEventListener("click",  function() {
    sortPrice(listAfterSearch, "desc"); 
    addProduct(listAfterSearch);
})

// order by relevance 
relFilter.addEventListener("click",  function() {
    sortPrice(listAfterSearch, "rel"); 
    addProduct(listAfterSearch);
})
