var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title:   String,
  dueDate: String,
  status:  String
});

module.exports = mongoose.model('Task', TaskSchema);
