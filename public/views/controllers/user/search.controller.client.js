(function (){
    angular
        .module("HackathonHawk")
        .controller("SearchController", SearchController);

    function SearchController(HackathonWatchService, $location, $routeParams) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.uid = userId;
        viewModel.searchByHackathonId = searchByHackathonId;

        function searchHackathons() {
            HackathonWatchService.searchHackathons().then(function (response) {
                viewModel.hackathons = response.data;
            })
        }
        searchHackathons();

        function searchByHackathonId(hackathonid) {
            $location.url("/user/" + viewModel.uid + "/search/organizer/" + hackathonid + "/");
        }
    }
})();
