/**
 * Created by SMaddikonda on 3/4/2017.
 */
(function (){
    angular
        .module("HackathonHawk")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "views/main/templates/common/main.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/main/templates/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/signup", {
                templateUrl: "views/main/templates/user/signup.view.client.html",
                controller: "SignupController",
                controllerAs: "model"
            })
            .when("/password-reset", {
                templateUrl: "views/main/templates/common/password-reset.view.client.html",
                controller: "PasswordResetController",
                controllerAs: "model"
            })
            .when("/organization-login", {
                templateUrl: "views/main/templates/organization/organization-login.view.client.html",
                controller: "OrganizationLoginController",
                controllerAs: "model"
            })
            .when("/organization-signup", {
                templateUrl: "views/main/templates/organization/organization-signup.view.client.html",
                controller: "OrganizationSignupController",
                controllerAs: "model"
            })

            .when("/user", {
                templateUrl: "views/main/templates/user/user-dashboard.view.client.html",
                controller: "UserController",
                controllerAs: "model"
            })
    }
})();
