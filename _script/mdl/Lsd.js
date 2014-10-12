'use strict';

/*----------------------------------------------------------------------------------*\
|
|  LARAVEL SD
|
\*----------------------------------------------------------------------------------*/

define(['angular'], function(angular) {

    angular.module('Lsd', []).factory( '$lsd', [ 'Resource', function( $resource ) {
        return {
            /*
            |--------------------------------------------------------
            | All
            |--------------------------------------------------------
            */
            all: $resource( '_data/lsd.json',
                {},
                {
                    query: {
                        method:'GET',
                        isArray:false
                    }
                }
            ),
            /*
            |--------------------------------------------------------
            | Tables
            |--------------------------------------------------------
            */
            tables: $resource( '_data/lsd.json',
                {
                    id: '@id'
                },
                {
                    query: {
                        method:'GET',
                        isArray:true,
                        transformResponse: function (r) {
                            if(!r.error){
                                // order table fields by position
                                var T = angular.fromJson(r).data.tables;
                                T.forEach(function(t){
                                    t.fields.sortKey('position');
                                });
                            }
                            return T
                        }
                    }
                }
            )
        }
    }]);
});