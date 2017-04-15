module.exports = function() {
    var userModel = require('./user/user.model.server')();
    var organizerModel = require('./organizer/organizer.model.server.js')();
    var groupModel = require('./group/group.model.server')();
    var postModel = require('./post/post.model.server')();

    var model = {
        UserModel : userModel,
        OrganizerModel : organizerModel,
        GroupModel : groupModel,
        PostModel : postModel
    };

    userModel.setModel(model);
    organizerModel.setModel(model);
    groupModel.setModel(model);
    postModel.setModel(model);

    return model;
};