var sortForm = document.getElementById('sortOptions');

function showBoard(){
  if (!localStorage.getItem('scores')) {
    alert('no scores saved yet. Use the trainer to save a score.');
    window.location.href= "http://localhost/pokebattle/front-end/index.html";
  } else {
  var scoreboard = localStorage.getItem('scores');
  console.log(scoreboard);
}
}


function sortBoard(){
  var sortSetting = document.getElementById('sortOptions').value;
  switch (sortSetting) {
    case 'dateAsc':

      break;
    case 'dateDesc':

      break;
    case 'scoreAsc':

      break;
    case 'scoreDesc':

      break;
  default:

  }
}

sortForm.onchange = sortBoard;
// localStorage.setItem('scores', [[1, 200],[2, 400]]);

showBoard();


//On game-end: calculate score-> save score to history with score, date and time->if more than X scores, delete oldest record and insert new score.
