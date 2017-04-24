(function () {
    angular
        .module("HackathonHawk")
        .controller("NewHackathonController", NewHackathonController);

    function NewHackathonController(OrganizerService, $location, $routeParams, $rootScope) {

        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.oid =  viewModel.currentUser._id;

        viewModel.createHackathon = createHackathon;
        viewModel.logout = logout;

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
                        if(response.status == 200){
                            $location.url("/organizer/");
                        } else{
                            viewModel.error = "Posting the hackathon failed. Please retry.";
                        }
                    },
                    function errorCallback(response) {
                        viewModel.error = "Posting the hackathon failed. Please retry.";
                    }
                );
            }
        }

        function logout() {
            OrganizerService.logout()
                .then(
                    function (response) {
                        $rootScope.currentOrganizer = null;
                        $location.url("/");
                    }
                )
        }
    }
})();