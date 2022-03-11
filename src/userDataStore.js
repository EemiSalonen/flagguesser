import { writable } from 'svelte/store';

const userData = writable();

let currentUser;
let userDataArray = [];
const customUserData = {
  subscribe: userData.subscribe,
  getUserInfo: function () {
    userData.set(currentUser);
  },
  login: function (input, password) {
    currentUser = userDataArray.find(
      (user) => user.username === input && user.password === password
    );
    userData.set(currentUser);
  },
  register: function (name, password) {
    userDataArray.push({
      username: name,
      password: password,
      playedGames: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
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
