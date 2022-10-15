const prodTable = document.querySelector("#prod-table")

//Function to add the products in the cart
function addCartProducts(array) {

    let contentToAppend = "";
    // numOfProd increments for each product stored in the cart.
    let numOfProd = 0;
    for(let product of array) {

        let strNumOfProd = numOfProd.toString();
        contentToAppend += `
        <tr>
            <th scope="row" class=""  style="width:15%"><img class="w-100" src="${product.image}"></th>
            <td class="text-nowrap">${product.name}</td>
            <td class="text-nowrap">${product.currency} ${product.unitCost}</td>
            <td class=""><input type="number" class="" min="1" oninput="this.value = Math.abs(this.value)" value="${product.count}" onchange="subtotalCalculator(${strNumOfProd},this.value,${product.unitCost})"></input></td>
            <td class="text-nowrap" >${product.currency} <span id="subTotal-${strNumOfProd}">${product.unitCost * product.count}<span></td>
            <td><button type="button" class="btn-close btn-warning closeBTN" aria-label="Close" onclick="deleteFromCart(${numOfProd})"></button></td>
        </tr>
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

