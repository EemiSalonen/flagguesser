<script>
  // This component is independent from App.svelte

  import { fly } from 'svelte/transition';

  import userData from './userDataStore.js';
  import { onDestroy } from 'svelte';

  let currentLogin = false;

  let name = '';
  let password = '';
  let userDataLocal;

  let validLogin = true;
  let passwordFocus = true;
  let usernameFocus = true;
  let registrationSuccess = false;

  $: validPassword = password.length >= 4 || passwordFocus;
  $: validUsername = name.length >= 3 || usernameFocus;

  function validateLogin() {
    return userDataLocal != null;
  }

  let unsub = userData.subscribe((data) => (userDataLocal = data));

  onDestroy(() => {
    if (unsub) {
      unsub();
    }
  });

  const login = async () => {
    await userData.login(name, password);
    password = '';
    name = '';
    validLogin = validateLogin();
    validLogin ? (currentLogin = true) : (currentLogin = false);
    setTimeout(() => {
      validLogin = true;
    }, 3000);
    passwordFocus = true;
    usernameFocus = true;
  };
  let usernameTaken = false;
  const register = async () => {
    if (await userData.userValidityCheck(name, password)) {
      const success = await userData.register(name, password);
      registrationSuccess = success;
      setTimeout(() => {
        registrationSuccess = false;
      }, 3000);
    } else {
      usernameTaken = true;
      setTimeout(() => {
        usernameTaken = false;
      }, 3000);
    }
    password = '';
    name = '';
    setTimeout(() => {
      validLogin = true;
    }, 3000);
    passwordFocus = true;
    usernameFocus = true;
  };
</script>

<div id="container" transition:fly={{ duration: 250, x: 500, y: 0 }}>
  {#if currentLogin}
    <p>Current user: {userDataLocal.username}</p>
  {/if}
  <label for="name">Username</label>
  <input
    type="text"
    id="name"
    on:blur={() => (usernameFocus = false)}
    bind:value={name}
  />
  {#if !validUsername}
    <p class="warning">Username must be unique and atleast 3 characters!</p>
  {/if}
  <label for="password">Password</label>
  <input
    type="password"
    id="password"
    on:blur={() => (passwordFocus = false)}
    bind:value={password}
  />
  {#if !validPassword}
    <p class="warning">Password needs to be atleast 4 characters!</p>
  {/if}

  <button on:click={login}>Login</button>
  <button on:click={register} disabled={password.length < 4 || name.length < 3}
    >Register</button
  >

  {#if !validLogin}
    <p>No user found!</p>
  {/if}
  {#if usernameTaken}
    <p>Username taken!</p>
  {/if}
  {#if registrationSuccess}
    <p>Registration successfull!</p>
  {/if}
</div>

<style>
  #container {
    position: absolute;
    top: 5vh;
    left: 75vw;
    background-color: var(--maincolor);
    width: 15vw;
    padding: 10px;
    color: var(--thirdcolor);
    border-radius: 10px;
    box-shadow: 3px 3px 5px 1px black;
  }
  input {
    margin: 5px;
  }
  .warning {
    font-size: 0.8em;
    color: red;
    margin: 0;
    padding: 0;
  }
  button {
    margin: 5px;
  }
</style>
