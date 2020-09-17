function showBoard(){
  localStorage.setItem('scores', [[1, 200],[2, 400]]);
  var scoreboard = localStorage.getItem('scores');
  console.log(scoreboard);
}


sortScore.onchange = sortOnScore();
sortDate.onchange = sortOnDate();
