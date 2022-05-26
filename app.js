window.onload = () => {
  //modules
  let turn = 0
  //el tablero es un array de 3 arrays (rows)
  let gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ]

  // //factory function
  // const player = (name) => {
  //   //dentro se pueden guardar los métodos y las propiedades
  //   const getTurn = () => {
  //     console.log('testTurn');
  //     return true;
  //   }
  //   const getScore = () => console.log('testScore')
  //
  //   return {
  //     name,
  //     getTurn,
  //     getScore
  //   }
  // }
  //
  // //init players:
  // const playerO = player('playerO')
  // const playerX = player('playerX')
  // console.log(playerO, playerX)

  function drawBoard() {
    document.querySelector("#display").innerHTML = ''
    document.querySelector("#display").innerHTML += `
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
      `
    game()
  }

  function game() {
    //descubre qué casilla se ha clickado y devuelve la posición
    document.querySelectorAll(".gridContent").forEach((el) => {
      el.addEventListener("click", (e) => {
        console.log(e.target);

        let row = e.target.parentNode.classList[1][1]
        let column = e.target.classList[1][1]
        console.log(row, column);

        //descubre si la casilla está vacía o no
        let currValue = gameBoard[row][column]
        if (currValue == ' ') {
          if (turn % 2 == 0) {
            gameBoard[row][column] = 'O'
            turn++
            console.log('turn:' + turn)
          } else if (!turn % 2 == 0) {
            gameBoard[row][column] = 'X'
            turn++
          }
          drawBoard()
        } else if (!currValue == 'X' || 'O') {
          console.log('casilla ocupada')
        }

        console.log(currValue);


        //descubre de qué jugador es el turno y coloca
      })
    })
  }

  drawBoard()
}
