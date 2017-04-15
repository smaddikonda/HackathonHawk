(function (){
    angular
        .module("HackathonHawk")
        .controller("OrganizerLoginController", OrganizerLoginController);

    function OrganizerLoginController(OrganizerService, $location) {
        var viewModel = this;

        viewModel.login = login;

        function login(organizer) {
            var promise = OrganizerService
                .findOrganizerByCredentials(organizer.organizername, organizer.password);

            promise.then(
                function successCallback(response) {
                    organizer = response.data;
                    if(organizer!="") {
                        $location.url("/organizer/" + organizer._id);
                    } else {
                        viewModel.error = "Organizer not found. Please retry";
                    }},

                function errorCallback(response) {
                    viewModel.error = "Organizer not found. Please retry";
                });
        }
    }
})();