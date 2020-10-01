var smoelen = [
  ["Wessel Keemink", "images/wessel.jpg" ],
  ["Maarten van Garderen", "images/maarten.jpg"],
  ["Thijs ter Horst", "images/thijs.jpg"],
  ["Luuc van der Ent", "images/luuc.jpg"],
  ["Gijs Jorna", "images/gijs.jpg"],
  ["Fabian Plak", "images/fabian.jpg"],
  ["Ewoud Gommans", "images/ewoud.jpg"],
  ["Nimir Abdelaziz", "images/nimir.jpg"],
  ["Gijs van Solkema", "images/gijs2.jpg"],
  ["Wouter ter Maat", "images/wouter.jpg"],
  ["Michaël Parkinson", "images/michael.jpg"],
  ["Robbert Andringa", "images/robbert.jpg"],
  ["Just Dronkers", "images/just.jpg"]
];

const TIMEAMOUNT = localStorage.getItem('time');
const PHOTOAMOUNT = localStorage.getItem('photo');
var totalMoves = 0;
var correctMoves = 0;
var selectedName = "";
var selectedPhoto = "";
var nameList = [];
var smoelenArray = [];

window.onload = function(){

  startTraining();
  var timeTimer = new TrainerTimer(TIMEAMOUNT);
  var timeObj = TrainerTimer.parse(TIMEAMOUNT);
  format(timeObj.minutes, timeObj.seconds, timeObj.pureseconds);
  timeTimer.onTick(format);
  timeTimer.start();
function format(minutes, seconds, pureseconds) {
     console.log(minutes + ':' + seconds + ':' + pureseconds);
     minutes = minutes < 10 ? "0" + minutes : minutes;
     seconds = seconds < 10 ? "0" + seconds : seconds;
     percentage = 100 + ((pureseconds - TIMEAMOUNT) / TIMEAMOUNT) * 100;
     document.getElementById('progress').style.width = percentage + "%";

     if (percentage < 1) {
       saveScore();
       alert('de tijd is op!');
     }
 }
}

//FROM STACKOVERFLOW-> USED FOR TESTING UNTIL RANDOMIZATION FUNCTION DONE
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
//END OF STACKOVERFLOW

//Remember to add failsafe for when usersetting is higher then amount of photos
function startTraining(){

  var listNames = document.getElementById('nameList');
  shuffle(smoelen);
  console.log(smoelen);
  for (var i = 0; i < PHOTOAMOUNT; i++){
    smoelenArray.unshift(smoelen[i]);
  }
  for (var i = 0; i < smoelenArray.length; i++) {

   var listItem = document.createElement('a');
   listItem.innerHTML = smoelenArray[i][0];
   listItem.classList.add("list-group-item");
   listItem.classList.add('list-group-item-action');
   listItem.addEventListener("click", onUserClickName);
   listNames.appendChild(listItem);

  }
  var listPhotos = document.getElementById('photoList');
  // shuffle(smoelen);
  for (var i = 0; i < smoelenArray.length; i++) {
    shuffle(smoelenArray);
   var listItem = document.createElement('img');
   listItem.src = smoelenArray[i][1];
   listItem.dataset.photo = smoelenArray[i][0];
   listItem.classList.add("list-group-item");
   listItem.classList.add('list-group-item-action');
   listItem.classList.add('img-fluid');
   listItem.style.height = "200px";
   listItem.style.width = "300px";
   listItem.addEventListener("click", onUserClickPhoto);
   listPhotos.appendChild(listItem);
  }
}

  function onUserClickName(){

  selectedName.className = "list-group-item list-group-item-action";
  selectedName = this;
  this.classList.add('active');
  onPlayerMove(photoData);
  }

  function onUserClickPhoto(){
  selectedPhoto.className = "list-group-item list-group-item-action";
  selectedPhoto = this;
  photoData = selectedPhoto.dataset.photo;
  this.classList.add('active');
  onPlayerMove(photoData);
  }

function onPlayerMove(photoData){
  if(selectedName.innerHTML && photoData){
    totalMoves++;
    document.getElementById('scoreboard').innerHTML = correctMoves + " out of " + totalMoves;
    onMatchTry(photoData);
  }
}

function onMatchTry(photoData){
  if (photoData == selectedName.innerHTML) {
    correctMoves++;
    nameList.unshift({name: selectedName.innerHTML, correct: true});
    document.getElementById('scoreboard').innerHTML = correctMoves + " out of " + totalMoves;
    selectedPhoto.classList.add('fade');
    selectedName.classList.add('fade');
    selectedPhoto = "";
    selectedName = "";
  }else{
    nameList.unshift({name: selectedName.innerHTML, correct: false});
    selectedPhoto.className = "list-group-item list-group-item-action";
    selectedName.className = "list-group-item list-group-item-action";
    selectedName.style.border = '3px solid red';
    selectedPhoto.style.border = '3px solid red';
    setTimeout(function(){selectedName.style.border = ""; selectedPhoto.style.border = "";    selectedPhoto = "";
        selectedName = "";}, 500);

  }
}

function saveScore(){
  var dateNow = new Date();
  var score = '200';
  console.log(dateNow.toUTCString());
  console.log(nameList.toString());
  var scoreboard = JSON.parse(localStorage.getItem('scores'));
  scoreboard.unshift({score: score, date: dateNow});
  localStorage.setItem('scores', JSON.stringify(scoreboard));

}

function saveNames(){
  var nameHistory = JSON.parse(localStorage.getItem('names'));
  namehistory.unshift({})
}

function TrainerTimer(duration, granularity){
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}
//Timer for the trainer
TrainerTimer.prototype.start = function(){
  if (this.running){
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer(){
    diff = that.duration - (((Date.now() - start) / 1000) | 0);
    if (diff > 0){
      setTimeout(timer, that.granularity);

    }else{
      diff = 0;
      that.running = false;
    }
    obj = TrainerTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds, obj.pureseconds);

    }, that);

  }());
};
TrainerTimer.prototype.onTick = function(ftn){

  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);

  }
  return this;
};
TrainerTimer.prototype.expired = function(){
  return !this.running;
};
TrainerTimer.parse = function(seconds){
  return{
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0,
    'pureseconds': (seconds) | 0

  };
};


// WHEN THE TRAINER LOADS/ON GAME START->
// #2 fill list-group left with button elements with the names, in a random order (amount set in settings, #8)
// #2 fill list-group right with img elements with the photos, in a random order (amount set in settings, #8)
// #4 Show amount of match-tries and amount of successful matches in the top corner of the screen.
// #5 Show countdown timer on top of the screen. the timer has the time from the settings(#7), and starts counting down.

// WRONG TRY->
// Deselect both the name and photo [maybe selection border flashes red for 1 second before deselection?]

// ON ALL MATCHES (WIN)->
// Save score + date/time
// Show alert with score, after user confirm, return to home screen

//ON END OF TIME(NO WIN)->
// #5 Don't allow any new user input with the names/photos
// Save score + date/time
// Show alert with score, after user confirm, return to home screen
