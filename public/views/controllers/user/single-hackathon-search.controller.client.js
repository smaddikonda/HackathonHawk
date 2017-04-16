(function (){
    angular
        .module("HackathonHawk")
        .controller("SingleHackathonSearchController", SingleHackathonSearchController);

    function SingleHackathonSearchController(HackathonWatchService, OrganizerService, UserService, $location, $routeParams) {
        var viewModel = this;
        viewModel.uid = $routeParams['uid'];
        var hackathonid =$routeParams['hid'];
        viewModel.hackathonid = hackathonid;

        viewModel.bookmark = bookmark;

        function searchByHackathonId(hackathonid) {
            var promise = OrganizerService.findOrganizerById(hackathonid);
            promise
                .then(
                    function (response) {
                        var hackathon = response.data;
                        viewModel.hackathon = hackathon;
                    },
                    function (response) {
                        HackathonWatchService.searchHackathonById(hackathonid)
                            .then(function (response) {
                                viewModel.hackathon = response.data;
                            });
                    }
                );
        }
        searchByHackathonId(viewModel.hackathonid);

        function bookmark(hackathon) {
            UserService.findUserById(viewModel.uid)
                .then(
                    function (response) {
                        var user = response.data;
                        user.bookmarks.push(viewModel.hackathonid);
                        UserService.updateUser(viewModel.uid, user)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if(user) {
                                        viewModel.success = "This Hackathon is now bookmarked";
                                    }
                                });
                    }
                );
        }
    }
})();
