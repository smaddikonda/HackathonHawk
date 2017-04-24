(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminEditOrganizerController", AdminEditOrganizerController);

    function AdminEditOrganizerController(OrganizerService, $routeParams, $location, $rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.oid = $routeParams['oid'];
        viewModel.organizer = null;

        viewModel.updateOrganizer = updateOrganizer;
        viewModel.logout = logout;

        init();
        function init() {
            var promise = OrganizerService.findOrganizerById(viewModel.oid);
            promise
                .then(
                    function (response) {
                        viewModel.organizer = response.data;
                    }
                );
        }

        function updateOrganizer(organizer) {
            var promise = OrganizerService.updateOrganizer(viewModel.organizer._id, organizer);
            promise
                .then(function (response) {
                    var organizer = response.data;
                    if(viewModel.organizer){
                        viewModel.organizer = organizer;
                        $location.url("/admin/organizer");
                    }
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