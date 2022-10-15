const prodTable = document.querySelector("#prod-table")

//Function to add the products in the cart
function addCartProducts(array) {

    let contentToAppend = "";
    // numOfProd increments for each product stored in the cart.
    let numOfProd = 0;
    for(let product of array) {

        let strNumOfProd = numOfProd.toString();
        contentToAppend += `
        <div class="row row-cols-2 pb-3 pt-3 border-bottom max-height-div">
        
            <div  class="col-4 col-lg-2" style="">
                <img class="w-100" src="${product.image}">
            </div>

            <div class="col-8 col-lg-10 row row-cols-2">
                <div  class="col-11 d-flex flex-column justify-content-around">


                    <div class="d-flex">
                        <p class="h3 text-nowrap ">${product.name}</p>
                    </div>
                
                    <div class="text-nowrap">
                        <p class="">Precio: <span>${product.currency} ${product.unitCost}</span></p>    
                    </div>
                    
                    <div class="d-flex flex-column flex-md-row justify-content-md-between  align-items-md-center">
                        <input type="number" id="input-${numOfProd}" class="w-50 form-control small-width mb-3" min="1" oninput="this.value = Math.abs(this.value)" value="${product.count}" onchange="subtotalCalculator(${strNumOfProd},this.value,${product.unitCost})"></input>
                        <div class="text-nowrap"><span class="fw-bold">Subtotal: </span> ${product.currency}<span id="subTotal-${strNumOfProd}"> ${product.unitCost * product.count}<span></div> 
                    </div>
                </div>

                <div class="col col-sm-1">
                    <div><button type="button" class="btn d-none d-sm-block" aria-label="Close" onclick="deleteFromCart(${numOfProd})"><i class="h3 bi bi-trash3 h"></i></button></div>
                </div>

            </div>
        </div>
        ` 
        numOfProd += 1;
    }
    prodTable.innerHTML = contentToAppend;
}

// function to change subtotal
function subtotalCalculator(prodNum,quantity,cost) {
    
    // input value is a string so i need to use parseInt to get an integer as a result of the function 
    quantity = parseInt(quantity);
    let subTotal_td = document.querySelector(`#subTotal-${prodNum}`);
    let newSubTotal = quantity * cost;
    subTotal_td.innerHTML = newSubTotal;

    localCart[prodNum][1] = quantity;

    changeCartIcon(localCart);
    localStorage.setItem("cart",JSON.stringify(localCart));
}



//close BTN 

function deleteFromCart(index) {
    localCart.splice(index,1);
    cartToAdd.splice(index,1);
    
    console.log(localCart)
    changeCartIcon(localCart);
    localStorage.setItem("cart",JSON.stringify(localCart));
    addCartProducts(cartToAdd);
}

   
let cartToAdd = [];
let localCart = JSON.parse(localStorage.getItem("cart"));

document.addEventListener("DOMContentLoaded", async ()=>{
    
    //get items saved in the local Storage

    for(let prodarr of localCart) {
            
        let prod = {};
        const prod_url = PRODUCT_INFO_URL + prodarr[0] + EXT_TYPE;
        let cartProd = await jsonData(prod_url);
        if (cartProd.status === "ok") {
            prod = cartProd.data
        }
            
        let itemToAdd = {
            id: prod.id,
            name: prod.name,
            count: prodarr[1],
            unitCost: prod.cost,
            currency: prod.currency,
            image: prod.images[0]

        }
        
        cartToAdd.push(itemToAdd)    
    }

    addCartProducts(cartToAdd)
})

