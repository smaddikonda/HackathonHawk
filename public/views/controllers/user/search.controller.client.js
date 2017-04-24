(function (){
    angular
        .module("HackathonHawk")
        .controller("SearchController", SearchController);

    function SearchController(UserService, HackathonWatchService, OrganizerService, $location, $routeParams, $rootScope) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.uid = viewModel.currentUser._id;

        viewModel.apiHackathons = [];
        viewModel.dbHackathons = [];
        viewModel.hackathons = [];

        viewModel.searchByHackathonId = searchByHackathonId;
        viewModel.searchAPIHackathons = searchAPIHackathons;
        viewModel.searchDBHackathons = searchDBHackathons;
        viewModel.logout = logout;

        init();
        function init() {
            //First find all the API Hackathons
            var promise = HackathonWatchService.searchHackathons();
            promise.then(
                function (response) {
                    var apiHackathons = response.data;
                    if (apiHackathons) {
                        viewModel.apiHackathons = apiHackathons;
                        //Find all the DB hackathons
                        var promise = OrganizerService.findAllHackathons();
                        promise
                            .then(function (response) {
                                var dbHackathons = response.data;
                                if(dbHackathons){
                                    viewModel.dbHackathons = dbHackathons;
                                    //Filter DB Hackathons based on if .id is present.
                                    for(var i=viewModel.dbHackathons.length-1; i>=0; i--){
                                        var hack = viewModel.dbHackathons[i];
                                        var apiId = hack.id;
                                        var hackathonName = hack.name;
                                        if(apiId || hackathonName==null){
                                            viewModel.dbHackathons.splice(i, 1);
                                        }
                                    }
                                    viewModel.hackathons = viewModel.apiHackathons.concat(viewModel.dbHackathons);
                                }
                            })
                    }
                });
        }

        function searchAPIHackathons() {
            var promise = HackathonWatchService.searchHackathons();
            promise.then(
                function (response) {
                    var apiHackathons = response.data;
                    if (apiHackathons) {
                        viewModel.apiHackathons = apiHackathons;
                    }
                });
        }

        function searchDBHackathons() {
            var promise = OrganizerService.findAllHackathons();
            promise
                .then(function (response) {
                    var dbHackathons = response.data;
                    if(dbHackathons){
                        viewModel.dbHackathons = dbHackathons;
                    }
                })
        }

        function searchByHackathonId(apiId, organizer_id) {
            //Case when the hackathon has only .id but not ._id
            if(apiId && !organizer_id){
                var promise = HackathonWatchService.searchHackathonById(apiId);
                promise
                    .then(
                        function (response) {
                            var apiHackathon = response.data;
                            var organizer = apiHackathon;
                            var promise = OrganizerService.findHackathonByApiId(apiId);
                            promise.then(
                                function (response) {
                                    var apiHack = response.data;
                                    if(!apiHack){
                                        organizer.id = apiId;
                                        var promise = OrganizerService.createOrganizerForAPIHackathon(organizer);
                                        promise
                                            .then(
                                                function (response) {
                                                    var organizer = response.data;
                                                    if(organizer) {
                                                        $location.url("/user/search/organizer/"+organizer._id);
                                                    } else{
                                                        $location.url("/user/search/organizer/"+organizer_id);
                                                    }
                                                });
                                    } else{
                                        $location.url("/user/search/organizer/"+apiHack._id);
                                    }
                                });
                        });
            }
                //case when hackathon
            else{
                    $location.url("/user/search/organizer/"+organizer_id);
                }
            }

            function logout() {
                UserService.logout()
                    .then(
                        function (response) {
                            $rootScope.currentUser = null;
                            $location.url("/");
                        }
                    )
            }
        }
    })();
