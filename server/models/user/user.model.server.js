module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone:String,
        hackathons:[{type: mongoose.Schema.Types.ObjectId, ref: 'HackathonModel'}],
        dateCreated: {type:Date ,default:Date.now}
    }, {collection: 'hackathonhawk.user'});

    return UserSchema;
};