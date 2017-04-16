module.exports = function () {
    var mongoose = require('mongoose');

    var PostSchema = mongoose.Schema({
        hackathonId : {type: mongoose.Schema.Types.ObjectId, ref: 'HackathonModel'},
        userId : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        organizerId : {type: mongoose.Schema.Types.ObjectId, ref: 'HackathonModel'},
        posterName: String,
        postcontent: String,
        dateCreated: {type:Date ,default:Date.now},
    }, {collection: 'hackathonhawk.post'});

    return PostSchema;
};