(function () {
    angular
        .module("HackathonHawk")
        .factory("PostService", postService);

    function postService($http) {
        var api = {
            createPost: createPost,
            findAllPosts:findAllPosts,
            findAllPostsByUser: findAllPostsByUser,
            findAllPostsByOrganizer: findAllPostsByOrganizer,
            findAllPostsByHackathon: findAllPostsByHackathon,
            findPostById: findPostById,
            deletePost:deletePost
        }
        return api;
        
        function createPost(post, hid, uid, oid) {
            return $http.post("/api/post?hid=" + hid + "&uid=" + uid + "&oid=" + oid, post);
        }
        
        function findPostById(pid) {
            return $http.get("/api/post/" + pid);
        }
        
        function findAllPosts() {
            return $http.get("/api/post");
        }
        
        function findAllPostsByUser(uid) {
            return $http.get("/api/user/" + uid + "/post");
        }
        
        function findAllPostsByOrganizer(oid) {
            return $http.get("/api/organizer/" + oid + "/post");
        }
        
        function findAllPostsByHackathon(hid) {
            return $http.get("/api/hackathon/" + hid + "/post");
        }

        function deletePost(postId) {
            return $http.delete("api/post/" + postId);
        }
    }

})();
