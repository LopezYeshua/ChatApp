const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: String
}, { timestamps: true });
module.exports.User = mongoose.model('User', UserSchema);