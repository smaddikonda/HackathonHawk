(function () {
    angular
        .module("HackathonHawk")
        .controller("FriendFinderController", FriendFinderController);

    function FriendFinderController(UserService, $routeParams, $rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.uid = viewModel.currentUser._id;

        viewModel.findFriendByUsername = findFriendByUsername;
        viewModel.followUser = followUser;
        viewModel.unfollowUser = unfollowUser;
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
            if(!friendUsername)
            {
                viewModel.friends=undefined;
                viewModel.errorMessage = "Please search by Username";

            }
            else{
                var friendUsername = friendUsername.username;
                if(friendUsername){
                    var promise = UserService.findFriendByUsername(friendUsername);
                    promise.then(
                        function (friends) {
                            friends = friends.data;
                            if(friends !=undefined && friends.length!=0) {
                                for(var i=friends.length-1; i>=0; i--){
                                    if(friends[i].username == viewModel.currentUser.username){
                                        friends.splice(i, 1);
                                    }
                                }
                                if(friends.length == 0){
                                    viewModel.friends=undefined;
                                    viewModel.errorMessage = "Sorry, no results matching the Username: " + friendUsername;
                                } else{
                                    viewModel.errorMessage = undefined;
                                    viewModel.friends = friends;
                                }
                            } else {
                                viewModel.friends=undefined;
                                viewModel.errorMessage = "Sorry, no results matching the Username: " + friendUsername;
                            }
                        }
                    );
                }
                else{
                    viewModel.friends=undefined;
                    viewModel.errorMessage = "Please search by Username";
                }
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

        function unfollowUser(friend) {
            var promise = UserService.unfollowUser(friend._id, viewModel.uid);
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