(function () {
    angular
        .module("HackathonHawk")
        .controller("SignupController", SignupController);

    function SignupController(UserService, $location, $rootScope) {
        var viewModel = this;

        viewModel.signup = signup;

        /*
         function signup(user) {
         if( user == undefined ||
         user.firstName == null ||
         user.lastName == null ||
         user.username == null ||
         user.email == null ||
         user.password == null) {
         viewModel.error = "Please provide all the fields."
         } else {
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
         */

        function signup(user) {
            if( user == undefined ||
                user.firstName == null ||
                user.lastName == null ||
                user.username == null ||
                user.email == null ||
                user.password == null) {
                viewModel.error = "Please provide all the fields."
            } else {
                var promise = UserService.register(user);
                promise
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user != null){
                                $rootScope.currentUser = user;
                                $location.url("/user/"+user._id);
                            } else{
                                viewModel.error = "Username already exists. Please pick another one.";
                            }
                        },
                        function (err) {
                            viewModel.error = "User not created. Please retry";
                        }
                    );
            }
        }
    }
})();