module.exports = function (app, organizerModel) {

    app.post("/api/organizer", createOrganizer);
    app.post("/api/organizer/hackathonWatch/add", createOrganizerForAPIHackathon);
    app.get("/api/organizer", findOrganizer);
    app.get("/api/hackathons/all", findAllHackathons);
    app.get("/api/organizer/:oid", findOrganizerById);
    app.get("/api/organizer/api/:aid", findHackathonByAPIId);
    app.put("/api/organizer/:oid", updateOrganizer);
    app.post("/api/user/bookmarks", findAllBookmarkedHackathons);
    app.delete("/api/organizer/:oid", deleteOrganizer);

    function createOrganizer(req, res) {
        var newOrganizer = req.body;
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
        var organizername = req.query.organizername;
        var password = req.query.password;
        if(organizername && password) {
            findOrganizerByCredentials(req, res);
        } else if(organizername) {
            findOrganizerByUsername(req, res);
        }
    }

    function findOrganizerByUsername(req, res) {
        var organizername = req.params.organizername;
        organizerModel
            .findOrganizerByUsername(username)
            .then(function (organizer) {
                res.json(organizer);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findOrganizerByCredentials(req, res){
        var organizername = req.query.organizername;
        var password = req.query.password;

        organizerModel
            .findOrganizerByCredentials(organizername,password)
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
