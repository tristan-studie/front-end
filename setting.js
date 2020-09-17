var timeForm = document.getElementById('time');
var photoForm = document.getElementById('photo');
var themeForm = document.getElementById('themes');


if(!localStorage.getItem('time')|| !localStorage.getItem('photo') || !localStorage.getItem('themes')){
  populateStorage();
}else{
  setValue();
}
function populateStorage() {
  localStorage.setItem('time', document.getElementById('time').value);
  localStorage.setItem('photo', document.getElementById('photo').value);
  localStorage.setItem('themes', document.getElementById('themes').value);
  setValue();
}

function setValue(){
  var currentTime = localStorage.getItem('time');
  var currentPhoto = localStorage.getItem('photo');
  var currentTheme = localStorage.getItem('themes');

  document.getElementById('time').value = currentTime;
  document.getElementById('photo').value = currentPhoto;
  document.getElementById('themes').value = currentTheme;
}

timeForm.onchange = populateStorage;
photoForm.onchange = populateStorage;
themeForm.onchange = populateStorage;
