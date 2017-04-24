(function (){
    angular
        .module("HackathonHawk")
        .controller("OrganizerLoginController", OrganizerLoginController);

    function OrganizerLoginController(OrganizerService, $location, $rootScope) {
        var viewModel = this;

        viewModel.login = login;

        function login(organizer) {
            var promise = OrganizerService.login(organizer);

            promise
                .then(
                    function successCallback(response) {
                        var organizer = response.data;
                        $rootScope.currentUser = organizer;
                        if(organizer) {
                            $location.url("/organizer");
                        } else {
                            viewModel.error = "Organizer not found. Please retry";
                        }
                    },

                    function errorCallback(response) {
                        viewModel.error = "Organizer not found. Please retry";
                    });
        }
    }
})();