var timeForm = document.getElementById('time');
var photoForm = document.getElementById('photo');


if(!localStorage.getItem('time')|| !localStorage.getItem('photo')){
  populateStorage();
}else{
  setValue();
}
function populateStorage() {
  localStorage.setItem('time', document.getElementById('time').value);
  localStorage.setItem('photo', document.getElementById('photo').value);

  setValue();
}

function setValue(){
  var currentTime = localStorage.getItem('time');
  var currentPhoto = localStorage.getItem('photo');

  document.getElementById('time').value = currentTime;
  document.getElementById('photo').value = currentPhoto;
}

timeForm.onchange = populateStorage;
photoForm.onchange = populateStorage;
