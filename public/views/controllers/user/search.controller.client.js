(function (){
    angular
        .module("HackathonHawk")
        .controller("SearchController", SearchController);

    function SearchController(HackathonWatchService, OrganizerService, $location, $routeParams) {
        var viewModel = this;
        viewModel.uid = $routeParams['uid'];
        viewModel.apiHackathons = [];
        viewModel.createdHackathons = [];
        viewModel.hackathons = [];

        //api
        viewModel.searchByHackathonId = searchByHackathonId;

        function searchHackathons() {
            var promise = HackathonWatchService.searchHackathons();
            promise.then(
                function (response) {
                    var apiHackathons = response.data;
                    if(apiHackathons) {
                        viewModel.apiHackathons = apiHackathons;
                    }
                    var promise = OrganizerService.findAllHackathons();
                    promise.then(
                        function (response) {
                            var hackathonsInDB = response.data;
                            if(hackathonsInDB) {
                                for(h in hackathonsInDB){
                                    if(!h.id) {
                                        viewModel.createdHackathons.push(h);
                                    }
                                }
                                viewModel.hackathons = viewModel.apiHackathons.concat(viewModel.createdHackathons);
                                for(var i=viewModel.hackathons.length-1; i>=0; i--){
                                    if(viewModel.hackathons[i] == null || viewModel.hackathons[i].name == null) {
                                        viewModel.hackathons.splice(i, 1);
                                    }
                                }
                            }
                        }
                    )
                });
        }
        searchHackathons();

        function searchByHackathonId(apiId, organizer_id) {
            if(apiId && !organizer_id){
                var promise = HackathonWatchService.searchHackathonById(apiId);
                promise
                    .then(
                        function (response) {
                            var apiHackathon = response.data;
                            var organizer = apiHackathon;
                            organizer.id = apiId;
                            var promise = OrganizerService.createOrganizer(organizer);
                            promise
                                .then(
                                    function (response) {
                                        var organizer = response.data;
                                        $location.url("/user/"+viewModel.uid+"/search/organizer/"+organizer._id+"/");
                                    }
                            );
                        }
                    );
            } else{
                $location.url("/user/"+viewModel.uid+"/search/organizer/"+organizer_id+"/");
            }
        }
    }
})();
