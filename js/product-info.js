// User email

window.addEventListener("load", function() {
    if (localStorage.getItem("emailUsusario")){
        let email_location  = document.getElementsByClassName("user-email")
        email_location[0].innerHTML = localStorage.getItem('emailUsusario');
    } else {
        window.location.href = "login.html"
    }
 }) 