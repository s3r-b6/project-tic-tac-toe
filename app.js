window.onload = () => {
  //modules
  let turn = 0;

  //el tablero es un array de 3 arrays (rows)
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
    game();
  }

  function game() {
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
          } else if (!turn % 2 == 0) {
            gameBoard[row][column] = '❌';
            turn++;
          }
          checkWinner();
          drawBoard();
        }

        //si la casilla está tomada, añade la clase taken a la casilla y luego de 650 ms la retira
        else if (currValue == '❌' || currValue == '⭕') {
          document.querySelector(`.r${row} > .c${column}`).classList.add('taken');
          setTimeout(() => {
            document.querySelector(`.r${row} > .c${column}`).classList.remove('taken');
          }, 650);
          // console.log('casilla ocupada');
        }
      });
    });
  }

  function checkWinner() {
    if ( //rows
      gameBoard[0][0] == '⭕' && gameBoard[0][1] == '⭕' && gameBoard[0][2] == '⭕' ||
      gameBoard[1][0] == '⭕' && gameBoard[1][1] == '⭕' && gameBoard[1][2] == '⭕' ||
      gameBoard[2][0] == '⭕' && gameBoard[2][1] == '⭕' && gameBoard[2][2] == '⭕' ||
      //columns
      gameBoard[0][0] == '⭕' && gameBoard[1][0] == '⭕' && gameBoard[2][0] == '⭕' ||
      gameBoard[0][1] == '⭕' && gameBoard[1][1] == '⭕' && gameBoard[2][1] == '⭕' ||
      gameBoard[0][2] == '⭕' && gameBoard[1][2] == '⭕' && gameBoard[2][2] == '⭕' ||
      //diagonal
      gameBoard[0][2] == '⭕' && gameBoard[1][1] == '⭕' && gameBoard[2][0] == '⭕' ||
      gameBoard[0][0] == '⭕' && gameBoard[1][1] == '⭕' && gameBoard[2][2] == '⭕'
    ) {
      let winner = 'winner: ⭕';
      console.log(winner);

    } else if ( //rows
      gameBoard[0][0] == '❌' && gameBoard[0][1] == '❌' && gameBoard[0][2] == '❌' ||
      gameBoard[1][0] == '❌' && gameBoard[1][1] == '❌' && gameBoard[1][2] == '❌' ||
      gameBoard[2][0] == '❌' && gameBoard[2][1] == '❌' && gameBoard[2][2] == '❌' ||
      //columns
      gameBoard[0][0] == '❌' && gameBoard[1][0] == '❌' && gameBoard[2][0] == '❌' ||
      gameBoard[0][1] == '❌' && gameBoard[1][1] == '❌' && gameBoard[2][1] == '❌' ||
      gameBoard[0][2] == '❌' && gameBoard[1][2] == '❌' && gameBoard[2][2] == '❌' ||
      //diagonal
      gameBoard[0][2] == '❌' && gameBoard[1][1] == '❌' && gameBoard[2][0] == '❌' ||
      gameBoard[0][0] == '❌' && gameBoard[1][1] == '❌' && gameBoard[2][2] == '❌'
    ) {
      let winner = 'winner: ❌';
      console.log(winner);

    } else {
      return;
    }
    //pop del ganador
    console.log('test test test');
    document.querySelector('#restartButton')


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
