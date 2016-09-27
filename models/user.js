
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
  uid: String,
	displayName: String,
  avatar: String
});
