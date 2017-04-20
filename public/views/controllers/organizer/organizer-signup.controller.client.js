(function () {
    angular
        .module("HackathonHawk")
        .controller("OrganizerSignupController", OrganizerSignupController);

    function OrganizerSignupController(OrganizerService, $location) {
        var viewModel = this;

        viewModel.signup = signup;

        function signup(organizer) {
            var promise = OrganizerService.createOrganizer(organizer);
            promise.then(
                function successCallback(response) {
                    var organizer = response.data;
                    if(organizer!=null) {
                        $location.url("/organizer/" + organizer._id);
                    } else {
                        viewModel.error = "Organizer name already exists. Please pick a different one.";
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "User not created. Please retry";
                });
        }
    }
})();