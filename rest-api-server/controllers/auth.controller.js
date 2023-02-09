require('dotenv').config();

const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');

const AuthController = {
  createToken(user) {
    const payload = {
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    return token;
  },
  encryptUsername(user) {
    const encryptedUser = {
      username: user.username,
      password: bCrypt.hashSync(user.password),
    };
    return encryptedUser;
  },
  async comparePassword(clientPassword, dbPassword) {
    return await bCrypt.compare(clientPassword, dbPassword);
  },

  async validateToken(token) {
    return jwt.verify(token, process.env.SECRET);
  },
};

module.exports = AuthController;

// const testUser = {
//   username: 'Jorma',
//   password: 'testi',
//   playedGames: 0,
//   correctAnswers: 0,
//   wrongAnswers: 0,
// };

// const encrypted = AuthController.encryptUsername(testUser);
// console.log(encrypted);

// const decrypted = bCrypt.compareSync('test', encrypted.password);

// console.log(decrypted);

// const token = AuthController.createToken(testUser);

// const decoded = jwt.decode(token);
// console.log(decoded);
