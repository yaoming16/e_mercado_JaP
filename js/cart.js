const prodTable = document.querySelector("#prod-table")



const cart_url = CART_INFO_URL + "25801.json";

//Function to add the products in the cart
function addCartProducts(obj) {

    let contentToAppend = "";
    // numOfProd increments for each product stored in the cart.
    let numOfProd = 0;
    for(let product of obj.articles) {

        numOfProd += 1;
        let str = numOfProd.toString();
        contentToAppend += `
        <tr>
            <th scope="row"><img class="w-100" src="${product.image}"></th>
            <td class="text-nowrap">${product.name}</td>
            <td class="text-nowrap">${product.currency} ${product.unitCost}</td>
            <td><input type="number" min="1" oninput="this.value = Math.abs(this.value)" value="${product.count}" onchange="subtotalCalculator(${str},this.value,${product.unitCost})"></input></td>
            <td class="text-nowrap" >${product.currency} <span id="subTotal-${str}">${product.unitCost * product.count}<span></td>
        </tr>
        ` 
    }
    prodTable.innerHTML += contentToAppend;
}

// function to change subtotal
function subtotalCalculator(prodNum,quantity,cost) {
    
    let subTotal_td = document.querySelector(`#subTotal-${prodNum}`);
    let newSubTotal = quantity * cost;
    subTotal_td.innerHTML = newSubTotal;
}


let cart = [];
document.addEventListener("DOMContentLoaded", async ()=>{
    let response = await jsonData(cart_url);
    if (response.status === "ok") {
      cart = response.data; 
    }
    

    //get items saved in the local Storage
    if (localStorage.getItem("cart")) {
        const localCart = JSON.parse(localStorage.getItem("cart"));
        console.log(localCart);
        console.log(typeof localCart);
        
    
        for(let array of localCart) {
            
            let prod = {};
            const prod_url = PRODUCT_INFO_URL + array[0] + EXT_TYPE;
            let cartProd = await jsonData(prod_url);
            if (cartProd.status === "ok") {
                prod = cartProd.data
                console.log(prod);
            }
            
            let itemToAdd = {
                id: prod.id,
                name: prod.name,
                count: array[1],
                unitCost: prod.cost,
                currency: prod.currency,
                image: prod.images[0]

            }
            

            cart.articles.push(itemToAdd)
            
        }

    }
    

    addCartProducts(cart)

})