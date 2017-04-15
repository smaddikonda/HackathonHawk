(function (){
    angular
        .module("HackathonHawk")
        .controller("BookmarkController", BookmarkController);

    function BookmarkController($location) {
        var model = this;
    }
})();