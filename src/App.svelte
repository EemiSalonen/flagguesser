<script>
  import { fade } from 'svelte/transition';
  import { BarLoader } from 'svelte-loading-spinners';

  import LoginIcon from 'svelte-icons/io/IoIosLogIn.svelte';
  import ArrowDown from 'svelte-icons/io/IoIosArrowDropdown.svelte';
  import ArrowUp from 'svelte-icons/io/IoIosArrowDropup.svelte';

  import { randomizeCountry } from './Functions';
  import { getCountries } from './Functions';
  import { onDestroy } from 'svelte';
  import userData from './userDataStore.js';

  import MainGame from './MainGame.svelte';
  import MenuScreen from './MenuScreen.svelte';
  import ScoreScreen from './ScoreScreen.svelte';
  import UserData from './UserData.svelte';
  import Button from './Button.svelte';
  import UserDataDisplay from './UserDataDisplay.svelte';

  // Store variable
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
  // Object to track score and the timer, currentInterval variable is used to stop the interval
  const scoreDataObject = {
    currentGameScore: 0,
    currentRoundTime: 1,
    startTimer: function () {
      currentInterval = setInterval(() => {
        scoreDataObject.currentRoundTime++;
      }, 1000);
    },
    resetTimer: function () {
      scoreDataObject.currentRoundTime = 1;
      clearInterval(currentInterval);
    },
  };

  // When game is finished, the data is stored in the gameHistory array and then printed on the scorescreen
  let gameHistory = [];
  let countryDataArray = [];

  // Game state props
  let gameNumber = 1;
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
  $: loggedOut = userDataLocal === undefined;
  // Booleans -

  // Functions
  // Menuscreen functions

  // Used to change the screen to the main game screen and also to filter the whole countryset to the current gameset
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

  // Checks the answer string if it matches the name of the country and pushes the current game data to the gameHistory array
  // When the flagset is done, it changes the screen to the scorescreen
  let answer;
  let pointModifier = 1;

  let correctAnswers = 0;
  let wrongAnswers = 0;

  async function sendAnswer(ce) {
    if (ce.detail === currentCountrySet[index].name) {
      scoreDataObject.currentGameScore = Math.floor(
        scoreDataObject.currentGameScore +
          (100 * pointModifier) / scoreDataObject.currentRoundTime
      );
      pointModifier++;
      // userData.addCorrect();
      correctAnswers++;
      answerCorrect = true;
    } else {
      pointModifier = 1;
      // userData.addWrong();
      wrongAnswers++;
      answerCorrect = false;
    }
    answer = answerCorrect ? 'Correct!' : 'Wrong!';
    countryDataArray.push({
      name: currentCountrySet[index].name,
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
        gameNumber: gameNumber,
        score: scoreDataObject.currentGameScore,
        time: scoreDataObject.currentRoundTime,
        username: userDataLocal.username,
        continent: selectedContinent,
      });
      scoreDataObject.resetTimer();

      await userData.addPlayedMatch(userDataLocal.username);
      await userData.addCorrect(userDataLocal.username, correctAnswers);
      await userData.addWrong(userDataLocal.username, wrongAnswers);
      await userData.getUserInfo();

      correctAnswers = 0;
      wrongAnswers = 0;
    }
    showAnswer = true;
    setTimeout(() => {
      showAnswer = false;
    }, 500);
  }

  let answerButtonData = [];
  /* Randomizes the set of buttons used for the current guess by selecting 5 random country names and the correct answer and places them in
   random order */
  function randomizeButtonSet() {
    answerButtonData = [];
    randomizeCountry(
      continentalCountrySet,
      answerButtonData,
      5,
      currentCountrySet[index]
    );
    answerButtonData.splice(
      Math.floor(Math.random() * 5),
      0,
      currentCountrySet[index]
    );
    answerButtonData = answerButtonData;
  }

  // Maingame -
  // Scorescreen
  // Reset data and the screen back to the menu screen
  function restart() {
    scoreScreen = false;
    showUserDataDisplay = false;
    index = 0;
    scoreDataObject.currentGameScore = 0;
    currentCountrySet = [];
    countryDataArray = [];
    pointModifier = 1;
    gameNumber++;
  }

  function sortScore() {
    gameHistory.sort((a, b) => b.score - a.score);
    gameHistory = gameHistory;
    console.log(gameHistory);
  }
  function sortTime() {
    gameHistory.sort((a, b) => a.time - b.time);
    gameHistory = gameHistory;
    console.log(gameHistory);
  }
  // This sort function was taken from: https://reactgo.com/javascript-sort-objects-alphabetically/
  function sortUser() {
    gameHistory.sort((a, b) => {
      let userA = a.username.toUpperCase();
      let userB = b.username.toUpperCase();
      if (userA > userB) return 1;
      if (userB > userA) return -1;
      return 0;
    });
    gameHistory = gameHistory;
  }
  function sortGameNumber() {
    gameHistory.sort((a, b) => a.gameNumber - b.gameNumber);
    gameHistory = gameHistory;
  }
  function sortContinent() {
    gameHistory.sort((a, b) => {
      let userA = a.continent.toUpperCase();
      let userB = b.continent.toUpperCase();
      if (userA > userB) return 1;
      if (userB > userA) return -1;
      return 0;
    });
    gameHistory = gameHistory;
  }
  // Scorescreen -
</script>

<main>
  <h1>FlagGuesser</h1>
  {#if showLogin}
    <UserData {gameStarted} />
  {:else}
    <div id="loginbutton" transition:fade={{ duration: 1000 }}>
      <div class="icon">
        <LoginIcon />
      </div>
      <Button on:click={() => (showLogin = true)} disabled={gameStarted}
        >Login/Register</Button
      >
    </div>
  {/if}

  {#await allCountries}
    <div id="spinner">
      <BarLoader color="rgb(100, 200, 200)" size="200" />
      <h2><span>Loading...</span></h2>
    </div>
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
      <ScoreScreen
        {gameHistory}
        {countryDataArray}
        on:restart={restart}
        on:sortScore={sortScore}
        on:sortTime={sortTime}
        on:sortUser={sortUser}
        on:sortGameNumber={sortGameNumber}
        on:sortContinent={sortContinent}
      />
    {:else}
      <MenuScreen bind:selectedContinent on:start={startGame} {loggedOut} />
    {/if}
  {:catch error}
    <h2>{error.message}</h2>
  {/await}
  {#if showUserDataDisplay && !gameStarted}
    <div class="userdatabutton">
      <div class="icon" transition:fade={{ duration: 1 }}>
        <ArrowUp />
      </div>
      <Button
        disabled={gameStarted}
        on:click={() => (showUserDataDisplay = false)}>Close</Button
      >
    </div>
    <UserDataDisplay />
  {:else}
    <div class="userdatabutton">
      <div class="icon">
        <ArrowDown />
      </div>
      <Button
        on:click={() => (showUserDataDisplay = true)}
        disabled={userDataLocal === undefined || gameStarted}
        >Show userstats</Button
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
    display: flex;
    position: absolute;
    top: 5vh;
    left: 75vw;
  }
  .userdatabutton {
    display: flex;
    position: absolute;
    top: 5.3vh;
    left: 10vw;
    margin: 0;
  }
  #spinner {
    margin-top: 120px;
  }
  span {
    color: var(--maincolor);
  }
  .icon {
    margin-top: 1px;
    width: 40px;
    height: 40px;
    color: var(--maincolor);
  }
</style>
