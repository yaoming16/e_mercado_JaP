document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// User email

window.addEventListener("load", function() {
    if (localStorage.getItem("emailUsusario")){
        let email_location  = document.getElementsByClassName("user-email")
        email_location[0].innerHTML = localStorage.getItem('emailUsusario');
    } else {
        window.location.href = "login.html"
    }
 }) 

