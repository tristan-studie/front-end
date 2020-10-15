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
const HIDECORRECT = localStorage.getItem('hideCorrect');
const LISTNAMES = document.getElementById('nameList');
const LISTPHOTOS = document.getElementById('photoList');
let totalMoves = 0, correctMoves = 0;
let selectedName = "", selectedPhoto = "";
let nameList = [], smoelenArray = [], nameCount = [];
let nameSelected = false, photoSelected = false;
let timeTimer, timeObj, listItem, score, dateNow, people, peoples, scoreboard, photoData, findName, nameCorrect;
let names = JSON.parse(localStorage.getItem('names'));


window.onload = function(){
  startTraining();
  timeTimer = new TrainerTimer(TIMEAMOUNT);
  timeObj = TrainerTimer.parse(TIMEAMOUNT);
  format(timeObj.minutes, timeObj.seconds, timeObj.pureseconds);
  timeTimer.onTick(format);
  timeTimer.start();
}
//Format time and countdown timer
function format(minutes, seconds, pureseconds) {
  let percentage;
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
//Shuffle the array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    //Double Bitwise NOT Shorthand [Replaced Math.floor() with ~~]
    randomIndex = ~~(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function calculateNames(){
  for (let i = 0; i < 5 && i < names.length; i++) { //loop through last 5 games
    for (let j = 0; j < names[i].length; j++) { //For every name
      let playerName = names[i][j]['name'];
        if (JSON.stringify(nameCount).includes(JSON.stringify(playerName))) { //Check if nameCount already has a record of the playerName
          findName = nameCount.find(player => player.name == playerName);
          (names[i][j]['correct']) ? findName['score'] += 1 : findName['score'] += 0;

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

//When the user clicks on a trainer element
function onUserClick(){
  if (selectedPhoto) {
    selectedPhoto.className = "listItem list-group-item list-group-item-action";

  }
  if (selectedName) {
    selectedName.className = "list-group-item list-group-item-action";

  }
  (this.tagName == "IMG") ? (selectedPhoto = this, photoSelected = true, photoData = selectedPhoto.dataset.photo)
  : (selectedName = this, nameSelected = true);
  this.classList.add('active');
  onMatchTry(photoData);
}

//If user has valid match try, check match, else, do nothing
function onMatchTry(photoData){
  if (nameSelected && photoSelected) {
    totalMoves++;
    if (photoData == selectedName.innerHTML) {
      correctMoves++;
      nameCorrect = nameList.find(nameCorrect =>  nameCorrect.name == selectedName.innerHTML);
      nameCorrect['correct'] = true;
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


//Save the score
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

//Save the people
function savePeople(){
  (!localStorage.getItem('names')) ? (people = [nameList], localStorage.setItem('names', JSON.stringify(people)))
  : (peoples = JSON.parse(localStorage.getItem('names')), peoples.unshift(nameList), localStorage.setItem('names', JSON.stringify(peoples)));
}

//Timer for the trainer
function TrainerTimer(duration, granularity){
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

TrainerTimer.prototype.start = function(){
  if (this.running) return;
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

//Export functions
export {shuffle, format, smoelen, TrainerTimer};
