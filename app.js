window.onload = () => {
  //modules
  let X = 'X'
  let O = 'O'
  let gameBoard = [X, X, X, O, O, O, X, X, X]
  console.log(gameBoard[0], gameBoard[1], gameBoard[2]);
  console.log(gameBoard[3], gameBoard[4], gameBoard[5]);
  console.log(gameBoard[6], gameBoard[7], gameBoard[8]);

  //factory function
  const player = (name, age) => {
    //dentro se pueden guardar los métodos y las propiedades
    const method = () => console.log('test')

    return {
      name,
      age,
      method
    }
  }

  //init players:
  function initializePlayers() {
    if (!player1 || !player2) {
      const player1 = player(name)
    }
  }

  function drawBoard() {
    let i = X
    document.querySelector("#display").innerHTML = ''
    document.querySelector("#display").innerHTML += `
    <div id="screen"> texto de prueba </div>
    <div id="boardContainer">
      <div class='row 1'>
        <p class="gridContent">${i}</p>
        <p class="gridContent">${i}</p>
        <p class="gridContent">${i}</p>
      </div>
      <div class='row 2'>
        <p class="gridContent">${i}</p>
        <p class="gridContent">${i}</p>
        <p class="gridContent">${i}</p>
      </div>
      <div class='row 3'>
        <p class="gridContent">${i}</p>
        <p class="gridContent">${i}</p>
        <p class="gridContent">${i}</p>
      </div>
    </div>
      `
  }
  drawBoard()

  const testPlayer = player('juan', 9)

  console.log(testPlayer)
}
