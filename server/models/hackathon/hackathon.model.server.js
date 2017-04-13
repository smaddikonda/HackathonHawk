module.exports = function () {
    var mongoose = require('mongoose');

    var HackathonSchema = mongoose.Schema({
        public_url: String,
        name: String,
        description: String,
        start_timestamp: Date,
        finish_timestamp: Date,
        full_address: String
    }, {collection : hackathonhawk.hackathon});

    return HackathonSchema;
};