(function (){
    angular
        .module("HackathonHawk")
        .controller("GuestSearchResultController", GuestSearchResultController);

    function GuestSearchResultController(HackathonWatchService, OrganizerService, $location) {
        var viewModel = this;
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

        function searchByHackathonId(apiId, organizerId) {
            if(apiId){
                $location.url("/search-results/organizer/" + apiId);
            } else{
                $location.url("/search-results/organizer/" + organizerId);
            }

        }
    }
})();
