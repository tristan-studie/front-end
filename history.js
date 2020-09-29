function showBoard(){
  localStorage.setItem('scores', [[1, 200],[2, 400]]);
  var scoreboard = localStorage.getItem('scores');
  console.log(scoreboard);
}


function sortBoard(){
  var sortsetting = document.getElementById('sortOptions').value;
  switch (sortsetting) {
    case date asc:

      break;
    case date desc:

      break;
    case score asc:

      break;
    case score desc:

      break;
  default:

}
}

var sortForm = document.getElementById('sortOptions');




//On game-end: calculate score-> save score to history with score, date and time->if more than X scores, delete oldest record and insert new score.
