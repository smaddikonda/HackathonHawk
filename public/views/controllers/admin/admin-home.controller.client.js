(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminController", AdminController);

    function AdminController(UserService, OrganizerService) {
        var viewModel = this;

        viewModel.users = [];
        viewModel.organizers = [];

        init();
        function init() {
            var promise = UserService.findAllUsers();
            promise
                .then(
                    function (response) {
                        var users = response.data;
                        viewModel.users = users;
                    }
                );
        }
    }
})();