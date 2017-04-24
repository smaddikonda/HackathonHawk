(function (){
    angular
        .module("HackathonHawk")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams, $location, $rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.uid = viewModel.currentUser._id;
        viewModel.user = null;

        viewModel.updateProfile = updateProfile;
        viewModel.logout = logout;

        function init(){
            var promise = UserService.findUserById(viewModel.uid);
            promise
                .then(function successCallback(response) {
                        var user = response.data;
                        user.retypePassword = user.password;
                        viewModel.user = user;
                    }
                )
        }
        init();

        function updateProfile(user) {
            if( user == undefined ||
                user.firstName == null ||
                user.lastName == null ||
                user.username == null ||
                user.email == null ||
                user.password == null ||
                user.retypePassword == null) {
                if(user && user.firstName && user.lastName && !user.email && user.password && user.retypePassword){
                    viewModel.error = "Please enter a valid Organizer email id."
                } else{
                    viewModel.error = "Please provide all the fields."
                }
            } else {
                if(user.password == user.retypePassword){
                    var promise = UserService.updateUser(viewModel.uid, user);
                    promise
                        .then(
                            function succesCallback(response) {
                                var user = response.data;
                                if(user) {
                                    $location.url("/user");
                                } else{
                                    viewModel.error = "Username already exists. Please pick another one";
                                }
                            });

                } else {
                    viewModel.error = "The password fields do not match."
                }
            }
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