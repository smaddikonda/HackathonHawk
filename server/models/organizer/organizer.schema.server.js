module.exports = function () {
    var mongoose = require('mongoose');

    var OrganizerSchema = mongoose.Schema({
        organizername: String,
        email: String,
        password: String,

        public_url: String,
        name: String,
        description: String,
        start_timestamp: Date,
        finish_timestamp: Date,
        full_address: String,

        dateCreated : {type:Date ,default:Date.now},
        groups : [{type: mongoose.Schema.Types.ObjectId, ref: 'GroupModel'}],
        posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'}],
        bookmarks : [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    }, {collection : 'hackathonhawk.organizer'});

    return OrganizerSchema;
};