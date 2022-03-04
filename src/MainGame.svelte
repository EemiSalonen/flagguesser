<script>
  import AnswerPanel from './AnswerPanel.svelte';
  import CurrentGameDataBoard from './CurrentGameDataBoard.svelte';

  export let currentCountrySet;
  export let index;
  export let answerButtonData;
  export let currentRoundTime;
  export let currentGameScore;
  export let answerCorrect;
  export let showAnswer;
  export let countryDataArray;
</script>

{#if showAnswer}
  {#if answerCorrect}
    <div class="answerchecker"><h2 class="correct">Correct!</h2></div>
  {:else}
    <div class="answerchecker"><h2 class="false">Wrong!</h2></div>
  {/if}
{/if}
<div id="container">
  <div id="flagimage">
    <img src={currentCountrySet[index].flag} alt="flag" />
  </div>
  <div id="input">
    <AnswerPanel {answerButtonData} on:sendAnswer />
  </div>
  <div id="databoard">
    <CurrentGameDataBoard {currentRoundTime} {currentGameScore} />
  </div>
  <div id="flagboard">
    {#each countryDataArray as country}
      <div>
        <div id="card">
          <img src={country.flag} alt="flag" id="flag" />
        </div>
        <p class={country.answerBool === 'Correct!' ? 'correct' : 'false'}>
          {country.answerBool}
        </p>
      </div>
    {/each}
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
  #flagboard {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  #flagimage {
    display: flex;
    justify-content: center;
  }
  #flag {
    width: 80px;
    height: 100px;
    margin: 10px;
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
