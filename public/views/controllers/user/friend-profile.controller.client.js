(function () {
    angular
        .module("HackathonHawk")
        .controller("FriendProfileController", FriendProfileController);

    function FriendProfileController(UserService, $routeParams, $rootScope) {
        var viewModel = this;
        viewModel.uid = $routeParams['uid'];
        viewModel.fid = $routeParams['fid'];
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.hacker = null;

        viewModel.followUser = followUser;
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