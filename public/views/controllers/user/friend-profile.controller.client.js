(function () {
    angular
        .module("HackathonHawk")
        .controller("FriendProfileController", FriendProfileController);

    function FriendProfileController(UserService, $routeParams, $rootScope, $route) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.uid = viewModel.currentUser._id;
        viewModel.fid = $routeParams['fid'];
        viewModel.hacker = null;

        viewModel.followUser = followUser;
        viewModel.unfollowUser = unfollowUser;
        viewModel.logout = logout;

        init();
        function init() {
            var promise = UserService.findUserById(viewModel.uid);
            promise.then(
                function (response) {
                    var user = response.data;
                    viewModel.user = user;
                    var promise = UserService.findUserById(viewModel.fid);
                    promise
                        .then(function (response) {
                            var hacker = response.data;
                            if(hacker) {
                                viewModel.hacker = hacker;
                            }
                        });
                }
            );
        }

        function followUser(friend) {
            var promise = UserService.followUser(friend._id, viewModel.uid);
            promise
                .then(function (response) {
                    var user = response.data;
                    if(user){
                        viewModel.user = user;
                        $route.reload();
                    }
                })
        }

        function unfollowUser(friend) {
            var promise = UserService.unfollowUser(friend._id, viewModel.uid);
            promise
                .then(function (response) {
                    var user = response.data;
                    if(user){
                        viewModel.user = user;
                        $route.reload();
                    }
                })
        }

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