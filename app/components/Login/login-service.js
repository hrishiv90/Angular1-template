"use strict";

module.exports = function($state, $http, config) {
    var service = {};
    
    service.setCredentials = function (username, token) {
        var userData = {
           username: username,
           token: token
        };
        config.userData = userData;
        localStorage.setItem('auth_data', JSON.stringify(userData));
        // $http.defaults.headers.common['Authorization'] = token;
    };
 
    service.login = function(username, password, callback) {

        return $http({
            method: 'POST',
            url: config.apiBase + 'authenticate',
            data: {
                username: username,
                password: password
            }
        });
    };

    service.clearCredentials = function () {
        config.userData = {};
        localStorage.removeItem('auth_data');
    };

    return service;
};
