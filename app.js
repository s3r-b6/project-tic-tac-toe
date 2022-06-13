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
  //clear the board and then redraw it
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
    //attach an event listener to every box
    document.querySelectorAll(".gridContent").forEach((el) => {
      el.addEventListener("click", handleBoxClick());
    });

    function handleBoxClick() {
      return (e) => {
        //clicking reinitializes the board
        //find out what box has been clicked and return that
        let row = e.target.parentNode.classList[1][1];
        let column = e.target.classList[1][1];
        //check if the box is empty or not and if there is a winner already (game ended)
        //else, draw ⭕ or ❌ deppending on if turn is even or odd
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
          //if the box is already taken, show a visual cue to let the user know that is a forbidden move
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
            //go case by case; if a case returns true, break the loop
            if (checkRow(i)) break;
            if (checkColumn(i)) break;
            if (checkDiagonal("topLeftToBottomRight")) break;
            if (checkDiagonal("topRightToBottomLeft")) break;
            //if it is turn 9 and there is no winner it means there is a tie
            if (turn == 9 && winner == false) {
              stopGame(false);
              return true;
            }
            function checkRow(row) {
              let rowValues = gameBoard[row];
              let rowWinner = rowValues.join("");
              if (rowWinner == "⭕⭕⭕" || rowWinner == "❌❌❌") {
                stopGame(rowWinner);
                return true;
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
                return true;
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
                return true;
              }
            }
          }

          function stopGame(who) {
            //create and append the winnerScreen; set winner flag to true (make it impossible to add new crosses or circles)
            //add the winnerscreen first as invisible and then remove the .hidden to make it appear with a transition
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
    //reset variables and recall the mainfunc
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
