module.exports = function () {
    var mongoose = require('mongoose');

    var GroupSchema = mongoose.Schema({
        groupName: String,
        dateCreated : {type:Date ,default:Date.now},
        groupLead: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        groupMembers : [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        hackathon: {type: mongoose.Schema.Types.ObjectId, ref: 'HackathonModel'},
    }, {collection: 'hackathonhawk.group'});

    return GroupSchema;
};