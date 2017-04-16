(function (){
    angular
        .module("HackathonHawk")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams, $location) {
        var viewModel = this;
        viewModel.uid = $routeParams['uid'];
        viewModel.user = null;

        viewModel.updateProfile = updateProfile;

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
    }
})();