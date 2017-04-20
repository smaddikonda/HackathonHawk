(function (){
    angular
        .module("HackathonHawk")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "views/templates/common/main.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/templates/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/signup", {
                templateUrl: "views/templates/user/signup.view.client.html",
                controller: "SignupController",
                controllerAs: "model"
            })
            .when("/organizer-login", {
                templateUrl: "views/templates/organizer/organizer-login.view.client.html",
                controller: "OrganizerLoginController",
                controllerAs: "model"
            })
            .when("/organizer-signup", {
                templateUrl: "views/templates/organizer/organizer-signup.view.client.html",
                controller: "OrganizerSignupController",
                controllerAs: "model"
            })

            .when("/search-results", {
                templateUrl: "views/templates/common/guest-search-result.view.client.html",
                controller: "GuestSearchResultController",
                controllerAs: "model"
            })
            .when("/search-results/organizer/:hid", {
                templateUrl: "views/templates/common/guest-single-hackathon-search-result.view.client.html",
                controller: "GuestSingleHackathonSearchResultController",
                controllerAs: "model"
            })

            .when("/user/:uid", {
                templateUrl: "views/templates/user/user-dashboard.view.client.html",
                controller: "UserHomeController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })
            .when("/user/:uid/home", {
                templateUrl: "views/templates/user/user-dashboard.view.client.html",
                controller: "UserHomeController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })
            .when("/user/:uid/search", {
                templateUrl: "views/templates/user/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })
            .when("/user/:uid/search/organizer/:hid", {
                templateUrl: "views/templates/user/single-hackathon-search.view.client.html",
                controller: "SingleHackathonSearchController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })
            .when("/user/:uid/profile", {
                templateUrl: "views/templates/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })
            .when("/user/:uid/bookmarks", {
                templateUrl: "views/templates/user/bookmarks.view.client.html",
                controller: "BookmarkController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })
            .when("/user/:uid/network", {
                templateUrl: "views/templates/user/network.view.client.html",
                controller: "NetworkController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })
            .when("/user/:uid/friend", {
                templateUrl: "views/templates/user/friend-finder.view.client.html",
                controller: "FriendFinderController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })
            .when("/user/:uid/friend/:fid", {
                templateUrl: "views/templates/user/friend-profile.view.client.html",
                controller: "FriendProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin:checkLoggedIn
                }
            })

            //Organizer routes
            .when("/organizer/:oid", {
                templateUrl: "views/templates/organizer/organizer-home.view.client.html",
                controller: "OrganizerHomeController",
                controllerAs: "model"
            })
            .when("/organizer/:oid/hackathon", {
                templateUrl: "views/templates/organizer/organizer-new-hackathon.view.client.html",
                controller: "NewHackathonController",
                controllerAs: "model"
            })
            .when("/organizer/:oid/hackathon/edit", {
                templateUrl: "views/templates/organizer/organizer-edit-hackathon.view.client.html",
                controller: "HackathonEditController",
                controllerAs: "model"
            })

            //Admin routes
            .when("/admin",{
                templateUrl:"views/templates/admin/admin-dashboard.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve : {
                    isAdmin : checkIsAdmin
                }
            })
            .when("/admin/user/",{
                templateUrl:"views/templates/admin/admin-manage-user.view.client.html",
                controller: "AdminUserManagerController",
                controllerAs: "model",
                resolve : {
                    isAdmin : checkIsAdmin
                }
            })
            .when("/admin/user/:uid",{
                templateUrl:"views/templates/admin/admin-edit-user.view.client.html",
                controller: "AdminEditUserController",
                controllerAs: "model",
                resolve : {
                    isAdmin : checkIsAdmin
                }
            })
            .when("/admin/organizer/",{
                templateUrl:"views/templates/admin/admin-manage-organizer.view.html",
                controller: "AdminOrganizerManagerController",
                controllerAs: "model",
                resolve : {
                    isAdmin : checkIsAdmin
                }
            })
            .when("/admin/organizer/:oid",{
                templateUrl:"views/templates/admin/admin-edit-organizer.view.client.html",
                controller: "AdminEditOrganizerController",
                controllerAs: "model",
                resolve : {
                    isAdmin : checkIsAdmin
                }
            })
            .when("/unauthorized", {
                templateUrl : "views/templates/admin/unauthorized.view.client.html"
            })


            .otherwise({
                redirectTo : "/"
            });
    }
})();


function checkLoggedIn($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/api/loggedin')
         .success(function(user) {
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            $rootScope.currentUser = null;
            deferred.reject();
            $location.url("/");
        }
    });
    return deferred.promise;
}

function checkIsAdmin($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/api/isAdmin')
        .then(function(user) {
            if (user.data !== '0') {
                $rootScope.currentUser = user.data;
                deferred.resolve();
            } else{
                $location.url("/unauthorized");
            }
        },
        function (err) {
            $location.url("/unauthorized");
        });
    return deferred.promise;
}