<script>
  import { fade } from 'svelte/transition';

  import AnswerPanel from './AnswerPanel.svelte';
  import CurrentGameDataBoard from './CurrentGameDataBoard.svelte';

  export let currentCountrySet;
  export let index;
  export let answerButtonData;
  export let currentRoundTime;
  export let currentGameScore;
  export let answerCorrect;
  export let showAnswer;
</script>

{#if showAnswer}
  {#if answerCorrect}
    <div class="answerchecker"><h2 class="correct">Correct!</h2></div>
  {:else}
    <div class="answerchecker"><h2 class="false">Wrong!</h2></div>
  {/if}
{/if}
<div id="container" in:fade={{ duration: 500 }}>
  <div id="flagimage" in:fade={{ duration: 500 }}>
    <img src={currentCountrySet[index].flag} alt="flag" />
  </div>
  <div id="input">
    <AnswerPanel {answerButtonData} on:sendAnswer />
  </div>
  <div id="databoard">
    <CurrentGameDataBoard {currentRoundTime} {currentGameScore} />
  </div>
</div>

<style>
  img {
    margin: 0;
    width: 200px;
    height: 150px;
    border-radius: 5px;
  }
  #container {
    display: flex;
    flex-direction: column;
  }
  #databoard {
    display: flex;
    justify-content: center;
  }

  #flagimage {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }

  #input {
    display: flex;
    justify-content: center;
  }
  #input {
    margin-bottom: 5px;
  }
  .answerchecker {
    position: absolute;
    top: 130px;
    left: 35vw;
    z-index: 10;
  }
  .correct {
    color: rgb(102, 255, 0);
  }
  .false {
    color: rgb(255, 20, 0);
  }
</style>
