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

        function updateOrganizer(organizerid, organizer) {
            var promise = OrganizerService.updateOrganizer(organizerid, organizer);
            promise
                .then(function (response) {
                    viewModel.organizer = response.data;
                    $location.url("/admin/organizer");
                });
        }
    }
})();