
    // Game state
    let board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
  
      // Utility functions
      function getEmptyTiles() {
        const emptyTiles = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
              emptyTiles.push({ x: i, y: j });
            }
          }
        }
        return emptyTiles;
      }
  
      function addRandomTile() {
        const emptyTiles = getEmptyTiles();
        if (emptyTiles.length > 0) {
          const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
          board[randomTile.x][randomTile.y] = Math.random() < 0.9 ? 2 : 4;
          updateBoard();
        }
      }
  
      function updateBoard() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '';
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[i][j] !== 0) {
              tile.textContent = board[i][j];
              tile.classList.add(`tile-${board[i][j]}`);
            }
            gameContainer.appendChild(tile);
          }
        }
      }
  
      // Game logic
      function moveUp() {
        let merged = false;
        for (let j = 0; j < 4; j++) {
          let top = 0;
          for (let i = 0; i < 4; i++) {
            if (board[i][j] !== 0) {
              if (i > top) {
                [board[top][j], board[i][j]] = [board[i][j], 0];
                merged = true;
              }
              if (i > 0 && board[i][j] === board[i - 1][j]) {
                board[i - 1][j] *= 2;
                board[i][j] = 0;
                merged = true;
              }
              top++;
            }
          }
        }
        if (merged) {
          addRandomTile();
          updateBoard();
        }
      }
  
      function moveDown() {
        let merged = false;
        for (let j = 0; j < 4; j++) {
          let bottom = 3;
          for (let i = 3; i >= 0; i--) {
            if (board[i][j] !== 0) {
              if (i < bottom) {
                [board[bottom][j], board[i][j]] = [board[i][j], 0];
                merged = true;
              }
              if (i < 3 && board[i][j] === board[i + 1][j]) {
                board[i + 1][j] *= 2;
                board[i][j] = 0;
                merged = true;
              }
              bottom--;
            }
          }
        }
        if (merged) {
          addRandomTile();
          updateBoard();
        }
      }
  
      function moveLeft() {
        let merged = false;
        for (let i = 0; i < 4; i++) {
          let left = 0;
          for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
              if (j > left) {
                [board[i][left], board[i][j]] = [board[i][j], 0];
                merged = true;
              }
              if (j > 0 && board[i][j] === board[i][j - 1]) {
                board[i][j - 1] *= 2;
                board[i][j] = 0;
                merged = true;
              }
              left++;
            }
          }
        }
        if (merged) {
          addRandomTile();
          updateBoard();
        }
      }
  
      function moveRight() {
        let merged = false;
        for (let i = 0; i < 4; i++) {
          let right = 3;
          for (let j = 3; j >= 0; j--) {
            if (board[i][j] !== 0) {
              if (j < right) {
                [board[i][right], board[i][j]] = [board[i][j], 0];
                merged = true;
              }
              if (j < 3 && board[i][j] === board[i][j + 1]) {
                board[i][j + 1] *= 2;
                board[i][j] = 0;
                merged = true;
              }
              right--;
            }
          }
        }
        if (merged) {
          addRandomTile();
          updateBoard();
        }
      }
  
      // Handle user input
      document.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'ArrowUp':
            moveUp();
            break;
          case 'ArrowDown':
            moveDown();
            break;
          case 'ArrowLeft':
            moveLeft();
            break;
          case 'ArrowRight':
            moveRight();
            break;
        }
      });
  
      // Initialize the game
      addRandomTile();
      addRandomTile();
      updateBoard();