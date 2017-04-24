(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminEditUserController", AdminEditUserController);

    function AdminEditUserController(UserService, $routeParams, $location, $rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.uid = $routeParams['uid'];
        viewModel.user = null;

        viewModel.updateUser = updateUser;
        viewModel.logout = logout;

        init();
        function init() {
            var promise = UserService.findUserById(viewModel.uid);
            promise
                .then(
                    function (response) {
                        viewModel.user = response.data;
                    }
                );
        }

        function updateUser(user) {
            if(document.getElementById("admin-check-box").checked == true){
                user.roles.push('ADMIN');
            } else{
                if(viewModel.user.roles.indexOf('ADMIN')>-1){
                    user.roles.splice(user.roles.indexOf('ADMIN'),1);
                }
            }
            var promise = UserService.updateUser(viewModel.uid, user);
            promise
                .then(function (response) {
                    viewModel.user = response.data;
                    $location.url("/admin/user");
                });
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