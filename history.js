function showBoard(){
  localStorage.setItem('scores', [[1, 200],[2, 400]]);
  var scoreboard = localStorage.getItem('scores');
  console.log(scoreboard);
}


sortScore.onchange = sortOnScore();
sortDate.onchange = sortOnDate();


//On game-end: calculate score-> save score to history with score, date and time->if more than X scores, delete oldest record and insert new score.
