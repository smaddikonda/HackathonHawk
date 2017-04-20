module.exports = function (app, userModel) {

    var bcrypt = require("bcrypt-nodejs");

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    app.post("/api/user", createUser);

    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post ("/api/register", register);
    app.get ("/api/loggedin", loggedin);

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/api/all", findAllUsers);

    app.get("/rest/enduser/findfriends/:username",searchForUsername);
    app.post("/rest/following/:mainPersonID/follower/:followerID",followUser);
    app.post("/get/users/ids",getUsersOnSetOfIDS);


    app.get("/api/isAdmin",


        function (req, res) {
            if (req.isAuthenticated()) {

                var user = req.user;
                var username = user.username;
                userModel.findUserByUsername(username)
                    .then(
                        function (foundUser) {
                            if (foundUser != null) {
                                var roles = foundUser.roles;
                                var isAdmin = roles.indexOf('ADMIN') > -1;
                                if (isAdmin) {
                                    res.json(foundUser);
                                } else {
                                    res.send('0');
                                }
                            } else {
                                res.send('0');
                            }
                        });
            }
            else {
                res.send('0');
            }
        });


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use(new LocalStrategy(localStrategy));

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(
                function (user) {
                    if(user) {
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            } else {
                                res.json(user);
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
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password , user.password)){
                        return done(null, user);
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

    function serializeUser(user, done) {
        done(null,user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    var googleConfig = {
        clientID     : "836035500148-r0eh57ahbom7f676mtp0rf3peamt5fkb.apps.googleusercontent.com",
        clientSecret : "cggihC4tMa8Fjgz8bRCvufzT",
        //callbackURL  : "http://localhost:3000/auth/google/callback"
        callbackURL  : "http://hackathonhawk.herokuapp.com/auth/google/callback"
    };

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }), function(req, res){
            var t  = req.user;
            var url = '/#/user/'+t._id;
            res.redirect(url);
        });

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {

        console.log("NEW PROFILE", profile,token,refreshToken);
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {

                        console.log("NEW PROFILE", profile);
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.displayName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id
                            }
                        };
                        console.log(newGoogleUser,"NEW GOOGLE USER");
                        return userModel
                            .createUser(newGoogleUser)
                            .then(function(user){
                                return done(null, user);
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                })
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel
            .updateUser(userId,user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });

    }

    function deleteUser(req, res){
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    //follow user functionality
    function searchForUsername(req,res) {
        var username = req.params.username;
        userModel
            .searchForUsername(username)
            .then(function (users) {
                res.json(users);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function followUser(req,res) {
        var mainPersonID = req.params.mainPersonID;
        var followerID = req.params.followerID;
        userModel
            .followUser(mainPersonID,followerID)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });

    }

    function getUsersOnSetOfIDS(req,res) {
        var userIds = req.body;
        userModel
            .getUsersOnSetOfIDS(userIds)
            .then(function (users) {
                    res.json(users);
                }, function (error) {
                    res.sendStatus(500);
                }
            );

    }

};