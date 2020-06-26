var smoelen = [
  ["Petar Stoskovic", "images/petar.jpg" ],
  ['Lewis Montsma', "images/lewis.jpg"],
  ['Stef Gronsveld', 'images/stef.jpg'],
  ['Daniël Breedijk', 'images/daniel.jpg'],
  ['Robin Polley', 'images/robin.jpg']
];

const TIMEAMOUNT = localStorage.getItem('time');
const PHOTOAMOUNT = localStorage.getItem('photo');
var totalMoves = 0;
var correctMoves = 0;
var selectedName = "";
var selectedPhoto = "";


window.onload = function(){

  startTraining();
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
  for (var i = 0; i < smoelen.length; i++) {

   var listItem = document.createElement('a');
   listItem.innerHTML = smoelen[i][0];
   listItem.classList.add("list-group-item");
   listItem.classList.add('list-group-item-action');
   listItem.addEventListener("click", onUserClickName);
   listNames.appendChild(listItem);



  }
  var listPhotos = document.getElementById('photoList');
  shuffle(smoelen);
  for (var i = 0; i < smoelen.length; i++) {

   var listItem = document.createElement('img');
   listItem.src = smoelen[i][1];
   listItem.dataset.photo = smoelen[i][0];
   listItem.classList.add("list-group-item");
   listItem.classList.add('list-group-item-action');
   listItem.addEventListener("click", onUserClickPhoto);
   listPhotos.appendChild(listItem);
  }
}

function onUserClickName(){

  selectedName.className = "list-group-item list-group-item-action";

  selectedName = this;

  this.classList.add('active');

  onPlayerMove();
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
      document.getElementById('scoreboard').innerHTML = correctMoves + " out of " + totalMoves;
    selectedPhoto.classList.add('fade');
    selectedName.classList.add('fade');
    selectedPhoto = "";
    selectedName = "";
  }else{
    selectedPhoto.className = "list-group-item list-group-item-action";
    selectedName.className = "list-group-item list-group-item-action";

    selectedPhoto = "";
    selectedName = "";

  }
}

// correctMoves.onchange = function(){
//   document.getElementById('scoreboard').innerHTML = correctMoves + " out of " + totalMoves;
// }






// WHEN THE TRAINER LOADS/ON GAME START->
// #2 fill list-group left with button elements with the names, in a random order (amount set in settings, #8)
// #2 fill list-group right with img elements with the photos, in a random order (amount set in settings, #8)
// #4 Show amount of match-tries and amount of successful matches in the top corner of the screen.
// #5 Show countdown timer on top of the screen. the timer has the time from the settings(#7), and starts counting down.

// ON USER CLICK IMG/BUTTON ELEMENT->
// #3 select name/photo
// #3 add border around selected item
// #3 when there is already one img/button selected and user clicks another, remove previous one from selection

// ON USER MATCH TRY->
// #4 for both good and wrong: add 1 to total match tries
// compare selection: if belong together: successful try (see below) else: wrong try(see below)

//SUCCESSFUL TRY->
// #3 photo+name fade away(500ms)[CSS class?] (space stays intact)
// #4 add 1 to total correct tries

// WRONG TRY->
// Deselect both the name and photo [maybe selection border flashes red for 1 second before deselection?]

// ON ALL MATCHES (WIN)->
// Save score + date/time
// Show alert with score, after user confirm, return to home screen

//ON END OF TIME(NO WIN)->
// #5 Don't allow any new user input with the names/photos
// Save score + date/time
// Show alert with score, after user confirm, return to home screen
