module.exports = function(app)
{
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);

    var connectionString = 'mongodb://127.0.0.1:27017/hackathonhawk';
    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var HackathonHawkSchema = mongoose.Schema({
        message: String
    });

    var HackathonHawkModel = mongoose.model("HackathonHawkModel", HackathonHawkSchema);

    /***********************************************************/
    /*MODELS*/

    var models = require('./models/models.server')();
    require("./services/user.service.server.js")(app, models.UserModel);
    require("./services/hackathon.service.server")(app, models.HackathonModel);
    require("./services/post.service.server")(app, models.PostModel);
    require("./services/post.service.server")(app, models.GroupModel);

    /***********************************************************/



    function findAllMessages(req, res) {
        HackathonHawkModel
            .find()
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        HackathonHawkModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        HackathonHawkModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};