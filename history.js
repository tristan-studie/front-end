var sortForm = document.getElementById('sortOptions');

function showBoard(){
  if (!localStorage.getItem('scores')) {
    alert('no scores saved yet. Use the trainer to save a score.');
    window.location.href= "http://localhost/pokebattle/front-end/index.html";
  } else {
    document.getElementById('sortOptions').value = 'scoreDesc';
    var scoreboard = JSON.parse(localStorage.getItem('scores'));
    scoreboard = scoreboard.sort(function(a,b){return a.score + b.score});
    printScores(scoreboard);
}
}

function sortBoard(){
  var sortSetting = document.getElementById('sortOptions').value;
  document.getElementById('historyContainer').innerHTML = '';
  var scoreboard = JSON.parse(localStorage.getItem('scores'));
  switch (sortSetting) {
    case 'dateAsc':
    scoreboard = scoreboard.sort(function(a,b){return Date.parse(a.date) - Date.parse(b.date)});
    printScores(scoreboard);
      break;
    case 'dateDesc':
    scoreboard = scoreboard.sort(function(a,b){return Date.parse(b.date) - Date.parse(a.date)});
    printScores(scoreboard);
      break;
    case 'scoreAsc':
    scoreboard = scoreboard.sort(function(a,b){return a.score - b.score});
    printScores(scoreboard);
      break;
    case 'scoreDesc':
    scoreboard = scoreboard.sort(function(a,b){return b.score - a.score});
    printScores(scoreboard);
      break;
  default:
  }
}

function printScores(scoreboard){
  for (var i = 0; i < scoreboard.length || 10; i++) {
    var scoreAmount = scoreboard[i].score;
    var scoreDate = scoreboard[i].date;
    var entry = document.createElement('li');
    entry.innerHTML = (typeof(scoreAmount) != 'undefined' ? scoreAmount : "") + " | " + new Date(scoreDate);
    document.getElementById('historyContainer').appendChild(entry);
  }
}

sortForm.onchange = sortBoard;
showBoard();
sortBoard()
