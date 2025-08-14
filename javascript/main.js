// Gameboard Module
const Gameboard = function () {
  const rows = 3;
  const columns = 3;
  let board = [];

  const makeBoard = () => {
    const newBoard = [];
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < columns; j++) {
        newBoard[i][j] = null;
      }
    }
    return newBoard;
  };

  const resetBoard = () => {
    board = makeBoard();
  };

  const getBoard = () => board;

  const addToken = (row, col, val) => {
    if (board[row][col] === null) {
      board[row][col] = val;
      return board;
    }
    return "invalid";
  };

  resetBoard(); // initialize board

  return { getBoard, addToken, resetBoard };
};

// Game Controller Module
function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  let movesCounter = 0;
  const gameBoard = Gameboard();

  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  function chkLine(a, b, c) {
    return a != null && a === b && a === c;
  }

  function chkWinner(bd, player) {
    let winPatterns = [
      // rows
      [bd[0][0], bd[0][1], bd[0][2]],
      [bd[1][0], bd[1][1], bd[1][2]],
      [bd[2][0], bd[2][1], bd[2][2]],
      // columns
      [bd[0][0], bd[1][0], bd[2][0]],
      [bd[0][1], bd[1][1], bd[2][1]],
      [bd[0][2], bd[1][2], bd[2][2]],
      // diagonals
      [bd[0][0], bd[1][1], bd[2][2]],
      [bd[0][2], bd[1][1], bd[2][0]],
    ];

    for (let line of winPatterns) {
      if (chkLine(...line)) {
        return `${player.name} won!`;
      }
    }
    return null;
  }

  const playRound = (row, col) => {
    const currentPlayer = getActivePlayer();
    let board = gameBoard.addToken(row, col, currentPlayer.token);

    if (board === "invalid") return "Invalid move";

    movesCounter++;

    let winner = chkWinner(board, currentPlayer);
    if (winner) return winner;

    if (movesCounter === 9) return "It's a tie!";

    switchPlayerTurn();
    return `${getActivePlayer().name}'s turn`;
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    movesCounter = 0;
    activePlayer = players[0];
  };

  return {
    playRound,
    getBoard: gameBoard.getBoard,
    resetGame,
    getActivePlayer,
  };
}

// DOM Logic
document.addEventListener("DOMContentLoaded", () => {
  const game = GameController();
  const boardEl = document.querySelector(".board");
  const statusEl = document.querySelector(".status");
  const resetBtn = document.querySelector("#reset-btn");

  const renderBoard = () => {
    boardEl.innerHTML = "";
    const board = game.getBoard();
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.textContent = cell ? cell : "";
        cellEl.addEventListener("click", () => handleMove(r, c));
        boardEl.appendChild(cellEl);
      });
    });
  };

  const handleMove = (r, c) => {
    const result = game.playRound(r, c);
    statusEl.textContent = result;
    renderBoard();
  };

  resetBtn.addEventListener("click", () => {
    game.resetGame();
    statusEl.textContent = `${game.getActivePlayer().name}'s turn`;
    renderBoard();
  });

  // Initial render
  statusEl.textContent = `${game.getActivePlayer().name}'s turn`;
  renderBoard();
});
