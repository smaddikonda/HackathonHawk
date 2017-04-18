(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminController", AdminController);

    function AdminController(UserService, OrganizerService, $location) {
        var viewModel = this;

        viewModel.users = [];
        viewModel.organizers = [];
        viewModel.usersNumber = null;
        viewModel.organizersNumber = null;

        viewModel.manageUsers = manageUsers;
        viewModel.manageOrganizers = manageOrganizers;

        init();
        function init() {
            var promise = UserService.findAllUsers();
            promise
                .then(
                    function (response) {
                        var users = response.data;
                        viewModel.users = users;
                        viewModel.usersNumber = viewModel.users.length;
                    }
                );

            var orgPromise = OrganizerService.findAllHackathons();
            orgPromise
                .then(
                    function (response) {
                        var hackathons = response.data;
                        viewModel.organizers = hackathons;
                        viewModel.organizersNumber = viewModel.organizers.length;
                    }
                );
        }

        function manageUsers() {
            $location.url("/admin/user");
        }

        function manageOrganizers() {
            $location.url("/admin/organizer");
        }
    }
})();