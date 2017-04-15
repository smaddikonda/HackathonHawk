(function (){
    angular
        .module("HackathonHawk")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var viewModel = this;

        viewModel.login = login;

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user.username, user.password);

            promise.then(
                function successCallback(response) {
                    user = response.data;
                    if(user!="") {
                        $location.url("/user/" + user._id);
                    } else {
                        viewModel.error = "User not found. Please retry";
                    }},

                function errorCallback(response) {
                    viewModel.error = "User not found. Please retry";
                });
        }
    }
})();