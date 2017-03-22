var express = require('express');
var Authenticator = require('../Authenticator');
var router = express.Router();
var todoController = require('../controllers/TodoController');

router.post('/todo', Authenticator, todoController.post)
router.get('/todos', Authenticator, todoController.list);
router.put('/todo', Authenticator, todoController.update);

module.exports = router;