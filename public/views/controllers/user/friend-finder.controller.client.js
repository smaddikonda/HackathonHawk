(function () {
    angular
        .module("HackathonHawk")
        .controller("FriendFinderController", FriendFinderController);

    function FriendFinderController(UserService, $routeParams, $rootScope) {
        var viewModel = this;
        viewModel.uid = $routeParams['uid'];
        viewModel.currentUser = $rootScope.currentUser;

        viewModel.findFriendByUsername = findFriendByUsername;
        viewModel.followUser = followUser;
        viewModel.logout = logout;
        
        init();
        function init() {
            var promise = UserService.findUserById(viewModel.uid);
            promise.then(
                function (response) {
                    viewModel.user = response.data;
                }
            );
        }

        function findFriendByUsername(friendUsername) {
            var friendUsername = friendUsername.username;
            if(friendUsername){
                var promise = UserService.findFriendByUsername(friendUsername);
                promise.then(
                    function (friends) {
                        friends = friends.data;
                        if(friends !=undefined && friends.length!=0) {
                            viewModel.friends = friends;
                        } else {
                            viewModel.errorMessage = "Sorry, no results matching the Username: " + friendUsername;
                        }
                    }
                );
            }
            else{
                viewModel.errorMessage = "Please search by Username";
            }
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