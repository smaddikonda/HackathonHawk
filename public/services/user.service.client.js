(function () {
    angular
        .module("HackathonHawk")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "login" : login,
            "logout" : logout,
            "register": register,
            "findAllUsers": findAllUsers,
            "findFriendByUsername":findFriendByUsername,
            "followUser":followUser,
            "getAllUsersByIds":getAllUsersByIds
        };
        return api;


        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }
        
        function register(user) {
            return $http.post("/api/register", user);
        }

        function createUser(newUser) {
            return $http.post("/api/user", newUser);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }

        function findAllUsers() {
            return $http.get("/api/all");
        }

        //follow users functionality
        function getAllUsersByIds(userIds) {
            return $http.post("/get/users/ids",userIds);
        }
        function followUser(mainPersonID,followerID) {
            return $http.post("/rest/following/"+mainPersonID+"/follower/"+followerID);
        }

        function findFriendByUsername(username) {
            return $http.get("/rest/enduser/findfriends/"+username);
        }
    }
})();