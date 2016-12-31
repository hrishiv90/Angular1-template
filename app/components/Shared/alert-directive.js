"use strict";

module.exports = function ($timeout) {
    return {
        restrict: 'EA',
        link: function(scope, elem, attrs, ctrl) {
            scope.alertMessage = false;

            // msgType {success, error, confirm}
            // msg {simple message when success/error & object with title and body for confirm type}
            // sample msg when "confirm" msgtype { title: '', body: '', okBtnText: '' }
            scope.toggleMessage = function (msgType, msg, callback) {
                scope.msgType = msgType == 'error' ? 'danger' : msgType;
                if (msgType == 'confirm') {
                    scope.alertConfirm = msg || false;
                    scope.okBtnText = msg.okBtnText || 'Ok';
                    scope.confirm = function (action) {
                        if (callback && action && action == 'ok') {
                            callback();
                        }
                        scope.toggleMessage('confirm', false);
                    };
                } else {
                    scope.alertMessage = msg || false;
                    if (scope.alertMessage) {
                        $timeout(scope.toggleMessage, 3500);
                    }
                }
            };
        },
        template: '<div class="row overlay" ng-show="alertMessage || alertConfirm.title" ng-click="toggleMessage()">'+
            '<div class="col-xs-12 text-center">'+
                '<div ng-class="\'alert-\' + msgType" class="alert" ng-show="alertMessage">'+
                    '<div class="container-close"></div>'+
                    '<img ng-show="msgType === \'success\'" src="./images/tick_icon.png">'+
                    '<img ng-show="msgType === \'danger\'" src="./images/close_icon.png">'+
                    '<span>{{ alertMessage }}</span>'+
                '</div>'+
                '<div ng-show="alertConfirm.title" class="panel panel-info alert alert-confirm">'+
                    '<div class="panel-heading"><div class="panel-title">{{ alertConfirm.title }}</div></div>'+
                    '<div class="panel-body">'+
                        '<p>{{ alertConfirm.body }}</p>'+
                        '<button class="btn btn-primary" ng-click="confirm(\'ok\')">{{ okBtnText || "Ok" }}</button>'+
                        '<button class="btn btn-danger" ng-click="confirm(\'cancel\')">Cancel</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    }
};