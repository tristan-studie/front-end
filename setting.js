var timeForm = document.getElementById('time');

if(!localStorage.getItem('time')){
  populateStorage();
}else{
  setValue();
}
function populateStorage() {
  localStorage.setItem('time', document.getElementById('time').value);

  setValue();
}

function setValue(){
  var currentTime = localStorage.getItem('time');

  document.getElementById('time').value = currentTime;
}

timeForm.onchange = populateStorage;
