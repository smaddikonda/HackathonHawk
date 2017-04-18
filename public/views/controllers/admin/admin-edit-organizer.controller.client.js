(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminEditOrganizerController", AdminEditOrganizerController);

    function AdminEditOrganizerController(OrganizerService, $routeParams, $location) {
        var viewModel = this;

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