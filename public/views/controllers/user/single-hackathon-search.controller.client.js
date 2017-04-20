(function (){
    angular
        .module("HackathonHawk")
        .controller("SingleHackathonSearchController", SingleHackathonSearchController);

    function SingleHackathonSearchController(HackathonWatchService, OrganizerService, UserService, $location, $routeParams, $rootScope) {
        var viewModel = this;
        viewModel.uid = $routeParams['uid'];
        viewModel.currentUser = $rootScope.currentUser;
        var hackathonid =$routeParams['hid'];
        viewModel.hackathonid = hackathonid;

        viewModel.bookmark = bookmark;
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