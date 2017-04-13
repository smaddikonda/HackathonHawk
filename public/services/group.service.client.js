(function () {
    angular
        .module("HackathonHawk")
        .factory("GroupFactory", groupFactory);

    function groupFactory() {
        var api = {
            "createGroup" : createGroup,
            "findGroupById" : findGroupById,
            "findGroupsByHackathon" : findGroupsByHackathon,
            "editGroup" : editGroup,
            "deleteGroup" : deleteGroup
        }
        return api;
        
        function createGroup() {
            
        }
        
        function findGroupById() {
            
        }
        
        function findGroupsByHackathon() {
            
        }
        
        function editGroup() {
            
        }
        
        function deleteGroup() {

        }
    }
})();