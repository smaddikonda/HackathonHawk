(function () {
    angular
        .module("HackathonHawk")
        .controller("HackathonEditController", HackathonEditController);

    function HackathonEditController(OrganizerService, $location, $routeParams) {
        var viewModel = this;
        var organizerid = $routeParams['oid'];
        viewModel.oid = organizerid;

        viewModel.editHackathon = editHackathon;

        function init() {
            var promise = OrganizerService.findOrganizerById(viewModel.oid);
            promise.then(
                function successCallback(response) {
                    viewModel.organizer = response.data;
                }
            );
        }
        init();

        function editHackathon(organizer) {
            if(!organizer ||
                !organizer.organizername ||
                !organizer.email ||
                !organizer.name ||
                !organizer.start_timestamp ||
                !organizer.finish_timestamp ||
                !organizer.public_url ||
                !organizer.full_address) {
                viewModel.error = "All fields are mandatory."
            } else {
                var promise = OrganizerService.updateOrganizer(viewModel.oid, organizer);
                promise.then(
                    function successCallback(response) {
                        $location.url("/organizer/" + viewModel.oid);
                    },
                    function errorCallback(response) {
                        viewModel.error = "Editing the info failed. Please retry."
                    }
                );
            }
        }
    }
})();