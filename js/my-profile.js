const profileForm = document.querySelector('#profile-form');
const inputs = document.getElementsByTagName('input');

let userData = JSON.parse(localStorage.getItem('userData'));
let userDataprops = Object.keys(userData);

console.log(userData[userDataprops[0]])

for(let i = 0; i < inputs.length; i++) {
  inputs[i].value = userData[userDataprops[i]];
}

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();
  if(!profileForm.checkValidity()) {
    profileForm.classList.add('was-validated');
    
   
  } else {
    values = [];
    for(let input of inputs) {
      values.push(input.value);
    }
    saveUserData(values);
    redirect('my-profile.html');
  }
})
