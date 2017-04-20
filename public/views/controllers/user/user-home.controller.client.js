(function (){
    angular
        .module("HackathonHawk")
        .controller("UserHomeController", UserHomeController);

    function UserHomeController(UserService, OrganizerService, $routeParams, $location, $rootScope) {
        var viewModel = this;

        viewModel.uid = $routeParams['uid'];
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.user = null;
        viewModel.bookmarks = null;
        viewModel.allPosts = null;

        viewModel.posts = [];
        
        viewModel.logout = logout;

        function init() {
            var promise = UserService.findUserById(viewModel.uid);
            promise
                .then(
                    function successCallback(response) {
                        viewModel.user = response.data;
                        viewModel.bookmarks = viewModel.user.bookmarks;
                        var promise = OrganizerService.findAllPostsForUser(viewModel.bookmarks);
                        promise
                            .then(function (response) {
                                var posts = response.data;
                                if(posts){
                                    viewModel.posts = posts;
                                }
                            });
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