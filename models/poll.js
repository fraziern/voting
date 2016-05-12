var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  title:  String,
  choices: [{ title: String, votes: Number }],
  owner:  String
});

module.exports = mongoose.model('Poll', pollSchema);
