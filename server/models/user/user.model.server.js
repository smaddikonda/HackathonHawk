module.exports = function () {

    var api = {
        setModel : setModel,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        updateUser:updateUser
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

    function createUser(user) {
        var deferred = q.defer();
        UserModel
            .create(user, function (err, user) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
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
    
    function findUserByFacebookId(facebookid) {
        var deferred = q.defer();
        UserModel
            .findOne({'facebook.id': facebookid}, function (err, user) {
                if(!user) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user[0]);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId,user) {
        var deferred = q.defer();
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
                    groups: user.groups
                },
                function (err,user) {
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });

        return deferred.promise;
    }
};