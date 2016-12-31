"use strict";

module.exports = function () {
    return {
        restrict: 'EA',
        link: function(scope) {
            scope.showloader = false;

            // Active/deactive loader fn
            scope.toggleLoader = function () {
                scope.showloader = !scope.showloader;
            };
        },
        template: '<div ng-show="showloader" class="overlay">'+
                    '<div class="loader"></div>'+
                '</div>'
    }
};