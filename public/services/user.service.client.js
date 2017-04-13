
(function (){
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
            "login" : login
        };
        return api;
        
        function login() {
            
        }
        
        function createUser() {
            
        }
        
        function findUserByCredentials() {
            
        }
        
        function findUserById() {
            
        }
        
        function findUserByUsername() {
            
        }
        
        function deleteUser() {
            
        }
    }
})();