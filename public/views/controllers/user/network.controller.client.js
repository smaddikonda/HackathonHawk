(function () {
    angular
        .module("HackathonHawk")
        .controller("NetworkController", NetworkController);

    function NetworkController(UserService, $routeParams, $rootScope, $location, $route) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.uid = viewModel.currentUser._id;
        viewModel.followers = [];
        viewModel.following = [];
        viewModel.allFollowers = [];
        viewModel.allFollowing = [];

        viewModel.followUser = followUser;
        viewModel.unfollowUser = unfollowUser;
        viewModel.goToProfile = goToProfile;
        viewModel.logout = logout;

        init();
        function init() {
            var promise = UserService.findUserById(viewModel.uid);
            promise.then(
                function (response) {
                    var user = response.data;
                    viewModel.user = user;
                    if(user){
                        var followers = user.followers;
                        var following = user.following;
                        if(followers) {
                            viewModel.followers = followers;
                        }
                        if(following){
                            viewModel.following = following;
                        }
                        getFollowers();
                        getFollowing();
                    }
                }
            );
        }

        function getFollowers() {
            var promise = UserService.getAllUsersByIds(viewModel.followers);
            promise.then(
                function (response) {
                    var followers = response.data;
                    if(followers){
                        viewModel.allFollowers = followers;
                    }
                }
            );
        }

        function getFollowing() {
            var promise = UserService.getAllUsersByIds(viewModel.following);
            promise.then(
                function (response) {
                    var following = response.data;
                    if(following){
                        viewModel.allFollowing = following;
                    }
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

        function goToProfile(hacker) {
            $location.url("/user/friend/" + hacker._id);
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