const profileForm = document.querySelector('#profile-form');
const inputs = document.getElementsByTagName('input');
const imgInput = document.getElementById('user-image-input');
const userImgTag = document.getElementById('user-img-tag');

let userData = JSON.parse(localStorage.getItem('userData'));
let userDataprops = Object.keys(userData);


// get an url for the img that the user loads only if the user selects an png or jpg image. 
let imageURL = '';

imgInput.addEventListener('change', e => {
  if (isFileImage(imgInput.value)) {
    const file = imgInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imageURL = reader.result;
    })
    reader.readAsDataURL(file);

  } else {
    alert('selecccione una imágen');
    imgInput.value = '';
  }
})

//load info already saved on local storage to the page.
userImgTag.src = localStorage.getItem('userImg');
for (let i = 0; i < inputs.length - 1; i++) {
  inputs[i].value = userData[userDataprops[i]];
}

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

    if (isFileImage(imgInput.value)) {
      userImgTag.src = imageURL;
      localStorage.setItem('userImg', imageURL);
    }

    // redirect('my-profile.html');
  }
})

// check if file is an image
function isFileImage(file) {
  if (file.match(/.jpg$|.png$/)) {
    return true;
  } else {
    return false;
  }
}
