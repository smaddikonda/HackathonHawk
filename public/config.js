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
            .when("/password-reset", {
                templateUrl: "views/templates/common/password-reset.view.client.html",
                controller: "PasswordResetController",
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
                resolve: { loggedin:
                    function($q, $timeout, $http, $location, $rootScope) {
                        var deferred = $q.defer();
                        $http.get('/api/loggedin').success(function(user) {
                            $rootScope.errorMessage = null;
                            if (user !== '0') {
                                $rootScope.currentUser = user;
                                console.log("config says user found");
                                deferred.resolve();
                            } else {
                                deferred.reject();
                                //$location.url('/');
                            }
                        });
                        return deferred.promise;
                    }
                }
            })

            .when("/user/:uid/home", {
                templateUrl: "views/templates/user/user-dashboard.view.client.html",
                controller: "UserHomeController",
                controllerAs: "model"
            })

            .when("/user/:uid/search", {
                templateUrl: "views/templates/user/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/search/organizer/:hid/", {
                templateUrl: "views/templates/user/single-hackathon-search.view.client.html",
                controller: "SingleHackathonSearchController",
                controllerAs: "model"
            })

            .when("/user/:uid/profile", {
                templateUrl: "views/templates/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/bookmarks", {
                templateUrl: "views/templates/user/bookmarks.view.client.html",
                controller: "BookmarkController",
                controllerAs: "model"
            })
            .when("/user/:uid/network", {
                templateUrl: "views/templates/user/network.view.client.html",
                controller: "NetworkController",
                controllerAs: "model"
            })

            .when("/organizer/:oid", {
                templateUrl: "views/templates/organizer/organizer-home.view.client.html",
                controller: "OrganizerHomeController",
                controllerAs: "model"
            })
            .when("/organizer/:oid/home", {
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
            });

    }
})();
