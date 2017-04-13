module.exports = function () {
    var mongoose = require('mongoose');

    var PostSchema = mongoose.Schema({
        userid : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        postcontent: String,
        hackathon : {type: mongoose.Schema.Types.ObjectId, ref: 'HackathonModel'},
    }, {collection: 'hackathonhawk.post'});

    return PostSchema;
};