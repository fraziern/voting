var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var choiceSchema = new Schema({
  title: String,
  votes: { type: Number, default: 0 }
});

var pollSchema = new Schema({
  title:  String,
  choices: [choiceSchema],
  owner:  String
});

pollSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

pollSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Poll', pollSchema);
