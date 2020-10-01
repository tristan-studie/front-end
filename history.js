var sortForm = document.getElementById('sortOptions');

function showBoard(){

  if (!localStorage.getItem('scores')) {
    alert('no scores saved yet. Use the trainer to save a score.');
    window.location.href= "http://localhost/pokebattle/front-end/index.html";
  } else {
    document.getElementById('sortOptions').value = 'scoreDesc';

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

    scoreboard = scoreboard.sort(function(a,b){return Date.parse(b.date) - Date.parse(a.date)});
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

    scoreboard = scoreboard.sort(function(a,b){return b.score - a.score});
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
showBoard();
sortBoard();
