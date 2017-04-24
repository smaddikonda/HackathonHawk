module.exports = function (app, organizerModel) {

    var bcrypt = require("bcrypt-nodejs");

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    app.post("/api/organizer", createOrganizer);
    app.post("/api/organizer/hackathonWatch/add", createOrganizerForAPIHackathon);
    app.get("/api/organizer", findOrganizer);
    app.get("/api/hackathons/all", findAllHackathons);
    app.get("/api/organizer/:oid", findOrganizerById);
    app.get("/api/organizer/api/:aid", findHackathonByAPIId);
    app.put("/api/organizer/:oid", updateOrganizer);
    app.post("/api/user/bookmarks", findAllBookmarkedHackathons);
    app.delete("/api/organizer/:oid", deleteOrganizer);

    app.post("/api/organizer/login", passport.authenticate('local-organizer'), login);
    app.post("/api/organizer/logout", logout);
    app.post ("/api/organizer/register", register);
    app.get ("/api/organizer/loggedin", loggedin);

    passport.use("local-organizer", new LocalStrategy(localStrategy));

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var organizer = req.body;
        organizer.password = bcrypt.hashSync(organizer.password);
        organizerModel
            .createOrganizer(organizer)
            .then(
                function (organizer) {
                    if(organizer) {
                        req.login(organizer, function (err) {
                            if(err){
                                res.status(400).send(err);
                            } else {
                                res.json(organizer);
                            }
                        });
                    } else{
                        res.json(null);
                    }

                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function localStrategy(username, password, done) {
        organizerModel
            .findOrganizerByUsername(username)
            .then(
                function (organizer) {
                    if(organizer && bcrypt.compareSync(password, organizer.password)){
                        return done(null, organizer);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err){
                        return done(err);
                    }
                }
            );
    }


    function createOrganizer(req, res) {
        var newOrganizer = req.body;
        newOrganizer.password = bcrypt.hashSync(newOrganizer.password);
        organizerModel
            .createOrganizer(newOrganizer)
            .then(function(organizer) {
                if(organizer){
                    res.json(organizer);
                } else{
                    res.json(null);
                }
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function createOrganizerForAPIHackathon(req, res) {
        var newOrganizer = req.body;
        organizerModel
            .createOrganizerForAPIHackathon(newOrganizer)
            .then(function(organizer) {
                if(organizer){
                    res.json(organizer);
                } else{
                    res.json(null);
                }
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateOrganizer(req, res) {
        var organizerId = req.params.oid;
        var organizer = req.body;
        organizerModel.findOrganizerById(organizerId)
            .then(function (existingOrganizer) {
                if(existingOrganizer){
                    if(organizer.password != existingOrganizer.password){
                        organizer.password = bcrypt.hashSync(organizer.password);
                    }
                }
            })
        
        
        
        organizerModel
            .updateOrganizer(organizerId,organizer)
            .then(function (organizer) {
                res.json(200);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findHackathonByAPIId(req, res) {
        var apiID = req.params.aid;
        organizerModel
            .findHackathonByApiId(apiID)
            .then(
                function (hackathon) {
                    res.json(hackathon);
                }, function (error) {
                    res.json(null);
                });
    }

    function findOrganizerById(req, res) {
        var organizerId = req.params.oid;
        organizerModel
            .findOrganizerById(organizerId)
            .then(function (organizer) {
                res.json(organizer);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findOrganizer(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findOrganizerByCredentials(req, res);
        } else if(username) {
            findOrganizerByUsername(req, res);
        }
    }

    function findOrganizerByUsername(req, res) {
        var username = req.params.username;
        organizerModel
            .findOrganizerByUsername(username)
            .then(function (organizer) {
                res.json(organizer);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findOrganizerByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;

        organizerModel
            .findOrganizerByCredentials(username,password)
            .then(function (organizer) {
                res.json(organizer);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findAllHackathons(req, res) {
        organizerModel
            .findAllHackathons()
            .then(function (hackathons){
                res.json(hackathons);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findAllBookmarkedHackathons(req, res) {
        var hackathonsIds = req.body;
        organizerModel
            .findAllBookmarkedHackathons(hackathonsIds)
            .then(function (hackathons){
                res.json(hackathons);
            }, function (error) {
                res.sendStatus(500);
            });
    }
    
    function deleteOrganizer(req, res) {
        var hackathonId = req.params.oid;
        organizerModel
            .deleteOrganizer(hackathonId)
            .then(function (hackathon){
                res.json(hackathon);
            }, function (error) {
                res.sendStatus(500);
            });
    }

};
