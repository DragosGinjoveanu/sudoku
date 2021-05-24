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
  var row = randomNumber(i);
  var column = randomNumber(j); 
  var nr = Math.floor(Math.random() * 9) + 1;
  table[row][column] = nr;
  if (checkByGameRules() == 1) {
    var id = row + String(column);
    document.getElementById(id).innerHTML = nr;
    document.getElementById(id).className = "btn btn-danger btn-lg";
  } else {
    table[row][column] = 0;
    randomValue(i, j);
  }
}

function randomNumber(nr) {
  return Math.floor(Math.random() * ((nr + 2) - nr + 1) + nr);
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
  if (checkByRows() == 0 || checkByColumns() == 0 || checkByBlocks() == 0) {
    return 0;
  }
  return 1;
}

function checkByBlocks() {
  for (var i = 1; i <= 7; i += 3) {
    for (var j = 1; j <= 7; j += 3) {
      var numbers = [];
      for (var a = i; a <= i + 2; a++) {
        for (var b = j; b <= j + 2; b++) {
          numbers.push(table[a][b]);
        }
      }
      for (var c = 0; c < numbers.length - 1; c++) {
        for (var d = c + 1; d < numbers.legth; d++) {
          if (numbers[a] == numbers[b] && numbers[a] != 0) {
            return 0;
          }
        }
      }
    }
  }
  return 1;
}

function checkByRows() {
  for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
       for (var k = j + 1; k <= 9; k++) {
          if (table[i][j] == table[i][k] && table[i][j] != 0) {
            return 0;
          }
        }
    }
  }
  return 1;
}

function checkByColumns() {
  for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
      for (var k = i + 1; k <= 9; k++) {
        if (table[i][j] == table[k][j] && table[i][j] != 0) {
          return 0;
        }
      }
    }
  }
  return 1;
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
