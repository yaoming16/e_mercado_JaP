const submit = document.getElementById("submit");
const email = document.getElementById("email");
const password = document.getElementById("password");
const alert_p = document.getElementsByClassName("alert-p");
const form = document.getElementsByClassName("form");

 submit.addEventListener("click", function() {

     if (email.value.trim() !== ""  && password.value.trim() !== "") {

        form.onsubmit = "return true";
        window.location.href = "portada.html" ;

     } 
     if (email.value.trim() === "") {
        email.classList = "alert-input";
        alert_p[0].innerHTML = "Ingresa tu e-mail "
        
     } else {
      email.classList.remove("alert-input");
      alert_p[0].innerHTML = ""
   }
     
     if (password.value.trim() === "") {
        password.classList = "alert-input";
        alert_p[1].innerHTML = "Ingresa tu constraseña "
        
     } else {
        password.classList.remove("alert-input");
        alert_p[1].innerHTML = ""
     }

 })


 function onSignIn(googleUser) {
   var profile = googleUser.getBasicProfile();
   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
   console.log('Name: ' + profile.getName());
   console.log('Image URL: ' + profile.getImageUrl());
   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
 }

 function signOut() {
   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
     console.log('User signed out.');
   });
 }
