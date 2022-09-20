const sub_title = document.getElementById("sub-title");
const container = document.getElementById("product-cont");
const filterMin = document.getElementById("rangeFilterCountMin");
const filterMax = document.getElementById("rangeFilterCountMax");
const ascPriceFilter = document.getElementById("sortAsc");
const descPriceFilter = document.getElementById("sortDesc");
const relFilter = document.getElementById("sortByCount")
const filterPriceBtn = document.getElementById("rangeFilterCount");
const searchInput = document.getElementById("search");
const clearFilterBtn = document.getElementById("clearRangeFilter");

let listAfterSearch = {};
let currentList = {};
let productInfo = {};
//  listToUse se va a usar para que dependiendo del valor que tenga al moento de aplicar un filtro, seleccionar el array que se va  a filtrar. 
let listToUse = 0;



// Load productos on the page 

// url of the selected category
const prod_url = PRODUCTS_URL + localStorage.getItem("catID") + ".json";

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
        <div class="product-div  list-group-item-action cursor-active" onclick="setProdID(`+ products[i].id +`)">
            
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
};


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
    listToUse = 0;
})

// Clear filter
clearFilterBtn.addEventListener("click", function(){
    filterMin.value = "";
    filterMax.value = "";
    searchInput.value = "";
    
    addProduct(productInfo);
    currentList = productInfo;
    listToUse = 0;

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

    let texToSearch = searchInput.value;
    listAfterSearch = search(texToSearch,currentList);
    addProduct(listAfterSearch);
    if (searchInput.value != "") {
        listToUse = 1;
    } else {
        listToUse = 0;
    }
    
})


// Para los tres botones:
// currentList contiene la información de los productos que se ven si no se está utilizando la barra de busqueda. Si el usuario usa la barra de busqueda, el texto ingresado por el usuario se busca en la descripción y título de los productos en currentList
// y luego se muestran en la pantalla y se guarda su información en listAfterSearch. 
// Si el usuario usa la barra de busqueda listToUse = 1. Los botones para ordenar (por precio y relevancia) van a ordenar listAfterSearch.
// Si el usuario no usa la barra de busqueda listToUse = 0. Los botones para ordenar (por precio y relevancia) van a ordenar currentList.

// sort by asc price. 
ascPriceFilter.addEventListener("click",  function() {
    if (listToUse == 0){
        sortPrice(currentList, "asc"); 
        addProduct(currentList);
     } else {
        sortPrice(listAfterSearch, "asc"); 
        addProduct(listAfterSearch);
     }
    
        
})

// sort by desc price
descPriceFilter.addEventListener("click",  function() {
    if (listToUse == 0){
        sortPrice(currentList, "desc"); 
        addProduct(currentList);
     } else {
        sortPrice(listAfterSearch, "desc"); 
        addProduct(listAfterSearch);
     }
    

})

// order by relevance 
relFilter.addEventListener("click",  function() {
    if (listToUse == 0){
        sortPrice(currentList, "rel"); 
        addProduct(currentList);
     } else {
        sortPrice(listAfterSearch, "rel"); 
        addProduct(listAfterSearch);
     }

})

