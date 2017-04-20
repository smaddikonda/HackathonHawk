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

        function updateUser(userid, user) {
            var promise = UserService.updateUser(userid, user);
            promise
                .then(function (response) {
                    viewModel.user = response.data;
                    $location.url("/admin/user");
                });
        }
    }
})();