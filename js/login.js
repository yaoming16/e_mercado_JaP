// Log in only if email and password are completed 

const submit = document.getElementById("submit");
const password = document.getElementById("password");
const alert_p = document.getElementsByClassName("alert-p");
const email = document.getElementById("email");


// redirect if already loged in 
if (localStorage.getItem('userData')) {
  redirect('index.html')
}


submit.addEventListener("click", function () {

  //only allow the user to log in if the email has a valid format and the password is not empty
  if (email.checkValidity() && password.value.trim() !== "") {

    saveUserData(["", "", "", "", email.value, ""]);
    localStorage.setItem('userImg', './img/img_perfil.png');

    redirect("index.html");

  }
  //if the required information is not compleated the user will get feedback with text, the input border color and an animation. 
  if (!email.checkValidity()) {
    email.classList.add('alert-input');
    animateCSS('#alert1', 'shakeX');
    alert_p[0].classList.remove('d-none');
  } else {
    email.classList.remove("alert-input");
    alert_p[0].classList.add('d-none');
  }

  if (password.value.trim() === "") {
    password.classList.add('alert-input');
    animateCSS('#alert2', 'shakeX');
    alert_p[1].classList.remove('d-none');

  } else {
    password.classList.remove("alert-input");
    alert_p[1].classList.add('d-none');
  }

})


// Google log in 

var googleButton = document.getElementById('google-button');


// function to get response
function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);

  saveUserData(["", "", "", "", responsePayload.email, ""]);
  localStorage.setItem('userImg', './img/img_perfil.png');
  redirect("index.html");

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
    { theme: "filled_blue"}  // customization attributes
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

function redirect(url) {
  window.location.href = url;
}




