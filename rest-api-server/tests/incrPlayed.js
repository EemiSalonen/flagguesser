const DbController = require('../controllers/db.controller');

DbController.incrPlayed('Test').then((user) => console.log(user));
