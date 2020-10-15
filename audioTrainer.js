import {shuffle, format, smoelen, TrainerTimer} from './trainer.js';



const TIMEAMOUNT = localStorage.getItem('time');
const PHOTOAMOUNT = localStorage.getItem('photo');
const LISTPHOTOS = document.getElementById('photoList');
var totalMoves = 0, correctMoves = 0;
var selectedName = "", selectedPhoto = "";
var nameList = [], smoelenArray = [];
var nameSelected = false, photoSelected = false;
var timeTimer, timeObj, listItem, score, dateNow, people, peoples, scoreboard, currentName, recursionIndex, n, photoData;


window.onload = function(){
  recursionIndex = 0;

  shuffle(smoelen);
  for (let i = 0; i < 3 ; i++){
    smoelenArray.unshift(smoelen[i]);
  }
  n = PHOTOAMOUNT;
  startTraining();
  timeTimer = new TrainerTimer(TIMEAMOUNT);
  timeObj = TrainerTimer.parse(TIMEAMOUNT);
  format(timeObj.minutes, timeObj.seconds, timeObj.pureseconds);
  timeTimer.onTick(format);
  timeTimer.start();
}

function startTraining(){
  for (let i = 0; i < smoelenArray.length; i++) {
    nameList.unshift({name: smoelenArray[i][0], correct: false, photo: smoelenArray[i][1]});
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
  currentName = smoelenArray[recursionIndex][0];
  speakFunction(recursionIndex, n);
}


if(window.speechSynthesis.getVoices().length == 0) {
	window.speechSynthesis.addEventListener('voiceschanged', function() {
		textToSpeech();
	});
}
else {
	textToSpeech();
}

function textToSpeech() {
	var available_voices = window.speechSynthesis.getVoices();
	var dutch_voice = '';

	for(var i=0; i<available_voices.length; i++) {
		if(available_voices[i].lang === 'nl-NL') {
			dutch_voice = available_voices[i];
			break;
		}
	}
	if(dutch_voice === ''){
		dutch_voice = available_voices[0];
  }
}

function speakFunction(recursionIndex, n){
  if (n <= 0) {
    return 0;
  }
  var utter = new SpeechSynthesisUtterance();
	utter.rate = 1;
	utter.pitch = 0.5;
	utter.text = smoelenArray[recursionIndex][0];
	// utter.voice = dutch_voice;
	utter.onend = function() {
	}
	window.speechSynthesis.speak(utter);
}

function nextName(){

  document.getElementById('scoreboard').innerHTML = correctMoves + " out of " + totalMoves;
  LISTPHOTOS.innerHTML = "";
	smoelenArray = [];
  shuffle(smoelen);
for (let i = 0; i < 3 ; i++){
  smoelenArray.unshift(smoelen[i]);
}

// for (let i = 0; i < smoelenArray.length; i++) {
//   nameList.unshift({name: smoelenArray[i][0], correct: false, photo: smoelenArray[i][1]});
// }

shuffle(smoelenArray);
n--;
currentName = smoelenArray[recursionIndex][0];
speakFunction(recursionIndex, n);
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
  if (selectedPhoto) {
    selectedPhoto.className = "listItem list-group-item list-group-item-action";
  }
  (this.tagName == "IMG") ? (selectedPhoto = this, photoSelected = true, photoData = selectedPhoto.dataset.photo) : console.log('error');
  onMatchTry(photoData);
}

function onMatchTry(photoData){
  if (photoSelected) {
    totalMoves++;
    if (photoData == currentName) {
      correctMoves++;
      for (let i = 0; i < nameList.length; i++) {
        if (currentName == nameList[i]['name']){
          nameList[i]['correct'] = true;
          nextName();
        }
      }
    }else{
      selectedPhoto.className = "listItem list-group-item list-group-item-action";
    }
   document.getElementById('scoreboard').innerHTML = correctMoves + " out of " + totalMoves;
   selectedPhoto = "";
   selectedName = "";
   photoSelected = false;
  }
}

function saveScore(){
  savePeople();
  dateNow = new Date();
  score = '200';
  if (!localStorage.getItem('audioScores')) {
    score = [{score: '200', date: dateNow}];
    localStorage.setItem('audioScores', JSON.stringify(score));
  }else {
    scoreboard = JSON.parse(localStorage.getItem('audioScores'));
    scoreboard.unshift({score: score, date: dateNow});
    localStorage.setItem('audioScores', JSON.stringify(scoreboard));
  }
}

function savePeople(){
  (!localStorage.getItem('audioNames')) ? (people = [nameList], localStorage.setItem('audioNames', JSON.stringify(people)))
  : (peoples = JSON.parse(localStorage.getItem('audioNames')), peoples.unshift(nameList), localStorage.setItem('audioNames', JSON.stringify(peoples)));
}
