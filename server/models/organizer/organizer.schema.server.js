module.exports = function () {
    var mongoose = require('mongoose');

    var OrganizerSchema = mongoose.Schema({
        //required for organizer signup
        organizername: String,
        email: String,
        password: String,

        //fields common with the hackathonWatch API
        public_url: String,
        name: String,
        description: String,
        start_timestamp: Date,
        finish_timestamp: Date,
        full_address: String,

        //other fields
        dateCreated : {type:Date ,default:Date.now},
        groups : [{type: mongoose.Schema.Types.ObjectId, ref: 'GroupModel'}],
        posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'}],
        bookmarks : [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    }, {collection : 'hackathonhawk.organizer'});

    return OrganizerSchema;
};