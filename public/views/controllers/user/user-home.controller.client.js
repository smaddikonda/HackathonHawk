(function (){
    angular
        .module("HackathonHawk")
        .controller("UserHomeController", UserHomeController);

    function UserHomeController(UserService, OrganizerService, $routeParams, $location, $rootScope) {
        var viewModel = this;

        viewModel.uid = $routeParams['uid'];
        viewModel.user = null;
        viewModel.bookmarks = null;
        viewModel.allPosts = null;
        
        viewModel.logout = logout;

        function init() {
            var promise = UserService.findUserById(viewModel.uid);
            promise
                .then(
                    function successCallback(response) {
                        viewModel.user = response.data;
                        viewModel.bookmarks = viewModel.user.bookmarks;
                        for (b in viewModel.bookmarks) {
                            OrganizerService.findAllPostsByHackathon(b)
                                .then(function (response) {
                                    var posts = response.data;
                                    viewModel.allPosts.concat(posts);
                                });
                        }
                    }
                );
        }
        init();
        
        function logout() {
            UserService.logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    }
                )
        }
    }
})();