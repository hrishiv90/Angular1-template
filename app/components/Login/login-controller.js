"use strict";

module.exports = function ($scope, config, LoginService) {

    console.log('test login Ctrl');
    $scope.domain = '';

    LoginService.clearCredentials();

    $scope.login = function() {
        // $scope.$parent.toggleLoader();  // Activate loader if any
        var username = $scope.username;
        var password = $scope.password;

        $state.go('dashboard');
        
        // var newUsername = config.encryptText(username);
        // var newpassword = config.encryptText(password);

        // LoginService.login(newUsername, newpassword)
        // .then(function (response) {
        //     var data = response.data;
        //     if (data && data.success) {
        //         LoginService.setCredentials(newUsername, data.token);
        //         $state.go('dashboard'); // go to homepage or dashboard on login success
        //     } else {
        //         $scope.form.reset();
        //         $scope.toggleMessage('error', 'Invalid Username or password');
        //     }
        // }, function (err) {
        //     $scope.$parent.toggleLoader();
        //     $scope.username = '';
        //     $scope.password = '';
        //     $scope.toggleMessage('error', 'Failed to Login');
        //     console.log(err);
        // });
    };
};
