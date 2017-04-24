(function () {
    angular
        .module("HackathonHawk")
        .service("OrganizerService", organizerService);

    function organizerService($http) {
        var api = {
            "login" : login,
            "logout" : logout,
            "register" : register,

            "createOrganizer" : createOrganizer,
            "createOrganizerForAPIHackathon": createOrganizerForAPIHackathon,
            "findOrganizerById" : findOrganizerById,
            "findOrganizerByCredentials" : findOrganizerByCredentials,
            "findOrganizerByUsername" : findOrganizerByUsername,
            "updateOrganizer" : updateOrganizer,
            "deleteHackathon" : deleteHackathon,
            "findAllHackathons": findAllHackathons,
            "findHackathonByApiId": findHackathonByApiId,
            "findAllPostsForUser": findAllPostsForUser,
            "findAllBookmarkedHackathons": findAllBookmarkedHackathons
        }
        return api;

        function login(organizer) {
            return $http.post("/api/organizer/login", organizer);
        }

        function logout() {
            return $http.post("/api/organizer/logout");
        }

        function register(organizer) {
            return $http.post("/api/organizer/register", organizer);
        }

        function createOrganizer(newOrganizer) {
            return $http.post("/api/organizer", newOrganizer);
        }

        function createOrganizerForAPIHackathon(newOrganizer) {
            return $http.post("/api/organizer/hackathonWatch/add", newOrganizer);
        }

        function findAllHackathons() {
            return $http.get("/api/hackathons/all");
        }

        function findHackathonByApiId(apiId) {
            return $http.get("/api/organizer/api/" + apiId);
        }
        
        function findOrganizerById(organizerId) {
            return $http.get("/api/organizer/" + organizerId);
        }

        function findOrganizerByCredentials(organizerName, password) {
            return $http.get("api/organizer?username=" + organizerName + "&password=" + password);
        }

        function findOrganizerByUsername(organizerName) {
            return $http.get("api/organizer?username=" + organizerName);
        }

        function findAllPostsForUser(hackathonIds) {
            return $http.post("/api/organizer/user/allPosts", hackathonIds);
        }

        function updateOrganizer(organizerId, organizer) {
            return $http.put("/api/organizer/" + organizerId, organizer);
        }

        function findAllBookmarkedHackathons(hackathonIds) {
            return $http.post("/api/user/bookmarks", hackathonIds);
        }
        
        function deleteHackathon(organizerId) {
            return $http.delete("/api/organizer/" + organizerId);
        }
    }

})();