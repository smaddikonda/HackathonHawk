(function () {
    angular
        .module("HackathonHawk")
        .service("OrganizerService", organizerService);

    function organizerService($http) {
        var api = {
            "createOrganizer" : createOrganizer,
            "findOrganizerById" : findOrganizerById,
            "findOrganizerByCredentials" : findOrganizerByCredentials,
            "findOrganizerByUsername" : findOrganizerByUsername,
            "updateOrganizer" : updateOrganizer,
            "deleteHackathon" : deleteHackathon,
            "findAllHackathons": findAllHackathons
        }
        return api;

        function createOrganizer(newOrganizer) {
            return $http.post("/api/organizer", newOrganizer);
        }

        function findAllHackathons() {
            return $http.get("/api/hackathons/all");
        }
        
        function findOrganizerById(organizerId) {
            return $http.get("/api/organizer/" + organizerId);
        }

        function findOrganizerByCredentials(organizerName, password) {
            return $http.get("api/organizer?organizername=" + organizerName + "&password=" + password);
        }

        function findOrganizerByUsername(organizerName) {
            return $http.egt("api/organizer?organizername=" + organizerName);
        }

        function updateOrganizer(organizerId, organizer) {
            return $http.put("/api/organizer/" + organizerId, organizer);
        }
        
        function deleteHackathon() {

        }
    }

})();