/**
 * Created by SMaddikonda on 3/4/2017.
 */
(function (){
    angular
        .module("HackathonHawk")
        .controller("LoginController", LoginController);

    function LoginController($location) {
        var model = this;
        model.login = true;
    }
})();