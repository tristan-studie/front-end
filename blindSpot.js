function showNames(){
  if (!localStorage.getItem('names')) {
    alert('No names saved yet. Use the trainer to save a score');
    window.location.href = 'http://localhost/pokebattle/front-end/index.html';
  }else {
    calculateNames();
  }
}
  var nameCount=[];
  var names = JSON.parse(localStorage.getItem('names'));

function calculateNames(){

  for (var i = 0; i < 5; i++) { // last 5 games
    for (var iq = 0; iq < names[i].length; iq++) { //all names from last 5 games
        if (JSON.stringify(nameCount).includes(JSON.stringify(names[i][iq]['name']))) {
          for (var ir = 0; ir < nameCount.length; ir++) {
            if (JSON.stringify(nameCount[ir]['name']) == JSON.stringify(names[i][iq]['name'])) {
              if (names[i][iq]['correct'] == true) {
              nameCount[ir]['score'] += 1;
            }else {
              nameCount[ir]['score'] += 0;
            }
            }
          }
        }else{
          if (names[i][iq]['correct'] == true) {

          nameCount.unshift({name: names[i][iq]['name'], score: 1, photo: names[i][iq]['photo']});
        }else {
          nameCount.unshift({name: names[i][iq]['name'], score: 0, photo: names[i][iq]['photo']});

        }
        }
      }
  }
  nameCount = nameCount.sort(function(a,b){return a.score - b.score});
  console.log(nameCount);
  printNames(nameCount);

}

function printNames(nameCount){
for (var i = 0; i < 3; i++) {
  var figureEntry = document.createElement('figure');
  nameList.appendChild(figureEntry);

  var entry = document.createElement('img');
  entry.src = nameCount[i]['photo'];
  figureEntry.appendChild(entry);

  var entryText = document.createElement('figcaption');
  entryText.innerHTML = nameCount[i]['name'];
  figureEntry.appendChild(entryText);
}
}
showNames();
