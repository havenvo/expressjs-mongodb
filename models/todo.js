var mongoose = require('mongoose');
// Create a schema
var TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    created_at: { type: Date },
    updated_at: { type: Date },
});

TodoSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;