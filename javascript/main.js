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

  function chkLine(a, b, c) {
    // Check first cell non-zero and all cells match
    return a != 0 && b === a && c === a;
  }
  // const dropToken = (column, player) => {
  //   const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

  //   if (!availableCells.length) return;

  //   const lowestRow = availableCells.length - 1;
  //   board[lowestRow][column].addToken(player);
  // };

  function chkLine(a, b, c) {
    // Check first cell non-zero and all cells match
    return a != 0 && b === a && c === a;
  }

  function chkWinner(bd) {
    let result;
    for (let r = 0; r < 1; r++) {
      // const element = array[r];
      for (let c = 0; c < 3; c++) {
        // co element = array[c];
        if (
          chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c]) &&
          bd[r][c] !== null
        ) {
          result = `found three in down`;
        }
      }
    }

    for (let r = 0; r < 3; r++) {
      // const element = array[r];
      for (let c = 0; c < 1; c++) {
        // co element = array[c];
        if (
          chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2]) &&
          bd[r][c] !== null
        ) {
          result = `found three in right`;
        }
      }
    }

    for (let r = 0; r < 1; r++) {
      // const element = array[r];
      for (let c = 0; c < 3; c++) {
        // co element = array[c];
        if (
          chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2]) &&
          bd[r][c] !== null
        ) {
          result = `found three in right-down`;
        }
      }
    }

    for (let r = 0; r < 1; r++) {
      // const element = array[r];
      for (let c = 0; c < 3; c++) {
        // co element = array[c];
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

  // const playRound = (row, col, val) => {
  //   dropToken(row, col, val);

  //   console.log("check");
  //   chkWinner(board);
  //   console.log("check complete");
  // };

  return {getBoard, dropToken, printBoard, chkWinner };
};

// function Cell() {
//           2  let value = null;

//   // Accept a player's token to change the value of the cell
//   const addToken = (player) => {
//     value = player;
//   };

//   // How we will retrieve the current value of this cell through closure
//   const getValue = () => value;

//   return {
//     addToken,
//     getValue,
//   };
// }

function chkLine(a, b, c) {
  // Check first cell non-zero and all cells match
  return a != 0 && b === a && c === a;
}

// chkWinner(x)

let result;
function chkWinner(bd) {
  for (let r = 0; r < 1; r++) {
    // const element = array[r];
    for (let c = 0; c < 3; c++) {
      // co element = array[c];
      if (chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c])) {
        result = `${bd[r]} found three in down`;
      }
    }
  }

  for (let r = 0; r < 3; r++) {
    // const element = array[r];
    for (let c = 0; c < 1; c++) {
      // co element = array[c];
      if (chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2])) {
        result = `${bd[r]} found three in right`;
      }
    }
  }

  for (let r = 0; r < 1; r++) {
    // const element = array[r];
    for (let c = 0; c < 3; c++) {
      // co element = array[c];
      if (chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2])) {
        result = `${bd[r]} found three in right-down`;
        // return bd.indexOf(r);
      }
    }
  }

  for (let r = 0; r < 1; r++) {
    // const element = array[r];
    for (let c = 0; c < 3; c++) {
      // co element = array[c];
      if (chkLine(bd[r][c], bd[r + 1][c - 1], bd[r + 2][c - 2])) {
        result = `${bd[r]} found three in left-down`;
      }
    }
  }
  return result;
}



const dropToken = (arr, row, col, value) => {
  if (arr[row][col] !== null) {
    return console.log("already have value");
  } else {
    arr[row][col] = value;
  }
  return arr;
};
console.log(Gameboard());
// const getValue(arr, col)
const game = Gameboard();
