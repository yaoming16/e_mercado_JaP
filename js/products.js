const autos_url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

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
                <p class="product-description">`+ products[1].description +`<p>
            </div>

            <p class="sold-amount">`+ products[i].soldCount +` Vendidos</p>

        </div>
        `
    }

    container.innerHTML = content_to_append;
}

document.addEventListener("DOMContentLoaded", async function() {
    let productData = await jsonData(autos_url);
        if (productData.status === "ok") {
            productInfo = productData.data ;
            addProduct(productInfo);
        }
    })
    
    


