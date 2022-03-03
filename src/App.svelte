<script>
  import { randomizeCountry } from './Functions.svelte';
  import { getCountries } from './Functions.svelte';

  import MainGame from './MainGame.svelte';
  import MenuScreen from './MenuScreen.svelte';
  import ScoreScreen from './ScoreScreen.svelte';

  let allCountries = getCountries().then((data) => (allCountries = data));
  let currentCountrySet = [];
  let currentInterval;

  const scoreDataObject = {
    currentGameScore: 0,
    currentRoundTime: 0,
    startTimer: function () {
      currentInterval = setInterval(() => {
        scoreDataObject.currentRoundTime++;
      }, 1000);
    },
    resetTimer: function () {
      scoreDataObject.currentRoundTime = 0;
      clearInterval(currentInterval);
    },
  };

  let gameHistory = [];

  // Game state props
  let index = 0;
  // Game state props -

  // Menuscreen props
  let selectedContinent;
  // Menuscreen props -

  // Maingame props
  let continentalCountrySet = [];
  // Maingame props -

  // Booleans
  let gameStarted = false;
  let scoreScreen = false;
  // Booleans -

  // Functions
  // Menuscreen functions

  function startGame() {
    currentCountrySet = [];
    continentalCountrySet = allCountries.filter(
      (y) => y.region === selectedContinent
    );
    randomizeCountry(continentalCountrySet, currentCountrySet, 10);
    currentCountrySet = currentCountrySet;
    randomizeButtonSet();
    gameStarted = true;
    scoreDataObject.startTimer();
  }

  // Menuscreen -
  // Maingame

  function sendAnswer(ce) {
    if (ce.detail === currentCountrySet[index].name) {
      scoreDataObject.currentGameScore++;
    } else {
      console.log('Incorrect!');
    }
    index++;
    randomizeButtonSet();
    if (index === currentCountrySet.length) {
      gameStarted = false;
      scoreScreen = true;
      gameHistory.push({
        score: scoreDataObject.currentGameScore,
        time: scoreDataObject.currentRoundTime,
      });
      scoreDataObject.resetTimer();
    }
  }

  let answerButtonData = [];

  function randomizeButtonSet() {
    answerButtonData = [];
    randomizeCountry(continentalCountrySet, answerButtonData, 5);
    answerButtonData.splice(
      Math.floor(Math.random() * 5),
      0,
      currentCountrySet[index]
    );
    console.log(currentCountrySet[index]);
    answerButtonData = answerButtonData;
  }

  // Maingame -
  // Scorescreen
  function restart() {
    scoreScreen = false;
    index = 0;
    scoreDataObject.currentGameScore = 0;
    currentCountrySet = [];
  }
  // Scorescreen -
</script>

<main>
  <h1>FlagGuesser</h1>
  {#await allCountries}
    <p>Loading...</p>
  {:then data}
    {#if gameStarted}
      <MainGame
        {...scoreDataObject}
        {currentCountrySet}
        {answerButtonData}
        {index}
        on:sendAnswer={sendAnswer}
      />
    {:else if scoreScreen}
      <ScoreScreen {gameHistory} on:click={restart} />
    {:else}
      <MenuScreen bind:selectedContinent on:start={startGame} />
    {/if}
  {:catch error}
    <h2>{error.message}</h2>
  {/await}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  h1 {
    color: var(--maincolor);
  }
</style>
