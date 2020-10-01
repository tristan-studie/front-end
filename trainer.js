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
var nameSelected = false;
var photoSelected = false;

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
//END
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
  shuffle(smoelenArray);
  for (var i = 0; i < smoelenArray.length; i++) {
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
  nameSelected = true;
  this.classList.add('active');
  onPlayerMove(photoData);
  }

  function onUserClickPhoto(){
  selectedPhoto.className = "list-group-item list-group-item-action";
  selectedPhoto = this;
  photoSelected = true;
  photoData = selectedPhoto.dataset.photo;
  this.classList.add('active');
  onPlayerMove(photoData);
  }

function onPlayerMove(photoData){
  if(nameSelected && photoSelected){
    totalMoves++;
    onMatchTry(photoData);
  }
}

function onMatchTry(photoData){
  if (photoData == selectedName.innerHTML) {
    correctMoves++;
    selectedPhoto.classList.add('fade');
    selectedName.classList.add('fade');
  }else{
    selectedPhoto.className = "list-group-item list-group-item-action";
    selectedName.className = "list-group-item list-group-item-action";
  }
  document.getElementById('scoreboard').innerHTML = correctMoves + " out of " + totalMoves;
  selectedPhoto = "";
  selectedName = "";
  nameSelected = false;
  photoSelected = false;
}

function saveScore(){
  var dateNow = new Date();
  var score = '200';
  if (!localStorage.getItem('scores')) {
    score = [{score: '200', date: dateNow}];
    localStorage.setItem('scores', JSON.stringify(score));

  }else {
    var scoreboard = JSON.parse(localStorage.getItem('scores'));
    scoreboard.unshift({score: score, date: dateNow});
    localStorage.setItem('scores', JSON.stringify(scoreboard));
  }
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
