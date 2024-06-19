const Gameboard = function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(null);
    }
  }

  const getBoard = () => board;

  const dropToken = (row, col, val) => {
    if (board[row][col] !== null) {
      return console.log("already have value");
    } else {
      board[row][col] = val;
      }
    return chkWinner(board);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell));
    console.log(boardWithCellValues);
  };

  return {getBoard, dropToken, printBoard, chkWinner };
};


function CheckWinner(){
  function chkLine(a, b, c) {
    return a != 0 && b === a && c === a;
  }

  function chkWinner(bd) {
    let result;
    for (let r = 0; r < 1; r++) {
      for (let c = 0; c < 3; c++) {
        if (
          chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c]) &&
          bd[r][c] !== null
        ) {
          result = `found three in down`;
        }
      }
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 1; c++) {
        if (
          chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2]) &&
          bd[r][c] !== null
        ) {
          result = `found three in right`;
        }
      }
    }

    for (let r = 0; r < 1; r++) {
      for (let c = 0; c < 3; c++) {
        if (
          chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2]) &&
          bd[r][c] !== null
        ) {
          result = `found three in right-down`;
        }
      }
    }

    for (let r = 0; r < 1; r++) {
      for (let c = 0; c < 3; c++) {
        if (
          chkLine(bd[r][c], bd[r + 1][c - 1], bd[r + 2][c - 2]) &&
          bd[r][c] !== null
        ) {
          result = `${bd[r]} found three in left-down`;
        }
      }
    }
    return result;
  }

  return {chkWinner}

}

function GameController(
  playerOneName = "X",
  playerTwoName = "O"
) {

}
