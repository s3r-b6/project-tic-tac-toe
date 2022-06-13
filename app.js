window.onload = () => {
  drawBoard();
  restartHandler();
};

//the board is a 2d array, winner is a flag to check if the game has ended, turn is a counter, used to check whose turn it is and if there has been a tie
let turn = 0;
let winner = false;
let gameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

function drawBoard() {
  document.querySelector("#display").innerHTML = "";
  for (r in gameBoard) {
    document.querySelector("#display").innerHTML += `
        <div class='row r${r}'></div> `;
    document.querySelector("#display > div.row.r0");

    for (c in gameBoard[r]) {
      document.querySelector(`.r${r}`).innerHTML += `
            <p class="gridContent c${c}">${gameBoard[r][c]}</p>
      `;
    }
  }
  drawPick();

  function drawPick() {
    //find out what box has been clicked and return that
    document.querySelectorAll(".gridContent").forEach((el) => {
      el.addEventListener("click", handleBoxClick());
    });

    function handleBoxClick() {
      return (e) => {
        let row = e.target.parentNode.classList[1][1];
        let column = e.target.classList[1][1];
        //check if the box is empty or not
        let currValue = gameBoard[row][column];
        if (currValue == " " && winner == false) {
          if (turn % 2 == 0) {
            gameBoard[row][column] = "⭕";
            turn++;
            drawBoard();
            checkWinner();
          } else if (!turn % 2 == 0) {
            gameBoard[row][column] = "❌";
            turn++;
            drawBoard();
            checkWinner();
          }
        } else if (currValue == "❌" || currValue == "⭕") {
          document
            .querySelector(`.r${row} > .c${column}`)
            .classList.add("taken");
          setTimeout(() => {
            document
              .querySelector(`.r${row} > .c${column}`)
              .classList.remove("taken");
          }, 650);
        }

        //check for every win-case
        function checkWinner() {
          for (let i = 0; i < gameBoard.length; i++) {
            checkRow(i);
            checkColumn(i);
            checkDiagonal("topLeftToBottomRight");
            checkDiagonal("topRightToBottomLeft");

            function checkRow(row) {
              let rowValues = gameBoard[row];
              let rowWinner = rowValues.join("");
              if (rowWinner == "⭕⭕⭕" || rowWinner == "❌❌❌") {
                stopGame(rowWinner);
              }
            }

            function checkColumn(column) {
              let columnValues = [];
              for (let i = 0; i < gameBoard.length; i++) {
                columnValues.push(gameBoard[i][column]);
              }
              let columnWinner = columnValues.join("");
              if (columnWinner == "⭕⭕⭕" || columnWinner == "❌❌❌") {
                stopGame(columnWinner);
              }
            }

            function checkDiagonal(diagonal) {
              let diagonalValues = [];
              if (diagonal == "topLeftToBottomRight") {
                for (let i = 0; i < gameBoard.length; i++) {
                  diagonalValues.push(gameBoard[i][i]);
                }
              } else if (diagonal == "topRightToBottomLeft") {
                for (let i = 0; i < gameBoard.length; i++) {
                  diagonalValues.push(gameBoard[i][gameBoard.length - 1 - i]);
                }
              }
              let diagonalWinner = diagonalValues.join("");
              if (diagonalWinner == "⭕⭕⭕" || diagonalWinner == "❌❌❌") {
                stopGame(diagonalWinner);
              }
            }
            //if it is turn 9 and there is no winner it means there is a tie
            if (turn == 9 && winner == false) {
              stopGame(false);
            }
          }

          function stopGame(who) {
            let winnerScreen = document.createElement("div");
            winnerScreen.id = "winnerScreen";
            winnerScreen.classList.add("hidden");
            if (who) {
              winnerScreen.innerHTML = `
                <h2> ${who} wins the game! </h2>
                `;
            } else {
              winnerScreen.innerHTML = `
                <h2> It is a draw! </h2>
                `;
            }
            document.querySelector("main").append(winnerScreen);
            winner = true;
            setTimeout(() => {
              winnerScreen.classList.remove("hidden");
            }, 100);
          }
        }
      };
    }
  }
}
function restartHandler() {
  document.querySelector("#restartButton").addEventListener("click", () => {
    if (document.querySelector("#winnerScreen")) {
      document.querySelector("#winnerScreen").classList.add("hidden");
      setTimeout(() => {
        document.querySelectorAll("#winnerScreen").forEach((el) => el.remove());
      }, 300);
    }
    gameBoard = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    turn = 0;
    winner = false;
    drawBoard();
  });
}
