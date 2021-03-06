module.exports = function () {

    var api = {
        setModel : setModel,
        createOrganizer: createOrganizer,
        createOrganizerForAPIHackathon: createOrganizerForAPIHackathon,
        findOrganizerById: findOrganizerById,
        findOrganizerByUsername: findOrganizerByUsername,
        findOrganizerByCredentials: findOrganizerByCredentials,
        findAllHackathons: findAllHackathons,
        findHackathonByApiId: findHackathonByApiId,
        updateOrganizer: updateOrganizer,
        findAllBookmarkedHackathons: findAllBookmarkedHackathons,
        deleteOrganizer: deleteOrganizer
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
        OrganizerModel.findOne({username : organizer.username},
            function (err, existingOrganizer) {
                if(existingOrganizer == null) {
                    OrganizerModel
                        .create(organizer, function (err, organizer) {
                            if(err) {
                                deferred.abort(err);
                            } else {
                                deferred.resolve(organizer);
                            }
                        });
                }else {
                    deferred.resolve(null);
                }
            });
        return deferred.promise;
    }

    function createOrganizerForAPIHackathon(organizer) {
        var deferred = q.defer();
        OrganizerModel.findOne({id : organizer.id},
            function (err, existingApiHacakathonInDB) {
                if(existingApiHacakathonInDB == null) {
                    OrganizerModel
                        .create(organizer, function (err, organizer) {
                            if(err) {
                                deferred.abort(err);
                            } else {
                                deferred.resolve(organizer);
                            }
                        });
                }else {
                    deferred.resolve(null);
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
            .find({username:organizerName}, function (err, organizer) {
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
            .find({username:organizerName, password:password}, function (err, organizer) {
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

    function findHackathonByApiId(apiId) {
        var deferred = q.defer();
        OrganizerModel
            .find({id:apiId}, function (err, hackathon) {
                if(!hackathon) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(hackathon[0]);
                }
            })
        return deferred.promise;
    }

    function updateOrganizer(organizerId, organizer) {
        var deferred = q.defer();
        OrganizerModel
            .update({_id : organizerId},
                {
                    username: organizer.username,
                    password: organizer.password,
                    email: organizer.email,

                    id: organizer.id,

                    public_url: organizer.public_url,
                    name: organizer.name,
                    description: organizer.description,
                    start_timestamp: organizer.start_timestamp,
                    finish_timestamp: organizer.finish_timestamp,
                    full_address: organizer.full_address,

                    dateCreated: organizer.dateCreated,
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

    function findAllHackathons() {
        var deferred = q.defer();
        OrganizerModel
            .find({}, function (err, organizers) {
                if(!organizers) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(organizers);
                }
            });
        return deferred.promise;
    }

    function findAllBookmarkedHackathons(hackathonIds) {
        var deferred = q.defer();
        OrganizerModel
            .find({_id: {$in: hackathonIds}},
                function (err, hackathons) {
                    if(err){
                        console.log("Could not retrieve bookmarked hackathons")
                    }
                    else{
                        deferred.resolve(hackathons);
                    }
                });
        return deferred.promise;
    }

    function deleteOrganizer(hacakthonId) {
        var deferred = q.defer();
        OrganizerModel
            .remove({_id:hacakthonId}, function (err, organizer) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(organizer);
                }
            });
        return deferred.promise;
    }

};