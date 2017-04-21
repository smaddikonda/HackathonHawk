(function () {
    angular
        .module("HackathonHawk")
        .controller("OrganizerSignupController", OrganizerSignupController);

    function OrganizerSignupController(OrganizerService, $location) {
        var viewModel = this;

        viewModel.signup = signup;

        function signup(organizer) {
            if( organizer == undefined ||
                organizer.organizername == null ||
                organizer.email == null ||
                organizer.password == null ||
                organizer.retypePassword == null){
                if(organizer && organizer.organizername && !organizer.email && organizer.password && organizer.retypePassword){
                    viewModel.error = "Please enter a valid email id.";
                } else{
                    viewModel.error = "Please provide all the fields";
                }
            } else{
                if(organizer.password == organizer.retypePassword){
                    var promise = OrganizerService.createOrganizer(organizer);
                    promise.then(
                        function successCallback(response) {
                            var organizer = response.data;
                            if(organizer!=null) {
                                $location.url("/organizer/" + organizer._id);
                            } else {
                                viewModel.error = "Organizer name already exists. Please pick a different one.";
                            }
                        },
                        function errorCallback(response) {
                            viewModel.error = "User not created. Please retry";
                        });
                } else{
                    viewModel.error = "The password fields do not match."
                }
            }
        }
    }
})();