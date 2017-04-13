module.exports = function() {
    var userModel = require('./user/user.model.server')();
    var hackathonModel = require('./hackathon/hackathon.model.server')();
    var groupModel = require('./group/group.model.server')();
    var postModel = require('./post/post.model.server')();

    var model = {
        UserModel : userModel,
        HackathonModel : hackathonModel,
        GroupModel : groupModel,
        PostModel : postModel
    };

    userModel.setModel(model);
    hackathonModel.setModel(model);
    groupModel.setModel(model);
    postModel.setModel(model);

    return model;
};