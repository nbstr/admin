'use strict';

define(['angular'], function(angular) {

    angular.module('Filters', [])
    /*
    |--------------------------------------------------------
    | FILTERS
    |--------------------------------------------------------
    */
    .filter('capitalize', [function() {
        return function(input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
    }]);
});