module.exports = function () {

    var api = {
        setModel : setModel,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        findUserByGoogleId: findUserByGoogleId,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser,
        getUsersOnSetOfIDS:getUsersOnSetOfIDS,
        followUser:followUser,
        unfollowUser:unfollowUser,
        searchForUsername:searchForUsername

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

    function findUserByGoogleId(id) {
        return UserModel.findOne({"google.id":id});
    }

    function createUser(user) {
        var deferred = q.defer();
        user.roles = ["USER"];
        UserModel.findOne({username: user.username},
            function (err, existingUser) {
                if(existingUser == null){
                    UserModel
                        .create(user, function (err, user) {
                            if(err) {
                                deferred.abort(err);
                            } else {
                                deferred.resolve(user);
                            }
                        });
                } else{
                    deferred.resolve(null);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        UserModel
            .findById(userId, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


    function findUserByUsername(username){
        var deferred = q.defer();
        console.log("Here");
        UserModel
            .find({username:username}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user[0]);
                }
            });
        return deferred.promise;
    }


    function findUserByCredentials(username,password){
        var deferred = q.defer();
        console.log(username+password);
        UserModel
            .find({username:username,password:password}, function (err, user) {
                if(!user) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    console.log("user me");
                    deferred.resolve(user[0]);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId,user) {
        var deferred = q.defer();
        UserModel.findOne({username: user.username},
            function (err, existingUser) {
                if(existingUser == null || existingUser._id == userId){
                    UserModel
                        .update({_id:userId},
                            {
                                username: user.username,
                                password: user.password,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                bio: user.bio,
                                bookmarks: user.bookmarks,
                                posts: user.posts,
                                roles: user.roles
                            },
                            function (err,user) {
                                if(err){
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(user);
                                }
                            });
                }else{
                    deferred.resolve(null);
                }
            });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel
            .find(function (err, users) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel
            .remove({_id:userId}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    //follow functionality

    function searchForUsername(uname) {
        var deferred = q.defer();
        UserModel
            .find({username: { "$regex": uname, "$options": "i" }}, function (err, users) {
                if(!users) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    function followUser(mainPersonID,followerID) {
        var deferred = q.defer();
        UserModel
            .find({_id:mainPersonID}, function (err, users) {
                var mainPerson = users[0];
                if(!mainPerson) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    UserModel
                        .find({_id:followerID}, function (err, users) {
                            var follower = users[0];
                            if(!follower) {
                                console.log("err");
                                deferred.reject(err);
                            } else {
                                mainPerson.followers.push(follower._id);
                                follower.following.push(mainPerson._id);
                                mainPerson.save();
                                follower.save();
                                deferred.resolve(follower);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function unfollowUser(mainPersonID, unfollowerID) {
        var deferred = q.defer();
        UserModel
            .find({_id:mainPersonID}, function (err, users) {
                var mainPerson = users[0];
                if(!mainPerson) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    UserModel
                        .find({_id:unfollowerID}, function (err, users) {
                            var unfollower = users[0];
                            if(!unfollower) {
                                console.log("err");
                                deferred.reject(err);
                            } else {
                                mainPerson.followers.splice(mainPerson.followers.indexOf(unfollower._id), 1);
                                unfollower.following.splice(unfollower.following.indexOf(mainPerson._id), 1);
                                mainPerson.save();
                                unfollower.save();
                                deferred.resolve(unfollower);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function getUsersOnSetOfIDS(userIds){
        var deferred = q.defer();
        UserModel
            .find({ _id: { $in: userIds}},
                function (err, users) {
                    deferred.resolve(users);
                });
        return deferred.promise;
    }


};