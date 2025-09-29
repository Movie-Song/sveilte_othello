<script>
  import { createEventDispatcher } from 'svelte';
  
  export let value; // 0: 빈칸, 1: 흑돌, 2: 백돌
  export let isValid = false;
  
  const dispatch = createEventDispatcher();
  
  function handleClick() {
    if (value === 0) {
      dispatch('click');
    }
  }
</script>

<button 
  class="square" 
  class:valid={isValid && value === 0}
  on:click={handleClick}
>
  {#if value === 1}
    <div class="piece black"></div>
  {:else if value === 2}
    <div class="piece white"></div>
  {:else if isValid}
    <div class="hint"></div>
  {/if}
</button>

<style>
  .square {
    width: min(50px, 11vw); /* 다시 키움! */
    height: min(50px, 11vw);
    background: #4a7c59;
    border: 1px solid #2d5a27;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.2s ease;
  }
  
  .square:hover {
    background: #5a8c69;
  }
  
  .square.valid {
    background: #6a9c79;
  }
  
  .piece {
    width: min(40px, 9vw); /* 돌도 키움! */
    height: min(40px, 9vw);
    border-radius: 50%;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }
  
  .piece:hover {
    transform: scale(1.05);
  }
  
  .black {
    background: radial-gradient(circle at 30% 30%, #555, #000);
  }
  
  .white {
    background: radial-gradient(circle at 30% 30%, #fff, #ddd);
    border: 1px solid #ccc;
  }
  
  .hint {
    width: min(18px, 4vw); /* 힌트도 키움! */
    height: min(18px, 4vw);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.8);
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 0.7; }
  }
  
  /* 아이폰13 미니 등 작은 화면 대응 */
  @media (max-width: 375px) {
    .square {
      width: 10vw; /* 10% × 8 = 80% (여백 20%) */
      height: 10vw;
      max-width: 40px;
      max-height: 40px;
    }
    
    .piece {
      width: 8vw;
      height: 8vw;
      max-width: 32px;
      max-height: 32px;
    }
    
    .hint {
      width: 3vw;
      height: 3vw;
      max-width: 12px;
      max-height: 12px;
    }
  }
  
  /* 더 작은 화면 */
  @media (max-width: 320px) {
    .square {
      width: 9vw; /* 9% × 8 = 72% (여백 28%) */
      height: 9vw;
      max-width: 35px;
      max-height: 35px;
    }
    
    .piece {
      width: 7vw;
      height: 7vw;
      max-width: 28px;
      max-height: 28px;
    }
    
    .hint {
      width: 2.5vw;
      height: 2.5vw;
      max-width: 10px;
      max-height: 10px;
    }
  }
</style>