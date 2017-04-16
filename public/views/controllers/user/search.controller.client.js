(function (){
    angular
        .module("HackathonHawk")
        .controller("SearchController", SearchController);

    function SearchController(HackathonWatchService, OrganizerService, $location, $routeParams) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.uid = userId;
        viewModel.apiHackathons = null;
        viewModel.postedHackathons = null;

        viewModel.searchByHackathonId = searchByHackathonId;

        function searchHackathons() {
            HackathonWatchService.searchHackathons()
                .then(function (response) {
                    apiHackathons = response.data;
                    OrganizerService.findAllHackathons()
                        .then(
                            function (response) {
                                postedHackathons = response.data;
                                if(postedHackathons) {
                                    for (var i = postedHackathons.length - 1; i >= 0; i--) {
                                        if (!postedHackathons[i].name) {
                                            postedHackathons.splice(i, 1);
                                        }
                                    }
                                    apiHackathons = apiHackathons.concat(postedHackathons);
                                }
                                viewModel.hackathons = apiHackathons;
                            });
                });
        }
        searchHackathons();

        function searchByHackathonId(hackathonid, hackathon_id) {
            if(hackathon_id){
                var promise = OrganizerService.findOrganizerById(hackathon_id);
                promise
                    .then(function (response) {
                        var hackathon = response.data;
                        if(hackathon){
                            $location.url("/user/" + viewModel.uid + "/search/organizer/" + hackathon_id + "/");
                        }
                    });
            } else {
                $location.url("/user/" + viewModel.uid + "/search/organizer/" + hackathonid + "/");
            }
        }
    }
})();
