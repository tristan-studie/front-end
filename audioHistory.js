const SORTFORM = document.getElementById('sortOptions');
const HISTORYCONTAINER = document.getElementById('historyContainer');
var scoreboard = JSON.parse(localStorage.getItem('audioScores'));
var sortSetting, scoreAmount, scoreDate, entry;

//Onload -> check if there are existing scores saved. If found => call sortBoard(); Else => Notify user and redirect to index
window.onload = function() {
  (!localStorage.getItem('audioScores')) ? (alert('No scores saved yet. Use the trainer to save a score.'), window.location.href = "./index.html") : sortBoard();
}

//When the user changes the sort setting, call sortBoard()
SORTFORM.onchange = sortBoard;

//Sort the bord based on the sort setting set by the user
function sortBoard() {
  sortSetting = SORTFORM.value;
  (sortSetting == 'dateAsc') ? scoreboard = scoreboard.sort(function(a, b) {
      return Date.parse(a.date) - Date.parse(b.date)
    }): (sortSetting == 'dateDesc') ? scoreboard.sort(function(a, b) {
      return Date.parse(b.date) - Date.parse(a.date)
    }) :
    (sortSetting == 'scoreAsc') ? scoreboard.sort(function(a, b) {
      return a.score - b.score
    }) :
    scoreboard = scoreboard.sort(function(a, b) {
      return b.score - a.score
    });
  printScores(scoreboard);
}

//Print the (sorted) scores to the scoreboard
function printScores(scoreboard) {
  HISTORYCONTAINER.innerHTML = '';
  for (let i = 0; i < 10 && i < scoreboard.length; i++) {
    scoreAmount = scoreboard[i].score;
    scoreDate = scoreboard[i].date;
    entry = document.createElement('li');
    entry.innerHTML = scoreAmount + " | " + new Date(scoreDate);
    entry.classList.add('list-group-item');
    HISTORYCONTAINER.appendChild(entry);
  }
}
