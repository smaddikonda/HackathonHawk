module.exports = function () {

    var api = {
        setModel : setModel
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var PostSchema = require('./post.schema.server.js')();
    var PostModel = mongoose.model('PostModel', PostSchema);
    var model = null;
    return api;

    function setModel(models) {
        model = models;
    }
};