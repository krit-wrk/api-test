const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  label: { type: String, required: true },
  done: { type: Boolean },
});

module.exports = mongoose.model('todo', todoSchema);
