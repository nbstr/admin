'use strict';

define(['angular'], function(angular) {

    angular.module('Rootscope', [])
    /*
    |--------------------------------------------------------
    | ROOTSCOPE
    |--------------------------------------------------------
    */
    .run(['$rootScope', '$route','$http', '$location',
        function($rootScope, $route, $http, $location) {

            // BOOT MENU
            $rootScope.nav_elements = [];
            config.app.routes.forEach(function(e){
                if(e.menu.display){
                    $rootScope.nav_elements.push({
                        title: e.menu.title,
                        icon: 'fa-' + e.menu.icon,
                        link: '#!' + e.route
                    });
                }
            });
            $rootScope.nav_display = function () {
                $('nav.menu li.list').delay(200).animate({
                    opacity:"1"
                }, 500, 'linear');
            };
            var tmp_test = true;
            $rootScope.urlClass = function(path) {
                if(tmp_test) console.log({path:path, location:$location.path(), location_path:$location.path().substr(0, path.length)});
                tmp_test = false;
                if ('#!' + $location.path().substr(0, path.length) == path) {
                  return "active"
                } else {
                  return ""
                }
            }
            //-----------
            // NAVIGATION
            //-----------
            $rootScope.navigate = function(url, force_reload){
                if(url != $location.path() && url != 'reload' && !$rootScope.empty_data(force_reload, false)){
                    $(".wrapper").fadeOut(300, function(){
                        $location.path(url.substring(2));
                        $rootScope.$apply(function(){
                            $rootScope.screen_on();
                        });
                    });
                }
            };
            $rootScope.screen_on = function(delay, callback){
                if(typeof(callback) === 'function'){
                    if($(".wrapper").css("display") == "none"){
                        $(".wrapper").delay($rootScope.empty_data(delay, 0)).fadeIn(300, function(){
                            callback();
                        });
                    }
                }
                else{
                    if($(".wrapper").css("display") == "none"){
                        $(".wrapper").delay($rootScope.empty_data(delay, 0)).fadeIn(300);
                    }
                }
            };
            $rootScope.empty_data = function (data, new_data){if(data == '' || data == undefined){return new_data}else{return data}};

            // FUNCTIONS        
            $rootScope.substring = function(full_str, sub_str) {
                if (full_str == undefined) {
                    return ''
                }
                return full_str.substring(full_str.lastIndexOf(sub_str))
            };

            $rootScope.clean_img_url = function(url, relative, str) {
                var clean_url;

                if (str) {
                    clean_url = $rootScope.substring(url, str);
                } else {
                    clean_url = $rootScope.substring(url, 'uploads/');
                }
                //console.log(clean_url);
                if (relative) {
                    return (clean_url).replace(/ /g, '%20');
                } else {
                    return (config.filesURL + clean_url).replace(/ /g, '%20');
                }
            };

            $rootScope.empty_data = function(data, new_data) {
                if (data == '' || data == undefined) {
                    return new_data
                } else {
                    return data
                }
            };

            $rootScope.scroll_top = function(delay, position) {
                $("body").delay($rootScope.empty_data(delay, 0)).animate({
                    scrollTop: $rootScope.empty_data(position, 0)
                }, '200', 'swing');
            };

            // ALERT MODAL
            $rootScope.alert_error = function() {
                $rootScope.alert('An unknown error occured. Please try again later.');
            }
            $rootScope.alert = function(message, param) {
                $('#message_modal #message_modal_content').html(array2str(message));
                $('#message_modal').modal('show');
                $rootScope.action=false;
                if (typeof(param) === 'function') {
                    $('#message_modal').one('hidden.bs.modal', function(e) {
                        param();
                    });
                }
                else if(typeof(param)==='object'){
                    $rootScope.action_modal=param;
                    $rootScope.action_modal.action_button=function(){
                        $('#message_modal').one('hidden.bs.modal', function(e) {
                            param.action();
                        });
                    }
                    $rootScope.action=true;
                }
            };
            $rootScope.hide_alert_modal = function() {
                $('#message_modal').modal('hide');
            };
            // LOADING MODAL
            $rootScope.loading = function(fctn) {
                $('#loading_modal').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: true
                });
                if (typeof(fctn) === 'function') {
                    $('#loading_modal').one('hidden.bs.modal', function(e) {
                        fctn();
                    });
                }
            };
            $rootScope.loaded = function() {
                $('#loading_modal').modal('hide');
            };
            
            // PROMP MODAL
            $rootScope.prompt_modal_action = function(){
                $rootScope.action_prompt();
                $rootScope.hide_prompt_modal();  
            };
            $rootScope.prompt_modal = function (message, confirm, url){
                url = $rootScope.empty_data(url, '');
                $('#prompt_modal_content').html(message);
                $('#prompt_modal_confirm').html(confirm);
                $('#prompt_modal').modal('show');
                if(url != undefined && url != ''){
                    $('#prompt_modal').on('hidden.bs.modal', function (e) {
                        window.location.href = url;
                    });
                }
            };
            $rootScope.hide_prompt_modal = function(){
                $('#prompt_modal').modal('hide');
                $rootScope.action_prompt = function(){};
            };
            
            $rootScope.CONFIG = config;
            $rootScope.screen_on(500);

        }
    ]);
});