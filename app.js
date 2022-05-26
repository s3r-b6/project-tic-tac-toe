window.onload = () => {
  //modules
  let turn = 0;

  //el tablero es un array de 3 arrays (rows)
  let gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];
  let clearBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  function drawBoard() {
    document.querySelector('#display').innerHTML = '';
    document.querySelector('#display').innerHTML += `
    <div id="screen"> texto de prueba </div>
    <div id="boardContainer">
      <div class='row r0'>
        <p class="gridContent c0">${gameBoard[0][0]}</p>
        <p class="gridContent c1">${gameBoard[0][1]}</p>
        <p class="gridContent c2">${gameBoard[0][2]}</p>
      </div>
      <div class='row r1'>
        <p class="gridContent c0">${gameBoard[1][0]}</p>
        <p class="gridContent c1">${gameBoard[1][1]}</p>
        <p class="gridContent c2">${gameBoard[1][2]}</p>
      </div>
      <div class='row r2'>
        <p class="gridContent c0">${gameBoard[2][0]}</p>
        <p class="gridContent c1">${gameBoard[2][1]}</p>
        <p class="gridContent c2">${gameBoard[2][2]}</p>
      </div>
    </div>
      `;
    game();
  }

  function game() {
    //descubre qué casilla se ha clickado y devuelve la posición
    document.querySelectorAll('.gridContent').forEach((el) => {
      el.addEventListener('click', (e) => {
        console.log(e.target);

        let row = e.target.parentNode.classList[1][1];
        let column = e.target.classList[1][1];
        console.log(row, column);

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
          console.log('casilla ocupada');
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
      gameBoard[0][2] == '⭕' && gameBoard[1][1] == '⭕' && gameBoard[0][2] == '⭕' ||
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
      gameBoard[0][2] == '❌' && gameBoard[1][1] == '❌' && gameBoard[0][2] == '❌' ||
      gameBoard[0][0] == '❌' && gameBoard[1][1] == '❌' && gameBoard[2][2] == '❌'
    ) {
      let winner = 'winner: ❌';
      console.log(winner);

    } else {
      return;
    }

    //pop del ganador
    console.log('test test test');

  }

  drawBoard();
};
