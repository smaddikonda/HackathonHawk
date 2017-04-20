(function (){
    angular
        .module("HackathonHawk")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams, $location, $rootScope) {
        var viewModel = this;
        viewModel.uid = $routeParams['uid'];
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.user = null;

        viewModel.updateProfile = updateProfile;
        viewModel.logout = logout;

        function init(){
            var promise = UserService.findUserById(viewModel.uid);
            promise
                .then(function successCallback(response) {
                        viewModel.user = response.data;
                    }
                )
        }
        init();

        function updateProfile(user) {
            var promise = UserService.updateUser(viewModel.uid, user);
            promise
                .then(
                    function succesCallback(response) {
                        var user = response.data;
                        if(user) {
                            $location.url("/user/" + viewModel.uid);
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