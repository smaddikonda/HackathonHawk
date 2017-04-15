module.exports = function () {

    var api = {
        setModel : setModel,
        createOrganizer: createOrganizer,
        findOrganizerById: findOrganizerById,
        findOrganizerByUsername: findOrganizerByUsername,
        findOrganizerByCredentials: findOrganizerByCredentials,
        updateOrganizer: updateOrganizer
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var OrganizerSchema = require('./organizer.schema.server.js')();
    var OrganizerModel = mongoose.model('OrganizerModel', OrganizerSchema);
    var model = null;
    return api;

    function setModel(models) {
        model = models;
    }
    
    function createOrganizer(organizer) {
        var deferred = q.defer();
        OrganizerModel
            .create(organizer, function (err, organizer) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(organizer);
                }
            });
        return deferred.promise;
    }
    
    function findOrganizerById(organizerId) {
        var deferred = q.defer();
        OrganizerModel
            .findById(organizerId, function (err, organizer) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(organizer);
                }
            });
        return deferred.promise;
    }
    
    function findOrganizerByUsername(organizerName) {
        var deferred = q.defer();
        OrganizerModel
            .find({organizername:organizerName}, function (err, organizer) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(organizer[0]);
                }
            });
        return deferred.promise;
    }
    
    function findOrganizerByCredentials(organizerName, password) {
        var deferred = q.defer();
        OrganizerModel
            .find({organizername:username, password:password}, function (err, organizer) {
                if(!organizer) {
                    console.log("err");
                    deferred.reject(err);
                } else {
                    console.log("user me");
                    deferred.resolve(organizer[0]);
                }
            });
        return deferred.promise;
    }
    
    function updateOrganizer(organizerId, organizer) {
        var deferred = q.defer();
        OrganizerModel
            .update({_id : organizerId},
                {
                    organizername: organizer.organizername,
                    password: organizer.password,
                    email: organizer.email,

                    public_url: organizer.public_url,
                    name: organizer.name,
                    description: organizer.description,
                    start_timestamp: organizer.start_timestamp,
                    finish_timestamp: organizer.finish_timestamp,
                    full_address: organizer.full_address,
                    groups: organizer.groups,
                    posts: organizer.posts,
                    bookmarks: organizer.bookmarks
                },
                function (err,organizer) {
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(organizer);
                    }
                });

        return deferred.promise;
    }
};