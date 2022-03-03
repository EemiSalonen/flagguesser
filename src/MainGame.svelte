<script>
  import AnswerPanel from './AnswerPanel.svelte';
  import CurrentGameDataBoard from './CurrentGameDataBoard.svelte';

  export let currentCountrySet;
  export let index;
  export let answerButtonData;
  export let currentRoundTime;
  export let currentGameScore;

  console.log(currentCountrySet);
</script>

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
  }
  #input {
    display: flex;
    justify-content: center;
  }
  #input {
    margin-bottom: 5px;
  }
</style>
