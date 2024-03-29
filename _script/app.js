'use strict';

define(['angular'].concat(config.app.modules_routes).concat(config.app.models_routes), function () {

    var app = angular.module(config.app.name, config.app.modules.concat(config.app.models)), $routeProviderReference;

    app.config(['$routeProvider', '$httpProvider', '$locationProvider',
        function($routeProvider, $httpProvider, $locationProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            $locationProvider.hashPrefix('!');
            $routeProviderReference = $routeProvider;

            (function routes_setup() {

                var j = 0,
                    currentRoute,
                    default_route;

                for (; j < config.app.routes.length; j++) {

                    currentRoute = config.app.routes[j];

                    $routeProviderReference.when(currentRoute.route, {
                        templateUrl: (currentRoute.templateUrl) ? currentRoute.templateUrl : config.app.routes_base.html + currentRoute.name + '.html',
                        controller: (currentRoute.controller) ? currentRoute.controller : currentRoute.name + 'Ctrl',
                        isFree: currentRoute.isFree
                    });

                    if (currentRoute.default) {
                        default_route = currentRoute.route
                    }

                }

                $routeProviderReference.otherwise({
                    redirectTo: (default_route ? default_route : config.app.routes[0].route)
                });

            })();

        }
    ]);
    
    return app;
});