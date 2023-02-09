import { writable } from 'svelte/store';

const userData = writable();

let currentUser;
let token;

const customUserData = {
  subscribe: userData.subscribe,
  getUserInfo: async function () {
    await this.reLogin(currentUser.username, token);
    console.log(currentUser);
    userData.set(currentUser);
  },
  login: async function (username, password) {
    const response = await fetch('http://localhost:3000/getuser', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const user = await response.json();

    if (user[0].username) {
      currentUser = user[0];
      token = user[1];
      userData.set(user[0]);
    } else {
      currentUser = null;
    }
  },
  async reLogin(username, token) {
    const response = await fetch('http://localhost:3000/getuser', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, token: token }),
    });

    const user = await response.json();

    if (user[0].username) {
      currentUser = user[0];
      token = user[1];
      userData.set(user[0]);
    } else {
      currentUser = null;
    }
  },

  register: async function (username, password) {
    const response = await fetch('http://localhost:3000/insert', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const user = response.json();
    return user ? true : false;
  },
  userValidityCheck: async function (username, password) {
    const response = await fetch('http://localhost:3000/getuser', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const foundUser = await response.json();
    console.log(foundUser);
    return foundUser[0].username ? false : true;
  },
  addCorrect: async function (username, amount) {
    const response = await fetch('http://localhost:3000/user/correct', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        amount: amount,
        token: token,
      }),
    });

    response.json().then((data) => console.log(data));
  },
  addWrong: async function (username, amount) {
    const response = await fetch('http://localhost:3000/user/wrong', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        amount: amount,
        token: token,
      }),
    });

    response.json().then((data) => console.log(data));
  },
  async addPlayedMatch(username) {
    const response = await fetch('http://localhost:3000/user/played', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, token: token }),
    });

    response.json().then((data) => console.log(data));
  },
};

export default customUserData;
