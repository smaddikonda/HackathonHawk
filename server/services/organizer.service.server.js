module.exports = function (app, organizerModel) {

    app.post("/api/organizer", createOrganizer);
    app.get("/api/organizer", findOrganizer);
    app.get("/api/organizer/:organizerId", findOrganizerById);
    app.put("/api/organizer/:organizerId", updateOrganizer);

    function createOrganizer(req, res) {
        var newOrganizer = req.body;
        organizerModel
            .createOrganizer(newOrganizer)
            .then(function(organizer) {
                res.json(organizer);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateOrganizer(req, res) {
        var organizerId = req.params.organizerId;
        var organizer = req.body;
        organizerModel
            .updateOrganizer(organizerId,organizer)
            .then(function (organizer) {
                res.json(organizer);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findOrganizerById(req, res) {
        var organizerId = req.params.organizerId;
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

};
