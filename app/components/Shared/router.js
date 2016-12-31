"use strict";

module.exports = function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("login");

    $stateProvider.state('login', {
        url: "/login",
        templateUrl: "components/Login/login-view.html",
        controller: 'LoginCtrl'
    })
    
    .state('dashboard', {
        url: "/dashboard",
        templateUrl: "components/Dashboard/dashboard-view.html",
        controller: 'DashboardCtrl'
    })

    .state('dashboard.nested-page', {
        url: "/nested-page",
        templateUrl: "components/NestedPage/nested-page-view.html",
        controller: 'NestedPageCtrl'
    });
};