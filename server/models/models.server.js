module.exports = function() {
    var userModel = require('./user/user.model.server')();
    var organizerModel = require('./organizer/organizer.model.server.js')();
    var postModel = require('./post/post.model.server')();

    var model = {
        UserModel : userModel,
        OrganizerModel : organizerModel,
        PostModel : postModel
    };

    userModel.setModel(model);
    organizerModel.setModel(model);
    postModel.setModel(model);

    return model;
};