<script>
  import CorrectIcon from 'svelte-icons/io/IoIosCheckmarkCircle.svelte';
  import WrongIcon from 'svelte-icons/io/IoIosCloseCircle.svelte';

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
    <div class="answerchecker" transition:fade={{ duration: 250 }}>
      <div class="iconCorrect" transition:fade={{ duration: 250 }}>
        <CorrectIcon />
      </div>
      <h2 class="correct" transition:fade={{ duration: 250 }}>Correct!</h2>
    </div>
  {:else}
    <div class="answerchecker" transition:fade={{ duration: 250 }}>
      <div class="iconWrong" transition:fade={{ duration: 250 }}>
        <WrongIcon />
      </div>
      <h2 class="false" transition:fade={{ duration: 250 }}>Wrong!</h2>
    </div>
  {/if}
{/if}
<div id="container" in:fade={{ duration: 500 }}>
  <div id="flagimage" in:fade={{ duration: 500 }}>
    <img src={currentCountrySet[index].flag} alt="flag" />
  </div>
  <div id="databoard">
    <CurrentGameDataBoard {currentRoundTime} {currentGameScore} />
  </div>
  <div id="input">
    <AnswerPanel {answerButtonData} on:sendAnswer />
  </div>
</div>

<style>
  img {
    margin: 0;
    width: 200px;
    height: 150px;
    border-radius: 5px;
  }
  h2 {
    margin: 0;
    padding: 0;
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
    margin-bottom: 5px;
    margin: 20px;
  }
  .iconCorrect {
    color: rgb(80, 255, 0);
    width: 50px;
    height: 50px;
    margin-left: 24px;
    padding: 0;
  }
  .iconWrong {
    color: rgb(255, 20, 0);
    width: 50px;
    height: 50px;
    margin-left: 24px;
    padding: 0;
  }
  .answerchecker {
    position: absolute;
    top: 130px;
    left: 35vw;
    z-index: 10;
  }
  .correct {
    color: rgb(80, 255, 0);
  }
  .false {
    color: rgb(255, 20, 0);
  }
</style>
