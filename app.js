window.onload = () => {
  //el tablero es un array de 3 arrays (rows)
  let turn = 0;
  let gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  function drawBoard() {
    document.querySelector('#display').innerHTML = '';
    for (r in gameBoard) {
      //console.log('row:' + r)
      document.querySelector('#display').innerHTML += `
        <div class='row r${r}'></div> `;
      document.querySelector("#display > div.row.r0")

      for (c in gameBoard[r]) {
        //console.log('col:' + c)
        document.querySelector(`.r${r}`).innerHTML += `
            <p class="gridContent c${c}">${gameBoard[r][c]}</p>
      `
      }
    };
    startGame();
  }

  function startGame() {
    //descubre qué casilla se ha clickado y devuelve la posición
    document.querySelectorAll('.gridContent').forEach((el) => {
      el.addEventListener('click', (e) => {
        // console.log(e.target);
        let row = e.target.parentNode.classList[1][1];
        let column = e.target.classList[1][1];
        // console.log(row, column);

        //descubre si la casilla está vacía o no
        let currValue = gameBoard[row][column];
        if (currValue == ' ') {
          if (turn % 2 == 0) {
            gameBoard[row][column] = '⭕';
            turn++;
            drawBoard()
            checkWinner()
          } else if (!turn % 2 == 0) {
            gameBoard[row][column] = '❌';
            turn++;
            drawBoard();
            checkWinner();
          }
        } else if (currValue == '❌' || currValue == '⭕') {
          document.querySelector(`.r${row} > .c${column}`).classList.add('taken');
          setTimeout(() => {
            document.querySelector(`.r${row} > .c${column}`).classList.remove('taken');
          }, 650);
        }
      });
    });
  }

  function checkWinner() {
    function checkRow(row) {
      let rowValues = gameBoard[row];
      let rowWinner = rowValues.join('');
      if (rowWinner == '⭕⭕⭕' || rowWinner == '❌❌❌') {
        console.log('rowWinner: ' + rowWinner);
      }
    }

    function checkColumn(column) {
      let columnValues = [];
      for (let i = 0; i < gameBoard.length; i++) {
        columnValues.push(gameBoard[i][column]);
      }
      let columnWinner = columnValues.join('');
      if (columnWinner == '⭕⭕⭕' || columnWinner == '❌❌❌') {
        console.log('columnWinner: ' + columnWinner);
      }
    }

    function checkDiagonal(diagonal) {
      let diagonalValues = [];
      if (diagonal == 'topLeftToBottomRight') {
        for (let i = 0; i < gameBoard.length; i++) {
          diagonalValues.push(gameBoard[i][i]);
        }
      } else if (diagonal == 'topRightToBottomLeft') {
        for (let i = 0; i < gameBoard.length; i++) {
          diagonalValues.push(gameBoard[i][gameBoard.length - 1 - i]);
        }
      }
      let diagonalWinner = diagonalValues.join('');
      if (diagonalWinner == '⭕⭕⭕' || diagonalWinner == '❌❌❌') {
        console.log('diagonalWinner: ' + diagonalWinner);
      }
    }
    for (let i = 0; i < gameBoard.length; i++) {
      checkRow(i);
      checkColumn(i);
      checkDiagonal('topLeftToBottomRight');
      checkDiagonal('topRightToBottomLeft');
    }
    if (turn == 9) {
      console.log('Draw!');
    }
  }

  document.querySelector('#restartButton').addEventListener('click', () => {
    document.querySelector('#display').innerHTML = '';
    gameBoard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    turn = 0;
    drawBoard();
  });

  drawBoard();
};