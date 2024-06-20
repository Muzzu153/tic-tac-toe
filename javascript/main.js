const Gameboard = function () {
  const rows = 3;
  const columns = 3;
  let board = [];

  const makeBoard = ()=>{
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(null);
      }
    }
    return board
  }
  board = makeBoard();

  const getBoard = () => {
    return board;
  };

  const addToken = (row, col, val) => {
    if (board[row][col] === null) {
      board[row][col] = val;
    } else {
      return "invalid";
    }
    return board;
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell));
    console.log(boardWithCellValues);
  };

  const resetBoard = makeBoard;

  return { getBoard, addToken, printBoard, resetBoard };
};

function GameController(
  playerOneName = "player One",
  playerTwoName = "player two"
) {
  let movesCounter = 0;
  const gameBoard = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  // function getWinner() {
  function chkLine(a, b, c) {
    return a != null && b === a && c === a;
  }

  function chkWinner(bd) {
    let result;
    for (let r = 0; r < 1; r++) {
      for (let c = 0; c < 3; c++) {
        if (chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c])) {
          result = `${getActivePlayer().name} won`;
        }
      }
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 1; c++) {
        if (chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2])) {
          result = `${getActivePlayer().name} won`;
        }
      }
    }

    for (let r = 0; r < 1; r++) {
      for (let c = 0; c < 3; c++) {
        if (chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2])) {
          result = `${getActivePlayer().name} won`;
        }
      }
    }

    for (let r = 0; r < 1; r++) {
      for (let c = 0; c < 3; c++) {
        if (chkLine(bd[r][c], bd[r + 1][c - 1], bd[r + 2][c - 2])) {
          result = `${getActivePlayer().name} won`;
        }
      }
    }
    return result;
  }

  // return { chkWinner };
  // }
  const checkTie = () =>{
    if(movesCounter===9){
      gameBoard.resetBoard();
      return "it's a tie"
    }
  }

  const printNewRound = () => {
    gameBoard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };


  const playRound = (row, col) => {
    let board = gameBoard.addToken(row, col, getActivePlayer().token);

    let result = chkWinner(board);
    if(checkTie){
      result = checkTie();
    }

    
    if(board !== "invalid") {
      switchPlayerTurn();
      movesCounter++;
    }


    console.log(movesCounter)
    if(movesCounter===9){
      gameBoard.resetBoard();
      printNewRound();
      return "it's a tie"
    }


    printNewRound();

    return result;
  };

  printNewRound();
  return { printNewRound, playRound };
}

const game = GameController();
