module.exports = function () {
    var mongoose = require('mongoose');

    var HackathonSchema = mongoose.Schema({
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
    }, {collection : 'hackathonhawk.hackathon'});

    return HackathonSchema;
};