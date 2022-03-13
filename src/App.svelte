<script>
  import { fade } from 'svelte/transition';

  import { randomizeCountry } from './Functions.svelte';
  import { getCountries } from './Functions.svelte';
  import { onDestroy } from 'svelte';
  import userData from './userDataStore.js';

  import MainGame from './MainGame.svelte';
  import MenuScreen from './MenuScreen.svelte';
  import ScoreScreen from './ScoreScreen.svelte';
  import UserData from './UserData.svelte';
  import Button from './Button.svelte';
  import UserDataDisplay from './UserDataDisplay.svelte';

  let userDataLocal;
  const unsub = userData.subscribe((data) => (userDataLocal = data));
  console.log(userDataLocal);

  onDestroy(() => {
    if (unsub) {
      unsub();
    }
  });

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
  let countryDataArray = [];

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
  let showAnswer = false;
  let answerCorrect = false;
  let showLogin = false;
  let showUserDataDisplay = false;
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
    showLogin = false;
    scoreDataObject.startTimer();
  }

  // Menuscreen -
  // Maingame
  let answer;
  function sendAnswer(ce) {
    if (ce.detail === currentCountrySet[index].name) {
      scoreDataObject.currentGameScore++;
      userData.addCorrect();
      answerCorrect = true;
    } else {
      console.log('Incorrect!');
      userData.addWrong();
      answerCorrect = false;
    }
    answer = answerCorrect ? 'Correct!' : 'Wrong!';
    countryDataArray.push({
      flag: currentCountrySet[index].flag,
      answerBool: answer,
    });
    countryDataArray = countryDataArray;
    index++;
    randomizeButtonSet();
    if (index === currentCountrySet.length) {
      gameStarted = false;
      scoreScreen = true;
      showUserDataDisplay = true;
      gameHistory.push({
        score: scoreDataObject.currentGameScore,
        time: scoreDataObject.currentRoundTime,
        username: userDataLocal.username,
        continent: selectedContinent,
      });
      scoreDataObject.resetTimer();
      userData.addPlayedMatch();
    }
    showAnswer = true;
    setTimeout(() => {
      showAnswer = false;
    }, 500);
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
    answerButtonData = answerButtonData;
  }

  // Maingame -
  // Scorescreen
  function restart() {
    scoreScreen = false;
    showUserDataDisplay = false;
    index = 0;
    scoreDataObject.currentGameScore = 0;
    currentCountrySet = [];
    countryDataArray = [];
  }
  // Scorescreen -
</script>

<main>
  <h1>FlagGuesser</h1>
  {#if showLogin}
    <UserData {gameStarted} />
  {:else}
    <div id="loginbutton" transition:fade={{ duration: 1000 }}>
      <Button on:click={() => (showLogin = true)} disabled={gameStarted}
        >Login/Register</Button
      >
    </div>
  {/if}

  {#await allCountries}
    <p>Loading...</p>
  {:then data}
    {#if gameStarted}
      <MainGame
        {countryDataArray}
        {answerCorrect}
        {showAnswer}
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
  {#if showUserDataDisplay && !gameStarted}
    <UserDataDisplay />
    <div class="userdatabutton">
      <Button
        disabled={gameStarted}
        on:click={() => (showUserDataDisplay = false)}>Close</Button
      >
    </div>
  {:else}
    <div class="userdatabutton">
      <Button
        on:click={() => (showUserDataDisplay = true)}
        disabled={userDataLocal === undefined || gameStarted}
        >Show userdata</Button
      >
    </div>
  {/if}
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
    text-shadow: 0 0 10px rgb(0, 0, 0);
  }
  #loginbutton {
    position: absolute;
    top: 5vh;
    left: 75vw;
  }
  .userdatabutton {
    position: absolute;
    top: 4.9vh;
    left: 10vw;
    margin: 0;
  }
</style>
