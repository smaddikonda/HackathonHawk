(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminUserManageController", AdminUserManageController);

    function AdminUserManageController(UserService, $routeParams) {
        var viewModel = this;

        viewModel.uid = $routeParams['uid'];
        viewModel.user = null;

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
                    $route.reload();
                });
        }
    }
})();