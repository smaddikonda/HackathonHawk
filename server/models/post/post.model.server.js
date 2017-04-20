module.exports = function () {

    var api = {
        setModel : setModel,
        createPost: createPost,
        findAllPosts: findAllPosts,
        findAllPostsByUser: findAllPostsByUser,
        findAllPostsByOrganizer: findAllPostsByOrganizer,
        findAllPostsByHackathon: findAllPostsByHackathon,
        findPostById: findPostById,
        findAllPostsForUser: findAllPostsForUser,
        deletePost: deletePost
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

    function createPost(post, hid, uid, oid) {
        return PostModel
            .create(post)
            .then(
                function (post) {
                    post.hackathonId = hid;
                    post.dateCreated = Date.now();
                    if(uid){
                        return model.UserModel
                            .findUserById(uid)
                            .then(function (user) {
                                post.userId = uid;
                                post.posterName = user.username;
                                user.posts.push(post._id);
                                post.save();
                                user.save();
                                return post;
                            })
                    } else if(oid) {
                        return model.OrganizerModel
                            .findOrganizerById(oid)
                            .then(function (organizer) {
                                post.organizerId = oid;
                                post.posterName = organizer.organizername;
                                organizer.posts.push(post._id);
                                post.save();
                                organizer.save();
                                return post;
                            })
                    }
                }
            )
    }

    function findPostById(postId) {
        var deferred = q.defer();
        PostModel
            .findById(postId, function (err, post) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(post);
                }
            });
        return deferred.promise;
    }

    function findAllPosts() {
        var deferred = q.defer();
        PostModel
            .find({}, function (err, posts) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(posts);
                }
            })
        return deferred.promise;
    }

    function findAllPostsByUser(uid) {
        var deferred = q.defer();
        PostModel
            .find({userId:uid}, function (err, postsForUser) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(postsForUser);
                }
            })
        return deferred.promise;
    }

    function findAllPostsByOrganizer(oid) {
        var deferred = q.defer();
        PostModel
            .find({organizerId:oid}, function (err, postsByOrganizer) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(postsByOrganizer);
                }
            })
        return deferred.promise;
    }

    function findAllPostsByHackathon(hid) {
        var deferred = q.defer();
        PostModel
            .find({hackathonId:hid}, function (err, postsForHackathon) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(postsForHackathon);
                }
            })
        return deferred.promise;
    }

    function findAllPostsForUser(hackathonIDs) {
        var deferred = q.defer();
        PostModel
            .find({hackathonId: {$in: hackathonIDs}},
                function (err, posts) {
                    if(err){
                        console.log("Getting posts")
                    }
                    else{
                        deferred.resolve(posts);
                    }
                });
        return deferred.promise;
    }

    function deletePost(postId) {
        var deferred = q.defer();
        PostModel
            .remove({_id: postId},
                function (err, post) {
                    if(err){
                        console.log("Deleting post")
                    }
                    else{
                        deferred.resolve(post);
                    }
                });
        return deferred.promise;
    }
};