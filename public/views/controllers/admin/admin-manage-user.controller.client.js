(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminUserManagerController", AdminUserManagerController);

    function AdminUserManagerController(UserService, $location, $route) {
        var viewModel = this;

        viewModel.users = [];

        viewModel.editUser = editUser;
        viewModel.deleteUser = deleteUser;

        init();
        function init() {
            var promise = UserService.findAllUsers();
            promise
                .then(
                    function (response) {
                        viewModel.users = response.data;
                    }
                );
        }

        function editUser(userid) {
            $location.url("/admin/user/" + userid);
        }

        function deleteUser(userId) {
            var promise = UserService.deleteUser(userId);
            promise.then(
                function (response) {
                    $route.reload();
                }
            );
        }
    }
})();