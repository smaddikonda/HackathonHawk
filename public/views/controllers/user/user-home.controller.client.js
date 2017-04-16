(function (){
    angular
        .module("HackathonHawk")
        .controller("UserHomeController", UserHomeController);

    function UserHomeController(UserService, $routeParams) {
        var viewModel = this;

        viewModel.uid = $routeParams['uid'];
        viewModel.user = null;

        function init() {
            var promise = UserService.findUserById(viewModel.uid);
            promise
                .then(
                    function successCallback(response) {
                        viewModel.user = response.data;
                    }
                );
        }
        init();




    }
})();