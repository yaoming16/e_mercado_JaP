const prodTable = document.querySelector("#prod-table");
const cost_div_items = document.querySelectorAll(".cost-div-item");
const shipping = document.getElementsByName("shipping");


//Function to add the products in the cart
function addCartProducts(array) {

  let contentToAppend = "";
  // numOfProd increments for each product stored in the cart.
  let numOfProd = 0;
  for (let product of array) {

    contentToAppend += `
    <div class="row row-cols-2 pb-3 pt-3 border-bottom max-height-div">

      <div class="col-4 col-lg-2" style="">
        <img class="w-100 cursor-active" src="${product.image}" onClick="setProdID(${product.id})">
      </div>
    
      <div class="col-8 col-lg-10 row row-cols-2 ">
        <div class="col-11 d-flex flex-column justify-content-around">
          <div>
            <p class="h3  ">${product.name}</p>
          </div>
    
          <div>
            <p class="text-nowrap">Precio: <span>${product.currency} ${product.unitCost}</span></p>
          </div>
    
          <div class="d-flex flex-column flex-md-row justify-content-md-between  align-items-md-center">

            <input type="number" id="input-${numOfProd}" class="w-50 form-control small-width mb-3" min="1"
              oninput="noNegativeNumberInput(this)" value="${product.count}"
              onchange="subtotalCalculator(${numOfProd},this.value,${product.unitCost})"></input>

            <div class="text-nowrap"><span class="fw-bold">Subtotal: </span> ${product.currency}: <span
                id="subTotal-${numOfProd}" class='prod-total-span'> ${product.unitCost * product.count}<span></div>
                
          </div>
        </div>
    
        <div class="col-1">
          <div><button type="button" class="btn" aria-label="Close" onclick="deleteFromCart(${numOfProd})"><i
                class="h3 bi bi-trash3 h"></i></button></div>
        </div>
    
      </div>
    </div>   
   `
    numOfProd += 1;
  }
  prodTable.innerHTML = contentToAppend;
}

// function to change subtotal
function subtotalCalculator(prodNum, quantity, cost) {

  // input value is a string so i need to use parseInt to get an integer as a result of the function 
  quantity = parseInt(quantity);
  let subTotal_td = document.querySelector(`#subTotal-${prodNum}`);
  let newSubTotal = quantity * cost;
  subTotal_td.innerHTML = newSubTotal;

  localCart[prodNum][1] = quantity;
  cartToAdd[prodNum].count = quantity;

  changeCartIcon(localCart);
  costSubtotal();
  localStorage.setItem("cart", JSON.stringify(localCart));
}



//close BTN 

function deleteFromCart(index) {
  localCart.splice(index, 1);
  cartToAdd.splice(index, 1);

  changeCartIcon(localCart);
  localStorage.setItem("cart", JSON.stringify(localCart));
  addCartProducts(cartToAdd);
  costSubtotal();
}


let cartToAdd = [];
let localCart = JSON.parse(localStorage.getItem("cart"));

document.addEventListener("DOMContentLoaded", async () => {

  //get items saved in the local Storage

  for (let prodarr of localCart) {

    let prod = {};
    const prod_url = PRODUCT_INFO_URL + prodarr[0] + EXT_TYPE;
    let cartProd = await jsonData(prod_url);
    if (cartProd.status === "ok") {
      prod = cartProd.data;
    }

    let itemToAdd = {
      id: prod.id,
      name: prod.name,
      count: prodarr[1],
      unitCost: prod.currency === 'USD' ? prod.cost : Math.round(prod.cost / 40),
      currency: 'USD',
      image: prod.images[0]

    }
    cartToAdd.push(itemToAdd);
  }

  addCartProducts(cartToAdd);
  costSubtotal();

  for (let element of shipping) {
    element.addEventListener("click", () => {
      costSubtotal();
    });
  }
})


// Total calculation 

function costSubtotal() {

  // subtotal part
  let totalSub = 0;
  let prodSubtotals = document.getElementsByClassName('prod-total-span');

  for (let element of prodSubtotals) {
    totalSub += parseFloat(element.textContent);

  }

  cost_div_items[0].innerHTML = totalSub;

  //shipment

  let shipmentValue = 0;
  for (let element of shipping) {
    if (element.checked) {
      shipmentValue = parseFloat(element.value) * totalSub;
    }
  }
  cost_div_items[1].innerHTML = roundTwoDecimals(shipmentValue)
  cost_div_items[2].innerHTML = roundTwoDecimals(shipmentValue + totalSub)
}


// Form controls

const TBancaria = document.querySelector("#TBancaria");
const tarjeta = document.querySelector("#tarjeta");
const credit_card_input = document.querySelectorAll(".credit-card");
const numCuenta_input = document.querySelector("#numCuenta");

TBancaria.addEventListener("click", () => {

  numCuenta_input.disabled = false;

  for (let input of credit_card_input) {
    input.disabled = true;
  }
  pay_method_span.innerHTML = "Transferencia bancaria";
  pay_method_span.classList.remove("text-danger");
})

tarjeta.addEventListener("click", () => {
  for (let input of credit_card_input) {
    input.disabled = false;
  }

  numCuenta_input.disabled = true;
  pay_method_span.innerHTML = "Tarjeta de Crédito";
  pay_method_span.classList.remove("text-danger");
})


// form validation 

const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');
const pay_method_span = document.querySelector("#pay-method-span");
const alert_div = document.querySelector('#alert-div');


document.getElementById('buyBtn').addEventListener('click', () => {
  if (!form1.checkValidity()) {
    form1.classList.add('was-validated');
  }
  if (!form2.checkValidity()) {
    form2.classList.add('was-validated');
    pay_method_span.classList.add("text-danger");
  }
  if (form1.checkValidity() && form2.checkValidity()) {
    alert_div.innerHTML = `
    <div class="alert alert-success d-flex align-items-center d-flex justify-content-between" role="alert">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
      <div>
        Compra realizada con éxito
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
  }
})



