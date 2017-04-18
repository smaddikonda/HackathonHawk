(function () {
    angular
        .module("HackathonHawk")
        .controller("AdminOrganizerManagerController", AdminOrganizerManagerController);

    function AdminOrganizerManagerController(OrganizerService, $location, $route) {
        var viewModel = this;

        viewModel.organizers = [];

        viewModel.editOrganizer = editOrganizer;
        viewModel.deleteOrganizer = deleteOrganizer;

        init();
        function init() {
            var promise = OrganizerService.findAllHackathons();
            promise
                .then(
                    function (response) {
                        viewModel.organizers = response.data;
                        for(var i=viewModel.organizers.length-1; i>=0; i--){
                            var organizer = viewModel.organizers[i];
                            if(!organizer.organizername){
                                viewModel.organizers.splice(i, 1);
                            }
                        }
                    }
                );
        }

        function editOrganizer(organizerId) {
            $location.url("/admin/organizer/" + organizerId);
        }

        function deleteOrganizer(organizerId) {
            var promise = OrganizerService.deleteUser(organizerId);
            promise.then(
                function (response) {
                    $route.reload();
                }
            );
        }
    }
})();