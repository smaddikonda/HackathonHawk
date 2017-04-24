(function () {
    angular
        .module("HackathonHawk")
        .controller("HackathonEditController", HackathonEditController);

    function HackathonEditController(OrganizerService, $location, $routeParams, $rootScope) {

        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.oid = viewModel.currentUser._id;

        viewModel.editHackathon = editHackathon;
        viewModel.logout = logout;

        function init() {
            var promise = OrganizerService.findOrganizerById(viewModel.oid);
            promise.then(
                function successCallback(response) {
                    var organizer = response.data;
                    organizer.retypePassword = organizer.password;
                    viewModel.organizer = organizer;
                }
            );
        }
        init();

        function editHackathon(organizer) {
            if(organizer == undefined ||
                organizer.username == null||
                organizer.email == null||
                organizer.name == null||
                organizer.start_timestamp == null||
                organizer.finish_timestamp == null||
                organizer.public_url == null||
                organizer.full_address == null ||
                organizer.password == null ||
                organizer.retypePassword == null) {

                if(organizer &&
                    organizer.username &&
                    organizer.name &&
                    organizer.start_timestamp &&
                    organizer.finish_timestamp &&
                    organizer.public_url &&
                    organizer.full_address &&
                    organizer.password &&
                    organizer.retypePassword &&
                    !organizer.email){
                    viewModel.error = "Please enter a valid email id."
                } else{
                    viewModel.error = "Please provide all the fields."
                }
            } else {
                if(organizer.password == organizer.retypePassword){
                    var promise = OrganizerService.updateOrganizer(viewModel.oid, organizer);
                    promise.then(
                        function successCallback(response) {
                            $location.url("/organizer/");
                        },
                        function errorCallback(response) {
                            viewModel.error = "Editing the info failed. Please retry."
                        });
                } else{
                    viewModel.error = "The password fields do not match."
                }
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