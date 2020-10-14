const SORTFORM = document.getElementById('sortOptions');
const HISTORYCONTAINER = document.getElementById('historyContainer');
const SCOREBOARD = JSON.parse(localStorage.getItem('scores'));

//Onload -> check if there are existing scores saved. If found => call sortBoard(); Else => Notify user and redirect to index
window.onload = function(){
  (!localStorage.getItem('scores')) ? (alert('No scores saved yet. Use the trainer to save a score.'), window.location.href= "./index.html") : sortBoard();
}

//When the user changes the sort setting, call sortBoard()
SORTFORM.onchange = sortBoard;

//Sort the bord based on the sort setting set by the user
function sortBoard(){
  let sortSetting;
  sortSetting = SORTFORM.value;
  (sortSetting == 'dateAsc') ? SCOREBOARD.sort(function(a,b){return Date.parse(a.date) - Date.parse(b.date)})
  : (sortSetting == 'dateDesc') ? SCOREBOARD.sort(function(a,b){return Date.parse(b.date) - Date.parse(a.date)})
  : (sortSetting == 'scoreAsc') ? SCOREBOARD.sort(function(a,b){return a.score - b.score})
  : SCOREBOARD.sort(function(a,b){return b.score - a.score});
  printScores(SCOREBOARD);
}

//Print the (sorted) scores to the scoreboard
function printScores(SCOREBOARD){
  let entry, scoreDate, scoreAmount;
  HISTORYCONTAINER.innerHTML = '';
  for (let i = 0;  i < 10 && i < SCOREBOARD.length; i++) {
    scoreAmount = SCOREBOARD[i].score;
    scoreDate = SCOREBOARD[i].date;
    entry = document.createElement('li');
    entry.innerHTML = scoreAmount + " | " + new Date(scoreDate);
    entry.classList.add('list-group-item');
    HISTORYCONTAINER.appendChild(entry);
  }
}
