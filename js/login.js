// Log in only if email and password are completed 

const submit = document.getElementById("submit");
const email = document.getElementById("email");
const password = document.getElementById("password");
const alert_p = document.getElementsByClassName("alert-p");
const form = document.getElementsByClassName("form");

 submit.addEventListener("click", function() {

     if (email.value.trim() !== ""  && password.value.trim() !== "") {

      form.onsubmit = "return true";

      // Local Storage 
      localStorage.setItem('emailUsusario', email.value);

      redirect() ;

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




// Google log in 

function redirect() {
   window.location.href = "index.html";
}


var googleButton = document.getElementById('google-button');



// function to get response
function handleCredentialResponse(response) {
   const responsePayload = decodeJwtResponse(response.credential);
   localStorage.setItem('emailUsusario', responsePayload.email);
   redirect();

   // img.src = responsePayload.picture;
   // getName.innerHTML = responsePayload.name;
   // id.innerHTML = responsePayload.sub;
   // container.style.display = 'inline-block';
   // googleButton.style.display = 'none'

}

//  inicializa el cliente de Acceder con Google //

window.onload = function () {
   google.accounts.id.initialize({
         // replace your client id below
         client_id: "86756801876-v67f8v560bqp6jtnqj32la891db4llq3.apps.googleusercontent.com",
         callback: handleCredentialResponse,
         auto_select: true,
         auto: true,

   });

   google.accounts.id.renderButton(
         document.getElementById("google-button"),
         { theme: "filled_blue", size: "medium"}  // customization attributes
   );
   // also display the One Tap dialog on right side
   // important for auto login
   google.accounts.id.prompt(); 
}


// function to decode the response.credential

function decodeJwtResponse(token) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
   return JSON.parse(jsonPayload);
}




