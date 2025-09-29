<script>
  export let currentPlayer;
  export let blackCount;
  export let whiteCount;
  export let gameOver;
  export let winner;
</script>

<div class="game-info">
  {#if gameOver}
    <div class="game-over">
      <h2>{winner}</h2>
      <div class="final-score">
        <span class="score">흑돌: {blackCount}</span>
        <span class="score">백돌: {whiteCount}</span>
      </div>
    </div>
  {:else}
    <div class="current-turn">
      <span class="turn-indicator">
        현재 턴: 
        {#if currentPlayer === 1}
          <span class="black-turn">● 흑돌</span>
        {:else}
          <span class="white-turn">○ 백돌</span>
        {/if}
      </span>
    </div>
    
    <div class="score-display">
      <div class="score-item">
        <span class="score-label">흑돌</span>
        <span class="score-value black">●{blackCount}</span>
      </div>
      <div class="score-item">
        <span class="score-label">백돌</span>
        <span class="score-value white">○{whiteCount}</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .game-info {
    margin: 20px 0;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .current-turn {
    margin-bottom: 15px;
  }
  
  .turn-indicator {
    font-size: 1.3em;
    font-weight: bold;
    color: #333;
  }
  
  .black-turn {
    color: #000;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  .white-turn {
    color: #666;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  .score-display {
    display: flex;
    justify-content: center;
    gap: 30px;
  }
  
  .score-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  
  .score-label {
    font-size: 0.9em;
    color: #666;
    font-weight: 500;
  }
  
  .score-value {
    font-size: 1.5em;
    font-weight: bold;
    padding: 8px 15px;
    border-radius: 25px;
    min-width: 60px;
    text-align: center;
  }
  
  .score-value.black {
    background: linear-gradient(135deg, #434343 0%, #000000 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  }
  
  .score-value.white {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    color: #333;
    border: 2px solid #ddd;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
  
  .game-over {
    text-align: center;
  }
  
  .game-over h2 {
    font-size: 2em;
    color: #e74c3c;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    animation: celebration 1s ease-in-out;
  }
  
  .final-score {
    display: flex;
    justify-content: center;
    gap: 30px;
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .final-score .score {
    padding: 10px 20px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
  
  @keyframes celebration {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
</style>