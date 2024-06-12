const Gameboard = (function () {
  const sayName = function (name) {
    console.log(`My name is ${name}`);
  };

  let rows = 3;
  let columns = 3;
  let board = [];

  const getBoard = () => {
    board;
  };

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, printBoard };
})();

function Cell() {
  let value = 1;

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function chkLine(a, b, c) {
  // Check first cell non-zero and all cells match
  return a != 0 && b === a && c === a;
}

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
      if (
        chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2])) {
        result = `${bd[r]} found three in right-down`;
        // return bd.indexOf(r);
      }
    }
  }

  for (let r = 0; r < 1; r++) {
    // const element = array[r];
    for (let c = 0; c < 3; c++) {
      // co element = array[c];
      if (
        chkLine(bd[r][c], bd[r + 1][c - 1], bd[r + 2][c - 2])
      ) {
        result = `${bd[r]} found three in left-down`;

      }
    }
  }
  return result;
}

x = [
  [2, 2, 2],
  [1, 1, 1],
  [3, 3, 3],
];

y =[[0, 0, 0, 0, 0, 0, 1],
   [0, 0, 0, 0, 0, 0, 1],
   [0, 0, 0, 0, 0, 0, 1],
   [0, 0, 0, 0, 0, 0, 1],
   [0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0]];
