var table = [];
for (var i = 1; i <= 9; i++) {
    table[i] = [];
    for (var j = 1; j <= 9; j++) {
        table[i][j] = 0;
    }
}
var input = 0;

//creates playing board
function loadTable() {
  for (var i = 1; i <= 9; i++) {
    $('#table').append(`
      <tr></tr>
    `)
    for (var j = 1; j <= 9; j++) {
        $('#table').append(`
          <td><button type="button" class="btn btn-success btn-lg" id = "` + i + + j +`" onclick = "introduceNumber(id);">0</button></td>
        `);
    }
  }
  for (var i = 1; i <= 9; i++) {
    $('#buttons').append(`
      <td><button type="button" class="btn btn-secondary btn-lg" id = "`+ i + `" onclick = "inputNumber(id);">`+ i +`</button></td>
    `);
  }
  randomise();
}

//+ function randomValue() randomly displays numbers by game rules
function randomise() {
    for (var i = 1; i <= 9; i++) {
      for (var j = 1; j <= 9; j++) {
        if ((i == 1 || i == 4 || i == 7) && (j == 1 || j == 4 || j == 7)) {
          for (var a = 1; a <= 3; a++) {
            randomValue(i, j);
          }
        }
      }
    }
}

function randomValue(i, j) {
  var row =  Math.floor(Math.random() * ((i + 2) - i + 1) + i);
  var column = Math.floor(Math.random() * ((j + 2) - j + 1) + j);
  var nr = Math.floor(Math.random() * 9) + 1;
  table[row][column] = nr;
  if(checkByGameRules() == 1) {
    var id = row + String(column);
    document.getElementById(id).innerHTML = nr;
    document.getElementById(id).className = "btn btn-danger btn-lg";
  } else {
    table[row][column] = 0;
    randomValue(i, j);
  }
}

//stocks the selected number
function inputNumber(id) {
  input = parseInt(id);
  document.getElementById("input").innerHTML = "Selected number: " + input;
  document.getElementById("input").style.color = "green";  
}

//introduces selected number to table
function introduceNumber(id) {
  var row = Math.floor(parseInt(id) / 10);
  var column = Math.floor(parseInt(id) % 10);
  if (input == 0) {
    document.getElementById("input").innerHTML = "Select a number to introduce!"; 
    document.getElementById("input").style.color = "red"; 
  } else if (table[row][column] == 0){ 
    table[row][column] = input; 
    if(checkByGameRules() == 1) {
      document.getElementById(id).innerHTML = input;
      document.getElementById(id).className = "btn btn-danger btn-lg";
      document.getElementById("status").innerHTML = " ";
      gameStatus();
    } else {
      document.getElementById("status").innerHTML = "Not allowed";
      document.getElementById("status").style.color = "red"; 
      table[row][column] = 0;
    }
  } else {
    document.getElementById("status").innerHTML = "Not allowed";
    document.getElementById("status").style.color = "red"; 
  }

}

//checks if the numbers from the board are displayed correcty
function checkByGameRules() {
  var ok = 1;
  for(var i = 1; i <= 9; i++) {
      for(var j = 1; j <= 9; j++) {
         for(var k = j + 1; k <= 9; k++) { //checks rows
            if(table[i][j] == table[i][k]&& table[i][j] != 0) {
              ok = 0;
            }
          }
          for (var k = i + 1; k <= 9; k++) { //checks columns
            if(table[i][j] == table[k][j] && table[i][j] != 0) {
              ok = 0;
            }
          }
          if((i == 1 || i == 4 || i == 7) && (j == 1 || j == 4 || j == 7)) { //checks 3x3 blocks
              for(var a = i; a <= i + 2; a++) {
                  for(var b = j; b <= j + 2; b++) {
                      for(var c = a; c <= i + 2; c++) {
                          for(var d = b + 1; d <= j + 2; d++) {
                              if(table[a][b] == table[c][d] && table[a][b] != 0) {
                                  ok = 0;
                              }
                          }
                      }
                  }
              }
          }
      }
  }
  if (ok == 1) {
    return 1;
  }
  return 0;
}

//checks if the table is completed
function gameStatus() {
  var ok = 1;
  for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
      if (table[i][j] == 0) {
        ok = 0;
        break;
      }
    }
  }
  if (ok == 1) {
    document.getElementById("status").innerHTML = "You won!";
    document.getElementById("status").style.color = "green";
  }
}

function restartGame() {
  location.reload();
}
