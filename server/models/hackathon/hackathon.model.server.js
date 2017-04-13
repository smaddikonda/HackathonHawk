module.exports = function () {

    var api = {
        setModel : setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var HackathonSchema = require('./hackathon.schema.server')();
    var HackathonModel = mongoose.model('HackathonModel', HackathonSchema);
    var model = null;
    return api;

    function setModel(models) {
        model = models;
    }
};