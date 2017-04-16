(function (){
    angular
        .module("HackathonHawk")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootScope) {
        var viewModel = this;

        viewModel.login = login;

        /*
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
         */

        function login(user) {
            var promise = UserService.login(user);
            promise
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        if(user) {
                            $location.url("/user/" + user._id);
                        } else {
                            viewModel.error = "User not found. Please retry";
                        }
                    },
                    function (response) {
                        viewModel.error = "User not found. Please retry";
                    }
                );
        }
    }
})();