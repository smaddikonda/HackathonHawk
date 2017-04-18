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
        
        viewModel.searchByHackathonId = searchByHackathonId;

        init();
        function init() {
            viewModel.apiHackathons = searchAPIHackathons();

        }

        function searchAPIHackathons() {
            var promise = HackathonWatchService.searchHackathons();
            promise.then(
                function (response) {
                    var apiHackathons = response.data;
                    if (apiHackathons) {
                        return apiHackathons;
                    }
                });
        }

        function searchDBHackathons() {
            var promise = OrganizerService.findAllHackathons();
            promise
                .then(function (response) {
                    var dbHackathons = response.data;
                })
        }


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
