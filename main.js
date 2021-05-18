var table = [];
for (var i = 1; i <= 9; i++) {
    table[i] = [];
    for (var j = 1; j <= 9; j++) {
        table[i][j] = 0;
    }
}

function loadTable() {
  // number input;
  for (var i = 1; i <= 9; i++) {
    $('#table').append(`
      <tr></tr>
    `)
    for (var j = 1; j <= 9; j++) {
        $('#table').append(`
          <td><button type="button" class="btn btn-secondary btn-lg" id = "` + i + " " + j +`">0</button></td>
        `);
    }
  }
}

function checkByGameRules() {
  
}

function restartGame() {
  location.reload();
}