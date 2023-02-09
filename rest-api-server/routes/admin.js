var express = require('express');
var router = express.Router();
require('dotenv').config();

const AdminController = require('../controllers/admin.controller');
let sess;

router.get('/login', (req, res) => {
  sess = req.session;
  if (sess.success) {
    res.redirect('/admin');
  } else {
    res.render('../views/login', { errors: sess.errors });
  }
});

router.post('/login', (req, res) => {
  sess = req.session;

  const usernameCorrect = req.body.username == process.env.ADMIN_USERNAME;
  const passwordCorrect = req.body.password == process.env.ADMIN_PASSWORD;

  if (usernameCorrect && passwordCorrect) {
    sess.success = true;
  } else {
    sess.success = false;
    sess.errors = 'Username or password is incorrect!';
  }

  res.redirect('/admin/login');
});

router.get('/', async (req, res) => {
  sess = req.session;
  if (!sess.success) {
    res.redirect('/admin/login');
  }

  const users = await AdminController.getAll();

  res.render('../views/admin', {
    users: users,
  });
});

router.post('/', AdminController.updateUser);

router.post('/del', AdminController.delUser);

router.post('/create', AdminController.createUser);

module.exports = router;
