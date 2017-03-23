const express = require('express');
const authenticator = require('../Authenticator');
const router = express.Router();
const todoController = require('../controllers/TodoController');

router.post('/todo', authenticator, todoController.post)
router.get('/todos', authenticator, todoController.list);
router.put('/todo', authenticator, todoController.update);

module.exports = router;