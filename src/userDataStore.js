import { writable } from 'svelte/store';
// Store is used to display and send data to the firebase-backend. Functions as a learning experience and as lightweight experiment with backend systems
// Not be actual used. Database update function is especially inefficient for any real life deployment
const fbUrl =
  'https://flagguesser-backend-default-rtdb.europe-west1.firebasedatabase.app/';

async function getFb(bool = true) {
  let users = [];

  const fbDatabase = await fetch(`${fbUrl}flagguesser-backend.json`);
  if (!fbDatabase.ok) {
    throw new Error('Database not found!');
  }
  const fbDatabaseJson = await fbDatabase.json();
  for (const key in fbDatabaseJson) {
    users = [...users, { ...fbDatabaseJson[key] }];
  }
  if (bool) {
    return users;
  } else {
    return fbDatabaseJson;
  }
}

const userData = writable();

let currentUser;
const customUserData = {
  subscribe: userData.subscribe,
  getUserInfo: function () {
    userData.set(currentUser);
  },
  login: async function (input, password) {
    const fbDatabase = await getFb();
    console.log(fbDatabase);
    currentUser = await fbDatabase.find(
      (user) => user.username === input && user.password === password
    );
    userData.set(currentUser);
  },
  register: function (name, password) {
    let newUser = {
      username: name,
      password: password,
      playedGames: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    };
    fetch(`${fbUrl}flagguesser-backend.json`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Couldn´t register user!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  userValidityCheck: async function (name) {
    const fbDatabase = await getFb();
    const foundUser = fbDatabase.find((user) => user.username === name);
    return foundUser === undefined;
  },
  addCorrect: async function () {
    currentUser.correctAnswers++;
  },
  addWrong: function () {
    currentUser.wrongAnswers++;
  },
  addPlayedMatch() {
    currentUser.playedGames++;
  },
  updateDatabase: async function () {
    const fbDatabase = await getFb(false);
    let id;
    for (const key in fbDatabase) {
      if (fbDatabase[key].username === currentUser.username) {
        id = key;
        break;
      }
    }
    console.log(id);
    await fetch(`${fbUrl}flagguesser-backend/${id}.json`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Database update failed!');
        }
      })
      .catch((error) => console.log(error));
    await fetch(`${fbUrl}flagguesser-backend.json`, {
      method: 'POST',
      body: JSON.stringify(currentUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Database update failed!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateCurrentUser: async function () {
    const fbDatabase = await getFb();
    currentUser = fbDatabase.find(
      (user) => currentUser.username === user.username
    );
    userData.set(currentUser);
    console.log(currentUser);
  },
};

export default customUserData;
