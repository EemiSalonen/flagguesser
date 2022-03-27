import { writable } from 'svelte/store';

async function getFb() {
  let users = [];
  const fbDatabase = await fetch(`${fbUrl}flagguesser-backend.json`);
  if (!fbDatabase.ok) {
    throw new Error('Database not found!');
  }
  const fbDatabaseJson = await fbDatabase.json();
  for (const key in fbDatabaseJson) {
    users = [...users, fbDatabaseJson[key]];
  }

  return users;
}

const fbUrl =
  'https://flagguesser-backend-default-rtdb.europe-west1.firebasedatabase.app/';

const userData = writable();

let currentUser;
let userDataArray = [];
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
        push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  },
  userValidityCheck: function (name) {
    const foundUser = userDataArray.find((user) => user.username === name);
    return foundUser === undefined;
  },
  addCorrect: function () {
    currentUser.correctAnswers++;
  },
  addWrong: function () {
    currentUser.wrongAnswers++;
  },
  addPlayedMatch() {
    currentUser.playedGames++;
  },
};

export default customUserData;
