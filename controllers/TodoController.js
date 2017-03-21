var Todo = require('../models/todo');
exports.post = function (req, res) {
    var todo = new Todo({ name: req.body.name });
    todo.save((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json(todo);
        }
    });
}

exports.list = function (req, res) {
    Todo.find((err, todos) => {
        if (err) {
            res.json(err);
        } else {
            res.json(todos);
        }
    });
}

exports.update = function (req, res) {
    Todo.findById(req.body.id, (err, todo) => {
        if (todo != null) {
            todo.name = req.body.name;
            todo.save();
            res.json(todo);
        } else {
            res.json({err: 'Not found'});
        }
    })

}