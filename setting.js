var timeForm = document.getElementById('time');
var photoForm = document.getElementById('photo');
var themeForm = document.getElementById('themes');
var currentTime, currentPhoto, currentTheme;

//Check if settings exist in localStorage, If not => call populateStorage(), Else => call setValue()
(!localStorage.getItem('time') || !localStorage.getItem('photo') || !localStorage.getItem('themes')) ? populateStorage() : setValue();

//Populate the localStorage with settings
function populateStorage() {
  localStorage.setItem('time', timeForm.value);
  localStorage.setItem('photo', photoForm.value);
  localStorage.setItem('themes', themeForm.value);
  setValue();
}

//Get the existing settings from the localStorage
function setValue(){
  currentTime = localStorage.getItem('time');
  currentPhoto = localStorage.getItem('photo');
  currentTheme = localStorage.getItem('themes');

  timeForm.value = currentTime;
  photoForm.value = currentPhoto;
  themeForm.value = currentTheme;
}

//When user changes settings, call populateStorage()
timeForm.onchange = populateStorage;
photoForm.onchange = populateStorage;
themeForm.onchange = populateStorage;
