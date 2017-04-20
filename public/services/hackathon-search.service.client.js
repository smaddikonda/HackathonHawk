(function () {
    angular
        .module("HackathonHawk")
        .service("HackathonWatchService", HackathonWatchService);

    function HackathonWatchService($http) {
        var api = {
            searchHackathons:searchHackathons,
            searchHackathonById: searchHackathonById
        };
        return api;

        function searchHackathons() {
            var url = 'https://hackathonwatch.com/api/hackathons/coming.json';
            return $http.get(url);
        }

        function searchHackathonById(hackathonid) {
            var url = 'https://hackathonwatch.com/api/hackathons/' +hackathonid+ '.json';
            return $http.get(url);
        }
    }

})();