(function (){
    angular
        .module("HackathonHawk")
        .controller("SingleHackathonSearchController", SingleHackathonSearchController);

    function SingleHackathonSearchController(HackathonWatchService, OrganizerService, UserService, $location, $routeParams, $rootScope, $route) {
        var viewModel = this;
        viewModel.currentUser = $rootScope.currentUser;
        viewModel.uid = viewModel.currentUser._id;
        var hackathonid =$routeParams['hid'];
        viewModel.hackathonid = hackathonid;

        viewModel.bookmark = bookmark;
        viewModel.unbookmark = unbookmark;
        viewModel.logout = logout;

        function init() {
            var promise = OrganizerService.findOrganizerById(viewModel.hackathonid);
            promise
                .then(
                    function (response) {
                        var hackathon = response.data;
                        viewModel.hackathon = hackathon;
                    });
        }
        init();

        function bookmark(hackathon) {
            UserService.findUserById(viewModel.uid)
                .then(
                    function (response) {
                        var user = response.data;
                        var existingBookMarks = user.bookmarks;
                        if(existingBookMarks){
                            if(existingBookMarks.indexOf(hackathon._id) == -1){
                                user.bookmarks.push(hackathon._id);
                            }
                        } else{
                            user.bookmarks = [hackathon._id];
                        }
                        UserService.updateUser(viewModel.uid, user)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if(user) {
                                        viewModel.success = "This Hackathon is now bookmarked";
                                        var promise = UserService.findUserById(viewModel.uid);
                                        promise
                                            .then(function (response) {
                                            var user = response.data;
                                            if(user){
                                                viewModel.currentUser = user;
                                            }
                                        });
                                    }
                                });
                    });
        }

        function unbookmark(hackathon) {
            UserService.findUserById(viewModel.uid)
                .then(
                    function (response) {
                        var user = response.data;
                        var existingBookMarks = user.bookmarks;
                        if(existingBookMarks){
                            for(var i= existingBookMarks.length-1; i>=0; i--){
                                var bm = existingBookMarks[i];
                                if(bm==hackathon._id){
                                    existingBookMarks.splice(i,1);
                                }
                            }
                        }
                        user.bookmarks = existingBookMarks;
                        UserService.updateUser(viewModel.uid, user)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if(user) {
                                        var promise = UserService.findUserById(viewModel.uid);
                                        promise
                                            .then(function (response) {
                                                var user = response.data;
                                                if(user){
                                                    viewModel.currentUser = user;
                                                }
                                            });
                                    }
                                });
                    });
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