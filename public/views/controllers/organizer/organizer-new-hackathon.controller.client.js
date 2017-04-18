(function () {
    angular
        .module("HackathonHawk")
        .controller("NewHackathonController", NewHackathonController);

    function NewHackathonController(OrganizerService, $location, $routeParams) {
        var viewModel = this;
        viewModel.oid = $routeParams['oid'];

        viewModel.createHackathon = createHackathon;

        function init() {
            var promise = OrganizerService.findOrganizerById(viewModel.oid);
            promise.then(
                function successCallback(response) {
                    viewModel.organizer = response.data;
                }
            );
        }
        init();

        function createHackathon(organizer) {
            if(!organizer ||
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
                        viewModel.error = "Posting the hackathon failed. Please retry."
                    }
                );
            }
        }
    }
})();