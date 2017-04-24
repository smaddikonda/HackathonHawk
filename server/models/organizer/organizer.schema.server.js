module.exports = function () {
    var mongoose = require('mongoose');

    var OrganizerSchema = mongoose.Schema({
        //required for organizer signup
        username: String,
        email: String,
        password: String,

        //required to differentiate between API and organizer-posted hackathons.
        //API Hackathons have id but posted hackathons dont have.
        id: String,

        //fields common with the hackathonWatch API
        public_url: String,
        name: String,
        description: String,
        start_timestamp: String,
        finish_timestamp: String,
        full_address: String,

        //other fields
        dateCreated : {type:Date ,default:Date.now},
        posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'PostModel'}],
        bookmarks : [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    }, {collection : 'hackathonhawk.organizer'});

    return OrganizerSchema;
};