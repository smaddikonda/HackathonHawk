(function (){
    angular
        .module("HackathonHawk")
        .controller("SingleHackathonSearchController", SingleHackathonSearchController);

    function SingleHackathonSearchController(HackathonWatchService, $location, $routeParams) {
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
