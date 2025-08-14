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
    if (board[row] && board[row][col] === null) {
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
  let gameEnded = false;
  let winningCells = [];
  const gameBoard = Gameboard();

  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;
  const isGameEnded = () => gameEnded;
  const getWinningCells = () => winningCells;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  function chkLine(a, b, c) {
    return a != null && a === b && a === c;
  }

  function chkWinner(bd, player) {
    let winPatterns = [
      // rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (chkLine(bd[a[0]][a[1]], bd[b[0]][b[1]], bd[c[0]][c[1]])) {
        winningCells = pattern;
        return `${player.name} won!`;
      }
    }
    return null;
  }

  const playRound = (row, col) => {
    if (gameEnded) return "Game over! Reset to play again.";

    const currentPlayer = getActivePlayer();
    let board = gameBoard.addToken(row, col, currentPlayer.token);

    if (board === "invalid") return "Invalid move";

    movesCounter++;

    let winner = chkWinner(board, currentPlayer);
    if (winner) {
      gameEnded = true;
      return winner;
    }

    if (movesCounter === 9) {
      gameEnded = true;
      return "It's a tie!";
    }

    switchPlayerTurn();
    return `${getActivePlayer().name}'s turn`;
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    movesCounter = 0;
    gameEnded = false;
    winningCells = [];
    activePlayer = players[0];
  };

  return {
    playRound,
    getBoard: gameBoard.getBoard,
    resetGame,
    getActivePlayer,
    isGameEnded,
    getWinningCells,
  };
}

// DOM Logic
document.addEventListener("DOMContentLoaded", () => {
  const game = GameController();
  const boardEl = document.querySelector(".board");
  const statusEl = document.querySelector(".status");
  const resetBtn = document.querySelector("#reset-btn");
  const backBtn = document.querySelector("#back-btn");
  const gameContainer = document.querySelector(".game-container");

  const renderBoard = () => {
    boardEl.innerHTML = "";
    const board = game.getBoard();
    const winningCells = game.getWinningCells();

    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.textContent = cell ? cell : "";

        // Highlight winning cells
        const isWinningCell = winningCells.some(
          ([wr, wc]) => wr === r && wc === c
        );
        if (isWinningCell) {
          cellEl.classList.add("winning");
        }

        cellEl.addEventListener("click", () => handleMove(r, c));
        boardEl.appendChild(cellEl);
      });
    });
  };

  const handleMove = (r, c) => {
    const result = game.playRound(r, c);
    statusEl.textContent = result;

    // Add status styling based on game state
    statusEl.className = "status";
    if (result.includes("won")) {
      statusEl.classList.add("winner");
    } else if (result.includes("tie")) {
      statusEl.classList.add("tie");
    }

    // Add game over animation
    if (game.isGameEnded() && !gameContainer.classList.contains("game-over")) {
      gameContainer.classList.add("game-over");
      setTimeout(() => {
        gameContainer.classList.remove("game-over");
      }, 500);
    }

    renderBoard();
  };

  resetBtn.addEventListener("click", () => {
    game.resetGame();
    statusEl.textContent = `${game.getActivePlayer().name}'s turn`;
    statusEl.className = "status"; // Reset status styling
    gameContainer.classList.remove("game-over");
    renderBoard();
  });

  // Back button functionality
  backBtn.addEventListener("click", () => {
    // Go back to main menu (adjust path as needed)
    window.location.href = "../index.html";
  });

  // Initial render
  statusEl.textContent = `${game.getActivePlayer().name}'s turn`;
  renderBoard();
});
