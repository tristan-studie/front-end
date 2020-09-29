var sortForm = document.getElementById('sortOptions');

function showBoard(){
  if (!localStorage.getItem('scores')) {
    alert('no scores saved yet. Use the trainer to save a score.');
    window.location.href= "http://localhost/pokebattle/front-end/index.html";
  } else {
  var scoreboard = JSON.parse(localStorage.getItem('scores'));
  console.log(scoreboard);
  document.getElementById('historyContainer').style.display = 'block';
  document.getElementById('historyContainer').innerHTML = '';

  scoreboard = scoreboard.sort(function(a,b){return a.score + b.score});
  for(var i =0; i <10; i++){
    var scoreAmount = scoreboard[i].score;
    var scoreDate = scoreboard[i].date;

    var entry = document.createElement('li');
    entry.innerHTML = (typeof(scoreAmount) != 'undefined' ? scoreAmount : "") + " | " + new Date(scoreDate);
    document.getElementById('historyContainer').appendChild(entry);
  }

}
}


function sortBoard(){
  var sortSetting = document.getElementById('sortOptions').value;
  switch (sortSetting) {
    case 'dateAsc':
    var scoreboard = JSON.parse(localStorage.getItem('scores'));

    document.getElementById('historyContainer').innerHTML = '';

    scoreboard = scoreboard.sort(function(a,b){return Date.parse(a.date) - Date.parse(b.date)});
    for(var i =0; i <10; i++){
      var scoreAmount = scoreboard[i].score;
      var scoreDate = scoreboard[i].date;
      var entry = document.createElement('li');
      entry.innerHTML = (typeof(scoreAmount) != 'undefined' ? scoreAmount : "") + " | " + new Date(scoreDate);
      document.getElementById('historyContainer').appendChild(entry);
    }
      break;
    case 'dateDesc':
    var scoreboard = JSON.parse(localStorage.getItem('scores'));

    document.getElementById('historyContainer').innerHTML = '';

    scoreboard = scoreboard.sort(function(a,b){return Date.parse(a.date) + Date.parse(b.date)});
    for(var i =0; i <10; i++){
      var scoreAmount = scoreboard[i].score;
      var scoreDate = scoreboard[i].date;
      var entry = document.createElement('li');
      entry.innerHTML = (typeof(scoreAmount) != 'undefined' ? scoreAmount : "") + " | " + new Date(scoreDate);
      document.getElementById('historyContainer').appendChild(entry);
    }
      break;
    case 'scoreAsc':
    var scoreboard = JSON.parse(localStorage.getItem('scores'));

    document.getElementById('historyContainer').innerHTML = '';

    scoreboard = scoreboard.sort(function(a,b){return a.score - b.score});
    for(var i =0; i <10; i++){
      var scoreAmount = scoreboard[i].score;
      var scoreDate = scoreboard[i].date;
      var entry = document.createElement('li');
      entry.innerHTML = (typeof(scoreAmount) != 'undefined' ? scoreAmount : "") + " | " + new Date(scoreDate);
      document.getElementById('historyContainer').appendChild(entry);
    }
      break;
    case 'scoreDesc':
    var scoreboard = JSON.parse(localStorage.getItem('scores'));

    document.getElementById('historyContainer').innerHTML = '';

    scoreboard = scoreboard.sort(function(a,b){return a.score + b.score});
    for(var i =0; i <10; i++){
      var scoreAmount = scoreboard[i].score;
      var scoreDate = scoreboard[i].date;

      var entry = document.createElement('li');
      entry.innerHTML = (typeof(scoreAmount) != 'undefined' ? scoreAmount : "") + " | " + new Date(scoreDate);
      document.getElementById('historyContainer').appendChild(entry);
    }
      break;
  default:

  }
}

sortForm.onchange = sortBoard;
localStorage.setItem('scores', JSON.stringify([{score: 200, date: "2015-03-25T12:00:00"},{score: 400, date: "2020-06-20T11:00:00"} ]));

showBoard();
sortBoard();


//On game-end: calculate score-> save score to history with score, date and time->if more than X scores, delete oldest record and insert new score.
