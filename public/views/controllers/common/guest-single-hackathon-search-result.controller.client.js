(function (){
    angular
        .module("HackathonHawk")
        .controller("GuestSingleHackathonSearchResultController", GuestSingleHackathonSearchResultController);

    function GuestSingleHackathonSearchResultController(HackathonWatchService, OrganizerService, $location, $routeParams) {
        var viewModel = this;
        var hackathonid =$routeParams['hid'];
        viewModel.hackathonid = hackathonid;

        function init() {
            var promise = OrganizerService.findOrganizerById(viewModel.hackathonid);
            promise.then(
                function (response) {
                    var organizer = response.data;
                    if(organizer){
                        viewModel.hackathon = organizer;
                    } else{
                        var promise = HackathonWatchService.searchHackathonById(viewModel.hackathonid);
                        promise.then(function (response) {
                            viewModel.hackathon = response.data;
                        });
                    }
                }, function (err) {
                    var promise = HackathonWatchService.searchHackathonById(viewModel.hackathonid);
                    promise.then(function (response) {
                        viewModel.hackathon = response.data;
                    });
                }
            );
        }
        init();
    }
})();
