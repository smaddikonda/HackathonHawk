/**
 * Created by SMaddikonda on 3/5/2017.
 */

(function (){
    angular
        .module("HackathonHawk")
        .controller("PasswordResetController", PasswordResetController);

    function PasswordResetController($location) {
        var model = this;
        model.pwReset = true;
    }
})();
