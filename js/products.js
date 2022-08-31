// User email 

let email_location  = document.getElementsByClassName("user-email")
email_location[0].innerHTML = localStorage.getItem('emailUsusario');

// Load productos on the page 

// url of the selected category
const prod_url = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";

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

// function to show the corresponding subtitle depending on the selected category 
function subTitle(category) {
    let sub_title = document.getElementById("sub-title");
    let content = "Veras aquí todos los productos de la categoría " + category.catName;
    sub_title.innerHTML = content;
}

// function to add the products information to the page 
function addProduct(jsonData) {
    const container = document.getElementById("product-cont");
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
            let productInfo = productData.data ;
            addProduct(productInfo);
            subTitle(productInfo);
        }
})

// Filter by price 

let filterPriceBtn = document.getElementById("rangeFilterCount");

// callback function to filter by prices
function priceFilter(arrayelement) {
    let filterMin = document.getElementById("rangeFilterCountMin");
    let filterMax = document.getElementById("rangeFilterCountMax");
    let minPrice = filterMin.value;
    let maxPrice = filterMax.value;

    if (minPrice !== undefined && maxPrice !== undefined) {
        return (arrayelement.cost >= minPrice && arrayelement.cost <= maxPrice);
    } 
    
}

// filter by price when the button is pressed
filterPriceBtn.addEventListener("click", async function(){
    
    let productData = await jsonData(prod_url);
        if (productData.status === "ok") {
            let productInfo = productData.data ;
            productInfo.products = productInfo.products.filter(priceFilter);
            addProduct(productInfo);

        }
   
})

// Clear filter

let clearFilterBtn = document.getElementById("clearRangeFilter");

clearFilterBtn.addEventListener("click", async function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    
    let productData = await jsonData(prod_url);
        if (productData.status === "ok") {
            let productInfo = productData.data ;
            addProduct(productInfo);
        }
    
});

// Order products by price 

let ascPriceFilter = document.getElementById("sortAsc");
let descPriceFilter = document.getElementById("sortDesc");
let relFilter = document.getElementById("sortByCount")

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

// sort by asc price
ascPriceFilter.addEventListener("click", async function() {
    let productData = await jsonData(prod_url);
        if (productData.status === "ok") {
            let productInfo = productData.data ;
            sortPrice(productInfo, "asc"); 
            addProduct(productInfo);
        }
})

// sort by desc price
descPriceFilter.addEventListener("click", async function() {
    let productData = await jsonData(prod_url);
        if (productData.status === "ok") {
            let productInfo = productData.data ;
            sortPrice(productInfo, "desc"); 
            addProduct(productInfo);
        }
})

// order by relevance 
relFilter.addEventListener("click", async function() {
    let productData = await jsonData(prod_url);
        if (productData.status === "ok") {
            let productInfo = productData.data ;
            sortPrice(productInfo, "rel"); 
            addProduct(productInfo);
        }
})

// Search bar 
let searchInput = document.getElementById("search")

// function to search a string in the title and description 
function search(text,data) {
    let productsSearchresult = [];
    let lowerText = text.toLowerCase();

    for (let i = 0; i < data.products.length; i++) {
        
        let lowerTitle = data.products[i].name.toLowerCase();
        let lowerDescription = data.products[i].description.toLowerCase();

        if ((lowerTitle.match(lowerText) !== null || lowerDescription.match(lowerText) !== null)) {
            productsSearchresult.push(data.products[i]);
            
        }
    }
    
    data.products = productsSearchresult;
    return data;

}

searchInput.addEventListener("input", async function(){
//  alert("asd");

    let texToSearch = searchInput.value;

// alert(texToSearch);
    let productData = await jsonData(prod_url);
    if (productData.status === "ok") {
        let productInfo = productData.data;
        search(texToSearch,productInfo);
        addProduct(productInfo);
    }

})




    
    


