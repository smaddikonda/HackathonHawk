module.exports = function () {

    var api = {
        setModel : setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var GroupSchema = require('./group.schema.server')();
    var GroupModel = mongoose.model('GroupModel', GroupSchema);
    var model = null;
    return api;

    function setModel(models) {
        model = models;
    }
};