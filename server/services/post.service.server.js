module.exports = function (app, postModel) {

    app.post("/api/post", createPost);
    app.get("/api/post", findAllPosts);
    app.get("/api/user/:uid/post", findAllPostsByUser);
    app.get("/api/organizer/:oid/post", findAllPostsByOrganizer);
    app.get("/api/hackathon/:hid/post", findAllPostsByHackathon);
    app.get("/api/post/:pid", findPostById);

    function createPost(req, res) {
        var newPost = req.body;
        var hackathonId = req.query.hid;
        var userId = req.query.uid;
        var organizerId = req.query.oid;
        postModel.createPost(newPost, hackathonId, userId, organizerId)
            .then(function (post) {
                res.json(post);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    
    function findAllPostsByUser(req, res) {
        var userId = req.params.uid;
        postModel
            .findAllPostsByUser(userId)
            .then(
                function (posts) {
                    res.json(posts);
                }, function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findAllPostsByOrganizer(req, res) {
        var organizerId = req.params.oid;
        postModel
            .findAllPostsByOrganizer(organizerId)
            .then(
                function (posts) {
                    res.json(posts);
                }, function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findAllPostsByHackathon(req, res) {
        var hackathonId = req.params.hid;
        postModel.findAllPostsByHackathon(hackathonId)
            .then(
                function (posts) {
                    res.json(posts);
                }, function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findAllPosts(req, res) {
        postModel
            .findAllPosts()
            .then(
                function (posts) {
                    res.json(posts);
                }, function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findPostById() {
        var postId = req.params.pid;
        postModel
            .findPostById(postId)
            .then(
                function (post) {
                    res.json(post);
                }, function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

};