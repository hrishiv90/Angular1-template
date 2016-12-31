'use strict';

var angular = require('angular'),
	angularRouter = require('angular-ui-router');

var router = require('./Shared/router'),
	config = require('./Shared/config'),
	MainCtrl = require('./Shared/main-controller'); // sample controller

var LoginCtrl = require('./Login/login-controller'),
	DashboardCtrl = require('./Dashboard/dashboard-controller'),
	NestedPageCtrl = require('./NestedPage/nested-page-controller');

var LoginService = require('./Login/login-service'); // sample service
var alertDirective = require('./Shared/alert-directive'); // sample dierctive
var loaderDirective = require('./Shared/loader-directive');

var app = angular.module('testApp', [ angularRouter ]);

app.config(router);

app.factory('config', ['$http', config]);
app.factory('LoginService', ['$state', '$http', 'config', LoginService]);
app.controller('MainCtrl', ['$scope', '$timeout', MainCtrl]);
app.controller('LoginCtrl', ['$scope', '$state', 'config', 'LoginService', LoginCtrl]);
app.controller('DashboardCtrl', ['$scope', DashboardCtrl]);
app.controller('NestedPageCtrl', ['$scope', NestedPageCtrl]);
app.directive('alertDirective', ['$timeout', alertDirective]);
app.directive('loaderDirective', [loaderDirective]);

// Remove logs once setup is done
console.log('Angular with browserify works');