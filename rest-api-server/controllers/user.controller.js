const DbController = require('./db.controller');
const AuthController = require('./auth.controller');

const UserController = {
  async getUser(req, res) {
    const user = await DbController.getUser(req.body.username);

    if (req.body.token && AuthController.validateToken(req.body.token)) {
      res.json([user, req.body.token]);
    } else {
      if (user == null) {
        res.send([{ username: false }]);
        return;
      }

      if (
        await AuthController.comparePassword(req.body.password, user.password)
      ) {
        const token = AuthController.createToken(user);

        res.json([user, token]);
      } else {
        res.send([{ username: false }]);
      }
    }
  },

  async insertUser(req, res) {
    const encryptedUser = AuthController.encryptUsername({
      username: req.body.username,
      password: req.body.password,
    });

    const result = await DbController.insertUser(
      encryptedUser.username,
      encryptedUser.password
    );
    res.json(result);
  },

  async incrPlayed(req, res) {
    console.log(req.body.token);

    if (req.body.token && AuthController.validateToken(req.body.token)) {
      res.json(await DbController.incrPlayed(req.body.username));
    } else {
      res.send('Access denied, incorrect token!');
    }
  },

  async incrCorrect(req, res) {
    if (req.body.token && AuthController.validateToken(req.body.token)) {
      res.json(
        await DbController.incrCorrect(req.body.username, req.body.amount)
      );
    } else {
      res.send('Access denied, incorrect token!');
    }
  },

  async incrWrong(req, res) {
    if (req.body.token && AuthController.validateToken(req.body.token)) {
      res.json(
        await DbController.incrWrong(req.body.username, req.body.amount)
      );
    } else {
      res.send('Access denied, incorrect token!');
    }
  },
};

module.exports = UserController;
