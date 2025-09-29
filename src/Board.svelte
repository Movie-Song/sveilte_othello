<script>
  import Square from './Square.svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let board;
  export let currentPlayer;
  export let isValidMove;
  
  const dispatch = createEventDispatcher();
  
  function handleSquareClick(row, col) {
    dispatch('move', { row, col });
  }
</script>

<div class="board">
  {#each board as row, rowIndex}
    <div class="row">
      {#each row as cell, colIndex}
        <Square 
          value={cell}
          isValid={isValidMove(rowIndex, colIndex, currentPlayer)}
          on:click={() => handleSquareClick(rowIndex, colIndex)}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .board {
    display: inline-block;
    background: #2d5a27;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border: 3px solid #1a4d18;
    max-width: 90vw; /* 화면 너비의 90% 제한 */
    width: fit-content;
  }
  
  .row {
    display: flex;
  }
  
  /* 모바일에서 더 작게 */
  @media (max-width: 480px) {
    .board {
      padding: 3px;
      border: 2px solid #1a4d18;
      border-radius: 8px;
      max-width: 95vw; /* 모바일에서는 95% */
    }
  }
  
  /* 아주 작은 화면 */
  @media (max-width: 375px) {
    .board {
      padding: 2px;
      border: 1px solid #1a4d18;
      max-width: 98vw; /* 아주 작은 화면에서는 98% */
    }
  }
</style>