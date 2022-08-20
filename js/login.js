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


function redirect() {
   alert("asd");
}

//  function onSignIn(googleUser) {
//    var profile = googleUser.getBasicProfile();
//    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//    console.log('Name: ' + profile.getName());
//    console.log('Image URL: ' + profile.getImageUrl());
//    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//  }

//  function signOut() {
//    var auth2 = gapi.auth2.getAuthInstance();
//    auth2.signOut().then(function () {
//      console.log('User signed out.');
//    });
//  }

// function handleCredentialResponse(response) {
//    // decodeJwtResponse() is a custom function defined by you
//    // to decode the credential response.
//    const responsePayload = decodeJwtResponse(response.credential);

//    console.log("ID: " + responsePayload.sub);
//    console.log('Full Name: ' + responsePayload.name);
//    console.log('Given Name: ' + responsePayload.given_name);
//    console.log('Family Name: ' + responsePayload.family_name);
//    console.log("Image URL: " + responsePayload.picture);
//    console.log("Email: " + responsePayload.email);
// }

var googleButton = document.getElementById('google-button');



function handleCredentialResponse(response) {
   console.log("Encoded JWT ID token: " + response.credential);
 }
 window.onload = function () {
   google.accounts.id.initialize({
     client_id: "86756801876-v67f8v560bqp6jtnqj32la891db4llq3.apps.googleusercontent.com",
     callback: handleCredentialResponse
   });
   google.accounts.id.renderButton(
     document.getElementById("buttonDiv"),
     { theme: "outline", size: "large" }  // customization attributes
   );
   google.accounts.id.prompt(); // also display the One Tap dialog
 }


