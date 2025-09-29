<script>
  import Board from './Board.svelte';
  import GameInfo from './GameInfo.svelte';
  
  // 게임 상태
  let board = Array(8).fill().map(() => Array(8).fill(0));
  let currentPlayer = 1; // 1: 흑돌, 2: 백돌
  let gameOver = false;
  let winner = '';
  
  // 초기 돌 배치
  board[3][3] = 2;
  board[3][4] = 1;
  board[4][3] = 1;
  board[4][4] = 2;
  
  // 방향 벡터 (8방향)
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  // 유효한 수인지 확인
  function isValidMove(row, col, player) {
    if (board[row][col] !== 0) return false;
    
    for (let [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;
      let hasOpponent = false;
      
      while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] !== 0) {
        if (board[r][c] === 3 - player) {
          hasOpponent = true;
        } else if (board[r][c] === player && hasOpponent) {
          return true;
        } else {
          break;
        }
        r += dr;
        c += dc;
      }
    }
    return false;
  }
  
  // 돌 뒤집기
  function flipPieces(row, col, player) {
    board[row][col] = player;
    
    for (let [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;
      let toFlip = [];
      
      while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] !== 0) {
        if (board[r][c] === 3 - player) {
          toFlip.push([r, c]);
        } else if (board[r][c] === player && toFlip.length > 0) {
          for (let [fr, fc] of toFlip) {
            board[fr][fc] = player;
          }
          break;
        } else {
          break;
        }
        r += dr;
        c += dc;
      }
    }
  }
  
  // 유효한 수가 있는지 확인
  function hasValidMoves(player) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValidMove(row, col, player)) {
          return true;
        }
      }
    }
    return false;
  }
  
  // 게임 종료 체크
  function checkGameOver() {
    const blackHasMoves = hasValidMoves(1);
    const whiteHasMoves = hasValidMoves(2);
    
    if (!blackHasMoves && !whiteHasMoves) {
      gameOver = true;
      const blackCount = board.flat().filter(cell => cell === 1).length;
      const whiteCount = board.flat().filter(cell => cell === 2).length;
      
      if (blackCount > whiteCount) {
        winner = '흑돌 승리!';
      } else if (whiteCount > blackCount) {
        winner = '백돌 승리!';
      } else {
        winner = '무승부!';
      }
    }
  }
  
  // 돌 놓기
  function makeMove(row, col) {
    if (gameOver || !isValidMove(row, col, currentPlayer)) {
      return;
    }
    
    flipPieces(row, col, currentPlayer);
    board = [...board]; // 반응성을 위한 새 배열 생성
    
    // 다음 플레이어로 변경
    currentPlayer = 3 - currentPlayer;
    
    // 현재 플레이어가 둘 수 없으면 턴 스킵
    if (!hasValidMoves(currentPlayer)) {
      currentPlayer = 3 - currentPlayer;
      
      // 둘 다 둘 수 없으면 게임 종료
      if (!hasValidMoves(currentPlayer)) {
        checkGameOver();
      }
    }
    
    checkGameOver();
  }
  
  // 게임 리셋
  function resetGame() {
    // 임시로 다른 값으로 설정
    currentPlayer = 2;
    gameOver = true;

    // 보드 초기화
    board = Array(8).fill().map(() => Array(8).fill(0));
    board[3][3] = 2;
    board[3][4] = 1;
    board[4][3] = 1;
    board[4][4] = 2;

    //잠시 후 정상 값으로 복구
    setTimeout(() => {
      currentPlayer = 1;
      gameOver = false;
      winner = '';
      board = [...board];
    }, 0);
  }
  
  // 돌 개수 계산
  $: blackCount = board.flat().filter(cell => cell === 1).length;
  $: whiteCount = board.flat().filter(cell => cell === 2).length;
</script>

<main>
  <h1>🔵 1주차 오셀로 게임 ⚫</h1>
  
  <GameInfo 
    {currentPlayer} 
    {blackCount} 
    {whiteCount} 
    {gameOver} 
    {winner} 
  />
  
  <Board {board} {currentPlayer} {isValidMove} on:move={(e) => makeMove(e.detail.row, e.detail.col)} />
  
  <button class="reset-btn" on:click={resetGame}>
    게임 재시작
  </button>
</main>

<style>
  main {
    text-align: center;
    background: white;
    border-radius: 20px;
    padding: 15px; /* 더 줄임 */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    width: 100%; 
    max-width: 100%; 
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: min(2.2em, 6vw); /* 반응형 폰트 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .reset-btn {
    margin-top: 20px;
    padding: 12px 24px;
    font-size: 1.1em;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .reset-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  .reset-btn:active {
    transform: translateY(0);
  }
  
  /* 모바일 대응 */
  @media (max-width: 480px) {
    main {
      padding: 10px; /* 더 줄임 */
      border-radius: 15px;
    }
    
    h1 {
      font-size: 1.6em; /* 더 작게 */
      margin-bottom: 10px;
    }
    
    .reset-btn {
      padding: 8px 16px; /* 더 작게 */
      font-size: 0.9em;
    }
  }
  
  /* 아주 작은 화면 (아이폰13 미니 등) */
  @media (max-width: 375px) {
    main {
      padding: 6px;
      border-radius: 10px;
    }
    
    h1 {
      font-size: 5vw;
      margin-bottom: 6px;
    }
    
    .reset-btn {
      padding: 6px 12px;
      font-size: 0.8em;
      margin-top: 10px;
    }
  }
</style>
