module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone:String,
        dateCreated: {type:Date ,default:Date.now},
        hackathons:[{type: mongoose.Schema.Types.ObjectId, ref: 'HackathonModel'}],
        bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: 'HackathonModel'}],
        posts:[{type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'}],
        groups:[{type: mongoose.Schema.Types.ObjectId, ref: 'GroupModel'}],
    }, {collection: 'hackathonhawk.user'});

    return UserSchema;
};