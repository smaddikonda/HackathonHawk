(function () {
    angular
        .module("HackathonHawk")
        .controller("OrganizerHomeController", OrganizerHomeController);

    function OrganizerHomeController(OrganizerService, PostService, $location, $routeParams, $route) {
        var viewModel = this;

        viewModel.posts = null;
        viewModel.hackathonId = $routeParams['oid'];
        viewModel.organizer = null;
        viewModel.hackathon = null;
        viewModel.message = null;

        viewModel.submitPost = submitPost;

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

    }
})();