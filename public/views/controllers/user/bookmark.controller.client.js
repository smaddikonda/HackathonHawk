(function (){
    angular
        .module("HackathonHawk")
        .controller("BookmarkController", BookmarkController);

    function BookmarkController(UserService, OrganizerService, $location, $routeParams, $rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.uid = viewModel.currentUser._id;
        viewModel.bookmarks = [];
        viewModel.logout = logout;
        
        function init() {
            var promise = UserService.findUserById(viewModel.uid);
            promise
                .then(function (response) {
                    var user = response.data;
                    if(user){
                        viewModel.user = user;
                        var promise = OrganizerService.findAllBookmarkedHackathons(viewModel.user.bookmarks);
                        promise.then(
                            function (response) {
                                viewModel.bookmarks = response.data;
                            }
                        );

                    }
                })
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