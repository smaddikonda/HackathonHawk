module.exports = function () {

    var api = {
        setModel : setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);
    var model = null;
    return api;

    function setModel(models) {
        model = models;
    }
};