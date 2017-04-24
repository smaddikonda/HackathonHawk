module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        bio: String,

        followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        following:[{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],

        dateCreated: {type:Date ,default:Date.now},
        bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrganizerModel'}],
        posts:[{type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'}],
        roles : [{type:String , default: 'USER'}],
        google: {
            id:    String
        },

    }, {collection: 'hackathonhawk.user'});

    return UserSchema;
};