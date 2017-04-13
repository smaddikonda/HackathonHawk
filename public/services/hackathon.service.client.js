(function () {
    angular
        .module("HackathonHawk")
        .factory("HackathonService", hackathonService);

    function hackathonService($http) {
        var api = {
            "createHackathon" : createHackathon,
            "findHackathonById" : findHackathonById,
            "findHackathonByDates" : findHackathonByDates,
            "editHacakthon" : editHackathon,
            "deleteHackathon" : deleteHackathon,
        }
        return api;

        function createHackathon() {
            
        }
        
        function findHackathonById() {
            
        }
        
        function findHackathonByDates() {
            
        }
        
        function editHackathon() {
            
        }
        
        function deleteHackathon() {

        }
    }

})();