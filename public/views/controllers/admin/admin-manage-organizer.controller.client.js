(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminOrganizerManagerController", AdminOrganizerManagerController);

    function AdminOrganizerManagerController(OrganizerService, $location, $route, $rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.organizers = [];

        viewModel.editOrganizer = editOrganizer;
        viewModel.deleteOrganizer = deleteOrganizer;
        viewModel.logout = logout;

        init();
        function init() {
            var promise = OrganizerService.findAllHackathons();
            promise
                .then(
                    function (response) {
                        viewModel.organizers = response.data;
                        for(var i=viewModel.organizers.length-1; i>=0; i--){
                            var organizer = viewModel.organizers[i];
                            if(!organizer.username){
                                viewModel.organizers.splice(i, 1);
                            }
                        }
                    }
                );
        }

        function editOrganizer(organizerId) {
            $location.url("/admin/organizer/" + organizerId);
        }

        function deleteOrganizer(organizerId) {
            var promise = OrganizerService.deleteHackathon(organizerId);
            promise.then(
                function (response) {
                    $route.reload();
                }
            );
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