const NAMES = JSON.parse(localStorage.getItem('names'));
var nameCount = [];
var figureEntry, entry, entryText;

window.onload = function(){
  (!localStorage.getItem('names')) ? (alert("No names saved yet. Use the trainer to save a score"), window.location.href= "./index.html") : calculateNames();
}

//Calculate the scores for each name
function calculateNames(){
  for (let i = 0; i < 5 && i < NAMES.length; i++) { //loop through last 5 games
    for (let j = 0; j < NAMES[i].length; j++) { //For every name
      let playerName = NAMES[i][j]['name'];
        if (JSON.stringify(nameCount).includes(JSON.stringify(playerName))) { //Check if nameCount already has a record of the playerName
          findName = nameCount.find(player => player.name == playerName);
          (NAMES[i][j]['correct']) ? findName['score'] += 1 : findName['score'] += 0;
          }
        else{
          (NAMES[i][j]['correct']) ? nameCount.unshift({name: playerName, score : 1, photo: NAMES[i][j]['photo']})
          : nameCount.unshift({name: playerName, score: 0, photo: NAMES[i][j]['photo']});
        }
    }
  }
  nameCount = nameCount.sort(function(a,b){return a.score - b.score});
  printNames(nameCount);
  console.log(nameCount);
}

//Show the names
function printNames(nameCount){
  for (let i = 0; i < 3; i++) {
    figureEntry = document.createElement('figure');
    nameList.appendChild(figureEntry);

    entry = document.createElement('img');
    entry.src = nameCount[i]['photo'];
    figureEntry.appendChild(entry);

    entryText = document.createElement('figcaption');
    entryText.innerHTML = nameCount[i]['name'];
    figureEntry.appendChild(entryText);
  }
}
