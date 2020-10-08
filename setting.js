var timeForm = document.getElementById('time');
var photoForm = document.getElementById('photo');
var themeForm = document.getElementById('themes');
var hideForm = document.getElementById('hideCorrect');

var currentTime, currentPhoto, currentTheme, currentHide;

//Check if settings exist in localStorage, If not => call populateStorage(), Else => call setValue()
(!localStorage.getItem('time') || !localStorage.getItem('photo') || !localStorage.getItem('themes') || !localStorage.getItem('hideCorrect')) ? populateStorage() : setValue();

//Populate the localStorage with settings
function populateStorage() {
  localStorage.setItem('time', timeForm.value);
  localStorage.setItem('photo', photoForm.value);
  localStorage.setItem('themes', themeForm.value);
  localStorage.setItem('hideCorrect', hideForm.value);
  setValue();
}

//Get the existing settings from the localStorage
function setValue(){
  currentTime = localStorage.getItem('time');
  currentPhoto = localStorage.getItem('photo');
  currentTheme = localStorage.getItem('themes');
  currentHide = localStorage.getItem('hideCorrect');

  timeForm.value = currentTime;
  photoForm.value = currentPhoto;
  themeForm.value = currentTheme;
  hideForm.value = currentHide;
}

//When user changes settings, call populateStorage()
timeForm.onchange = populateStorage;
photoForm.onchange = populateStorage;
themeForm.onchange = populateStorage;
hideForm.onchange = populateStorage;
