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
 ["Just Dronkers", "images/just.jpg"]];

const TIMEAMOUNT = localStorage.getItem('time');
const PHOTOAMOUNT = localStorage.getItem('photo');
const HIDECORRECT = localStorage.getItem('hideCorrect');
const LISTNAMES = document.getElementById('nameList');
const LISTPHOTOS = document.getElementById('photoList');
var totalMoves = 0, correctMoves = 0;
var selectedName = "", selectedPhoto = "";
var nameList = [], smoelenArray = [];
var nameSelected = false, photoSelected = false;
var timeTimer, timeObj, listItem, score, dateNow, people, peoples, scoreboard;
var names = JSON.parse(localStorage.getItem('names'));
var nameCount = [];

window.onload = function(){
  startTraining();
  timeTimer = new TrainerTimer(TIMEAMOUNT);
  timeObj = TrainerTimer.parse(TIMEAMOUNT);
  format(timeObj.minutes, timeObj.seconds, timeObj.pureseconds);
  timeTimer.onTick(format);
  timeTimer.start();
}

function format(minutes, seconds, pureseconds) {
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  percentage = 100 + ((pureseconds - TIMEAMOUNT) / TIMEAMOUNT) * 100;
  document.getElementById('progress').style.width = percentage + "%";
  if (percentage <= 0) {
    saveScore();
    alert('de tijd is op!');
    window.location.href= "http://localhost/pokebattle/front-end/index.html";
  }
}

//STACKOVERFLOW
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex); // Pick a remaining element
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
//STACKOVERFLOW END

function calculateNames(){
  for (let i = 0; i < 5 && i < names.length; i++) { //loop through last 5 games
    for (let j = 0; j < names[i].length; j++) { //For every name
      let playerName = names[i][j]['name'];
        if (JSON.stringify(nameCount).includes(JSON.stringify(playerName))) { //Check if nameCount alredy has a record of the playerName
          for (let k = 0; k < nameCount.length; k++) { //For all names in nameCount
            if (JSON.stringify(nameCount[k]['name']) == JSON.stringify(playerName)) { //Check if nameCount name is the same as the playerName
              (names[i][j]['correct']) ? nameCount[k]['score'] += 1 : nameCount[k]['score'] += 0;
            }
          }
        }else{
          (names[i][j]['correct']) ? nameCount.unshift({name: playerName, score : 1, photo: names[i][j]['photo']})
          : nameCount.unshift({name: playerName, score: 0, photo: names[i][j]['photo']});
        }
    }
  }
for (let i = 0; i < nameCount.length; i++) {
  if (nameCount[i]['score'] == 5) {
    for (let j = 0; j < smoelen.length; j++) {
        if (JSON.stringify(smoelen[j][0]) == JSON.stringify(nameCount[i]['name'])) {
          smoelen.splice(j ,2);

        }
    }
  }
}
}

function startTraining(){
  if (localStorage.getItem('hideCorrect')== 'yes') {
    calculateNames(smoelen);
  }

  shuffle(smoelen);
  for (let i = 0; i < smoelen.length &&  i < PHOTOAMOUNT ; i++){
    smoelenArray.unshift(smoelen[i]);
  }

  for (let i = 0; i < smoelenArray.length; i++) {
    nameList.unshift({name: smoelenArray[i][0], correct: false, photo: smoelenArray[i][1]});
    listItem = document.createElement('a');
    listItem.innerHTML = smoelenArray[i][0];
    listItem.className = "list-group-item list-group-item-action";
    listItem.addEventListener("click", onUserClick);
    LISTNAMES.appendChild(listItem);
  }

  shuffle(smoelenArray);
  for (let i = 0; i < smoelenArray.length; i++) {
    listItem = document.createElement('img');
    listItem.src = smoelenArray[i][1];
    listItem.dataset.photo = smoelenArray[i][0];
    listItem.className = "listItem list-group-item list-group-item-action img-fluid";
    listItem.addEventListener("click", onUserClick);
    LISTPHOTOS.appendChild(listItem);
  }
}

function onUserClick(){
  selectedPhoto.className = "listItem list-group-item list-group-item-action";
  selectedName.className = "list-group-item list-group-item-action";
  (this.tagName == "IMG") ? (selectedPhoto = this, photoSelected = true, photoData = selectedPhoto.dataset.photo)
  : (selectedName = this, nameSelected = true);
  this.classList.add('active');
  onMatchTry(photoData);
}

function onMatchTry(photoData){
  if (nameSelected && photoSelected) {
    totalMoves++;
    if (photoData == selectedName.innerHTML) {
      correctMoves++;
      for (let i = 0; i < nameList.length; i++) {
        if (selectedName.innerHTML == nameList[i]['name']){
          nameList[i]['correct'] = true;
        }
      }
      selectedPhoto.classList.add('fade');
      selectedName.classList.add('fade');
      selectedName.removeEventListener("click", onUserClick);
      selectedPhoto.removeEventListener("click", onUserClick);
    }else{
      selectedPhoto.className = "listItem list-group-item list-group-item-action";
      selectedName.className = "list-group-item list-group-item-action";
    }
   document.getElementById('scoreboard').innerHTML = correctMoves + " out of " + totalMoves;
   selectedPhoto = "";
   selectedName = "";
   nameSelected = false;
   photoSelected = false;
  }
}

function saveScore(){
  savePeople();
  dateNow = new Date();
  score = '200';
  if (!localStorage.getItem('scores')) {
    score = [{score: '200', date: dateNow}];
    localStorage.setItem('scores', JSON.stringify(score));
  }else {
    scoreboard = JSON.parse(localStorage.getItem('scores'));
    scoreboard.unshift({score: score, date: dateNow});
    localStorage.setItem('scores', JSON.stringify(scoreboard));
  }
}

function savePeople(){
  (!localStorage.getItem('names')) ? (people = [nameList], localStorage.setItem('names', JSON.stringify(people)))
  : (peoples = JSON.parse(localStorage.getItem('names')), peoples.unshift(nameList), localStorage.setItem('names', JSON.stringify(peoples)));
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
    (diff > 0) ? setTimeout(timer, that.granularity) : (diff = 0, that.running = false);

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
