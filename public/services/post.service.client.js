(function () {
    angular
        .module("HackathonHawk")
        .factory("PostService", postService);

    function postService() {
        var api = {
            "createPost" : createPost,
            "findPostById" : findPostById,
            "findPostsByUser" : findPostsByUser,
            "findPostsByHackathon" : findPostsByHackathon,
            "editPost" : editPost,
            "deletePost" : deletePost
        }
        return api;
        
        function createPost() {
            
        }
        
        function findPostById() {
            
        }
        
        function findPostsByUser() {
            
        }
        
        function findPostsByHackathon() {
            
        }
        
        function editPost() {
            
        }
        
        function deletePost() {
            
        }
    }

})();
