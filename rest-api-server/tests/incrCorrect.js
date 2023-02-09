const DbController = require('../controllers/db.controller');

DbController.incrCorrect('Test', 5).then((user) => console.log(user));
