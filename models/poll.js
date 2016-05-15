var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  title:  String,
  choices: [{ title: String, votes: Number }],
  owner:  String
});

pollSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

pollSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Poll', pollSchema);
