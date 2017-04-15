(function (){
    angular
        .module("HackathonHawk")
        .controller("GuestSingleHackathonSearchResultController", GuestSingleHackathonSearchResultController);

    function GuestSingleHackathonSearchResultController(HackathonWatchService, $location, $routeParams) {
        var viewModel = this;
        var hackathonid =$routeParams['hid'];
        viewModel.hackathonid = hackathonid;

        function searchByHackathonId(hackathonid) {
            HackathonWatchService.searchHackathonById(hackathonid).then(function (response) {
                viewModel.hackathon = response.data;
            })
        }
        searchByHackathonId(viewModel.hackathonid);
    }
})();
