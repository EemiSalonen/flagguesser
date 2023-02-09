const UserModel = require('../models/User');

const DbController = {
  async getUser(username) {
    return await UserModel.findOne({ username: username });
  },

  async insertUser(username, password) {
    const user = {
      username: username,
      password: password,
      playedGames: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    };
    console.log(user);
    const u = new UserModel(user);
    u.save()
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  },

  async incrPlayed(username) {
    return await UserModel.updateOne(
      {
        username: username,
      },
      { $inc: { playedGames: 1 } }
    );
  },

  async incrCorrect(username, amount) {
    return await UserModel.updateOne(
      {
        username: username,
      },
      { $inc: { correctAnswers: amount } }
    );
  },

  async incrWrong(username, amount) {
    return await UserModel.updateOne(
      {
        username: username,
      },
      { $inc: { wrongAnswers: amount } }
    );
  },

  // Admin CRUD methods

  async getAll() {
    return await UserModel.find({});
  },

  async getWithUsername(username) {
    return await UserModel.find({ username: username });
  },

  async delUser(username) {
    return await UserModel.deleteOne({ username: username });
  },

  async updateUser(updatedUser) {
    return await UserModel.updateOne(
      { username: updatedUser.oldusername },
      {
        username: updatedUser.newusername,
        playedGames: Number(updatedUser.playedgames),
        correctAnswers: Number(updatedUser.correctanswers),
        wrongAnswers: Number(updatedUser.wronganswers),
      }
    );
  },
};

module.exports = DbController;
