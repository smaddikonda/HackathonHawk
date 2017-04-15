(function (){
    angular
        .module("HackathonHawk")
        .controller("GuestSearchResultController", GuestSearchResultController);

    function GuestSearchResultController(HackathonWatchService, $location) {
        var viewModel = this;

        viewModel.searchByHackathonId = searchByHackathonId;

        function searchHackathons() {
            HackathonWatchService.searchHackathons().then(function (response) {
                viewModel.hackathons = response.data;
            })
        }
        searchHackathons();

        function searchByHackathonId(hackathonid) {
            $location.url("/search-results/organizer/" + hackathonid);
        }
    }
})();
