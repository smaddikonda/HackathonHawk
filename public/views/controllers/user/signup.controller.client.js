(function () {
    angular
        .module("HackathonHawk")
        .controller("SignupController", SignupController);

    function SignupController(UserService, $location) {
        var viewModel = this;

        viewModel.signup = signup;

        function signup(user) {
            var promise = UserService.createUser(user);
            promise.then(function successCallback(response) {
                    user = response.data;
                    if(user) {
                        $location.url("/user/"+user._id);
                    } else {
                        viewModel.error = "User not created. Please retry";
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "User not created. Please retry";
                });
        }
    }
})();