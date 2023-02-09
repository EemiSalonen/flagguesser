const DbController = require('./db.controller');

const AdminController = {
  async getAll(req, res) {
    return await DbController.getAll();
  },

  async getWithUsername(req, res) {
    res.json(await DbController.getWithUsername(req.body.username));
  },

  async delUser(req, res) {
    if (!req.session.correct) {
      res.send('Invalid access!');
    } else {
      res.json(await DbController.delUser(req.body.username));
    }
  },

  async updateUser(req, res) {
    if (!req.session.correct) {
      res.send('Invalid access!');
    } else {
      res.json(await DbController.updateUser(req.body));
    }
  },

  async createUser(req, res) {
    if (!req.session.correct) {
      res.send('Invalid access!');
    } else {
      res.json(
        await DbController.insertUser(req.body.username, req.body.password)
      );
    }
  },
};

module.exports = AdminController;
