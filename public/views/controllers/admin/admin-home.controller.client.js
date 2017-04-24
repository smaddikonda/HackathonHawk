(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminController", AdminController);

    function AdminController(UserService, OrganizerService, $location, $rootScope) {
        var viewModel = this;

        viewModel.users = [];
        viewModel.organizers = [];
        viewModel.usersNumber = null;
        viewModel.organizersNumber = null;
        viewModel.currentUser = $rootScope.currentUser;

        viewModel.manageUsers = manageUsers;
        viewModel.manageOrganizers = manageOrganizers;
        viewModel.logout = logout;

        init();
        function init() {
            var promise = UserService.findAllUsers();
            promise
                .then(
                    function (response) {
                        var users = response.data;
                        if(users){
                            viewModel.users = users;
                            viewModel.usersNumber = viewModel.users.length;
                        }
                    }
                );

            var orgPromise = OrganizerService.findAllHackathons();
            orgPromise
                .then(
                    function (response) {
                        var hackathons = response.data;
                        viewModel.organizers = hackathons;
                        for(var i=viewModel.organizers.length-1; i>=0; i--){
                            var organizer = viewModel.organizers[i];
                            if(!organizer.username){
                                viewModel.organizers.splice(i, 1);
                            }
                        }
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