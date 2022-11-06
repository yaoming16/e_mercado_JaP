const profileForm = document.querySelector('#profile-form');
const inputs = document.getElementsByTagName('input');
const imgInput = document.getElementById('user-image-input');
const userImgTag = document.getElementById('user-img-tag');
const alert_div = document.getElementById('alert-div');

let userData = JSON.parse(localStorage.getItem('userData'));

let userDataprops = Object.keys(userData);



// get an url for the img that the user loads only if the user selects an png or jpg image. 
let imageURL = '';

// if the user selects an image type that is not jpg or png the user will get an alert 
imgInput.addEventListener('change', e => {
  if (imgInput.value.match(/.jpg$|.png$/)) {
    const file = imgInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imageURL = reader.result;
    })
    reader.readAsDataURL(file);

  } else {
    showAlert(alert_div,'selecccione una imágen','danger')
    imgInput.value = '';
  }
})

//load info already saved on local storage to the page.
userImgTag.src = localStorage.getItem('userImg');
for (let i = 0; i < inputs.length - 1; i++) {
  inputs[i].value = userData[userDataprops[i]];
}

//when the info of the user is submitted, if the form isn't valid the user will get feedback; otherwise, the info will be saved on localStorage 
profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (!profileForm.checkValidity()) {
    profileForm.classList.add('was-validated');

  } else {
    values = [];
    for (let input of inputs) {
      values.push(input.value);
    }

    saveUserData(values);
    if(imgInput.value) {
      userImgTag.src = imageURL;
      localStorage.setItem('userImg', imageURL);
    }
    showAlert(alert_div,'Información actualizada con éxito','success');
  }
})
