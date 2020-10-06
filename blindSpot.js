var names = JSON.parse(localStorage.getItem('names'));
var nameCount = [];
var figureEntry, entry, entryText;

window.onload = function(){
  (!localStorage.getItem('names')) ? (alert("No names saved yet. Use the trainer to save a score"), window.location.href= "./index.html") : calculateNames();
}

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
  nameCount = nameCount.sort(function(a,b){return a.score - b.score});
  printNames(nameCount);
}

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
