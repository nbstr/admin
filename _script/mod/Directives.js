'use strict';

define(['angular'], function(angular) {

    angular.module('Directives', [])
    /*
    |--------------------------------------------------------
    | DIRECTIVES
    |--------------------------------------------------------
    */
    .directive('background', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var watchFunction = function () {
                        var url = attrs.background;
                        url = scope.$eval(url);
                        if (url && url != "") {
                            element.css('background-image', 'url("' + config.filesURL + url + '")');
                        }
                    }
                    scope.$watch(attrs.background, watchFunction);
                }

            };
    }])
    .directive('nbRightClick', function($parse) {
        return {
            restrict: 'A',
            scope: {
                nbRightClick: "="
            },
            link:function(scope, element, attrs) {
                var actions = scope.nbRightClick;
                element.bind('contextmenu', function(event) {
                    event.preventDefault();
                    (function(){
                        console.log(actions);
                    })();
                });
            }
        };
    })
    .directive('nbDrag', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if(attrs.nbDrag)
                        $(element).draggable({
                            handle: attrs.nbDrag,
                            containment: ".lsd-screen"
                        });
                    else
                        $(element).draggable();
                }
            }
    }])
    .directive('resizeControll', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    window.onresize = function () {
                        for (var i = 0; i < $rootScope.resizeFunction.length; i++) {
                            $rootScope.resizeFunction[i].call(this);
                        }
                    }
                }
            }
    }])
    .directive('nbLink', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.bind("click", function (e) {
                        window.location.href = element.find('a').attr('href');
                        e.preventDefault();
                        if (e.stopImmediatePropagation)
                            e.stopImmediatePropagation();
                        if (e.stopPropagation)
                            e.stopPropagation();
                        return false;
                    });
                }
            }
    }])
    .directive('nbPreview', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if (attrs.nbPreview == "") {
                        alert("Provide an attribute to nb-preview");
                        return false;
                    }
                    var watchFunction = function () {
                        var item = scope.$eval(attrs.nbPreview);
                        //console.log(item);
                        if (item && item != "") {
                            element.bind("click", function (e) {
                                console.log(item);
                                alert("open preview (very soon)");
                            });
                        }
                    }
                    scope.$watch(attrs.nbPreview, watchFunction);
                }
            }
    }])
    .directive('nbMap', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    //load google map
                    var myLatlng = new google.maps.LatLng(41.8337329, -87.7321555);
                    var myOptions = {
                        zoom: 14,
                        center: myLatlng,
                        scrollwheel: false,
                        navigationControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        draggable: false,
                        disableDoubleClickZoom: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    var map = new google.maps.Map(element[0], myOptions);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        animation: google.maps.Animation.BOUNCE,
                        icon: 'images/pin.png',
                        map:map,
                    });
                    /*var contentString =
                        '<div id="map-info">' +
                        '<div>401 N Morgan Street</div>'+
                        '<div>Chicago IL 606042</div>'+
                        '</div>'
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });                
                    infowindow.open(map,marker);*/
                    //google.maps.event.trigger(map, 'resize');
                }
            }
    }])
    .directive('callback', ['$timeout', function($timeout) {
        /*----------------------------------------------
        | TO USE ON NG REPEAT ELEMENT
        |
        | fires function after the ng-repeat is done loading all the loops
        |
        | attribute callback="function()"
        ----------------------------------------------*/
        return function(scope, element, attr) {
            if (scope.$last){
                $timeout(function () {
                    scope.$apply(attr.callback);
                });
            }
        };
    }])
    .directive('newTab', [function () {
        /*----------------------------------------------
        | TO USE ON ANY TAG
        |
        | opens the link provided in the attribute's value
        | in a new tab
        |
        | attribute new-tab="http://www.example.com"
        ----------------------------------------------*/
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(element.attr('new-tab'), '_blank').focus();
                });
            }
        }
    }])
    .directive('nav', function ($rootScope, $location) {
        /*----------------------------------------------
        | TO USE ON A TAG
        |
        | navigation on site with animation effects
        |
        | <a href="/home" nav>
        ----------------------------------------------*/
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $rootScope.navigate(element.attr('href'), $rootScope.empty_data(attr.reload != undefined, false));
                });
            }
        }
    })
    .directive('trigger', [function () {
        /*----------------------------------------------
        | TO USE ON ANY TAG THAT TRIGGERS ANOTHER TAG'S CLICK EVENT
        |
        | triggers the click event of a tag by entering its css selector
        | as an attribute.
        |
        | attribute trigger="#file"
        ----------------------------------------------*/
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(attr.trigger).click();
                });
            }
        }
    }])
    .directive('background', ["$rootScope",function($rootScope){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var watchFunction=function(){
                    var url = attrs.background;
                    url=scope.$eval(url);
                    if(url && url!=""){
                        element.css('background-image','url("'+$rootScope.clean_img_url(url)+'")');
                    }
                }
                scope.$watch(attrs.background,watchFunction);
            }
            
        };
    }])
});