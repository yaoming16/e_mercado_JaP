const submit = document.getElementById("submit");
const email = document.getElementById("email");
const password = document.getElementById("password");
const alert_p = document.getElementsByClassName("alert-p");
const form = document.getElementsByClassName("form");

 submit.addEventListener("click", function() {

     if (email.value.length !== 0  && password.value.length !== 0) {

        form.onsubmit = "return true";
        window.location.href = "portada.html" ;

     } 
     if (email.value.length === 0) {
        email.classList = "alert-input";
        alert_p[0].innerHTML = "Ingresa tu e-mail "
        
     } else {
      email.classList.remove("alert-input");
      alert_p[0].innerHTML = ""
   }
     
     if (password.value.length === 0) {
        password.classList = "alert-input";
        alert_p[1].innerHTML = "Ingresa tu constraseña "
        
     } else {
        password.classList.remove("alert-input");
        alert_p[1].innerHTML = ""
     }

 })

