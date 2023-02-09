const DbController = require('../controllers/db.controller');

DbController.getUser('Test').then((user) => console.log(user));
