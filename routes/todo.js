var express = require('express');
var authenticator = require('../Authenticator');
var router = express.Router();
var todoController = require('../controllers/TodoController');

router.post('/todo', authenticator, todoController.post)
router.get('/todos', authenticator, todoController.list);
router.put('/todo', authenticator, todoController.update);

module.exports = router;