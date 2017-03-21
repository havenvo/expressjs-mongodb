var express = require('express');
var router = express.Router();
var todoController = require('../controllers/TodoController');

router.post('/todo', todoController.post)
router.get('/todos', todoController.list);
router.put('/todo', todoController.update);

module.exports = router;