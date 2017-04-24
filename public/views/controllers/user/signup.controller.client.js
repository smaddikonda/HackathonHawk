(function () {
    angular
        .module("HackathonHawk")
        .controller("SignupController", SignupController);

    function SignupController(UserService, $location, $rootScope) {
        var viewModel = this;

        viewModel.signup = signup;

        function signup(user) {
            if( user == undefined ||
                user.firstName == null ||
                user.lastName == null ||
                user.username == null ||
                user.email == null ||
                user.password == null ||
                user.retypePassword == null) {
                if(user && user.firstName && user.lastName && !user.email && user.password && user.retypePassword){
                    viewModel.error = "Please enter a valid email id."
                } else{
                    viewModel.error = "Please provide all the fields."
                }
            } else {
                if(user.password == user.retypePassword){
                    var promise = UserService.register(user);
                    promise
                        .then(
                            function (response) {
                                var user = response.data;
                                if(user != null){
                                    $rootScope.currentUser = user;
                                    $location.url("/user");
                                } else{
                                    viewModel.error = "Username already exists. Please pick another one.";
                                }
                            },
                            function (err) {
                                viewModel.error = "User not created. Please retry";
                            }
                        );
                } else {
                    viewModel.error = "The password fields do not match."
                }
            }
        }
    }
})();