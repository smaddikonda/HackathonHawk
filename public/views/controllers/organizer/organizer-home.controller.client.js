(function () {
    angular
        .module("HackathonHawk")
        .controller("OrganizerHomeController", OrganizerHomeController);

    function OrganizerHomeController(OrganizerService, PostService, $location, $routeParams, $route) {
        var viewModel = this;

        viewModel.posts = [];
        viewModel.hackathonId = $routeParams['oid'];
        viewModel.organizer = null;
        viewModel.hackathon = null;
        viewModel.message = null;

        viewModel.submitPost = submitPost;
        viewModel.deletePost = deletePost;

        function init() {
            var promise = OrganizerService.findOrganizerById(viewModel.hackathonId);
            promise.then(
                function successCallback(response) {
                    viewModel.organizer = response.data;
                    if(viewModel.organizer.name) {
                        viewModel.hackathon = viewModel.organizer;
                        var postsPromise = PostService.findAllPostsByHackathon(viewModel.hackathonId);
                        postsPromise.then(
                            function success(response) {
                                viewModel.posts = response.data;
                            },
                            function errorCall(response) {
                                viewModel.message = "No posts to show";
                            }
                        );
                    } else{
                        viewModel.message = "No hackathon to show"
                    }
                },
                function errorCallback() {
                    viewModel.message = "No hackathon to show"
                }
            );
        }
        init();

        function submitPost(post) {
            var oid = viewModel.hackathonId;
            //Since the post was posted by the organizer and not the user,
            // we set the user id field as blank.
            var promise = PostService.createPost(post, viewModel.hackathonId, "", oid);
            promise.then(
                function successCallback(response) {
                    post = response.data;
                    if(post) {
                        $route.reload();
                    } else {
                        viewModel.message = "Submitting post failed. Please retry."
                    }
                }, function errorCallback(response) {
                    viewModel.message = "Submitting post failed. Please retry."
                }
            )
        }

        function deletePost(post) {
            var postId = post._id;
            var promise = PostService.deletePost(postId);
            promise.then(
                function (response) {
                    var deletedPost = response.data;
                    if(deletedPost) {
                        viewModel.posts.splice(viewModel.posts.indexOf(post), 1);
                    } else{
                        viewModel.message = "Could not delete post. Please retry."
                    }
                }
            );
        }

    }
})();