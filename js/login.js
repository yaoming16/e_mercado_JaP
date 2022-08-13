const submit = document.getElementById("submit");
const email = document.getElementById("email");
const password = document.getElementById("password");
const alert_p = document.getElementsByClassName("alert-p");
const form = document.getElementsByClassName("form");

 submit.addEventListener("click", function() {

     if (email.value.length !== 0  && password.value.length !== 0) {
        form.onsubmit = "return true";
        window.location.href = "portada.html" ;
     } else if (email.value.length === 0) {
        email.className = "alert-input";
        alert_p[0].innerHTML = "Ingresa tu e-mail "
     } else if (password.value.length === 0) {
        password.className = "alert-input";
        alert_p[1].innerHTML = "Ingresa tu constraseña "
     }

 })

