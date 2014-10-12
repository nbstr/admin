'use strict';

define(['angular'], function(angular) {

    angular.module('Services', [])
    /*
    |--------------------------------------------------------
    | SERVICES
    |--------------------------------------------------------
    */
    .filter('capitalize', [function() {
        return function(input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
    }])
    .factory('$superCSS', [function() {
        return {
            set:(function(style){
                var sheet = document.head.appendChild(style).sheet;

                return function(selector, css){
                    var propText = Object.keys(css).map(function(p){
                        return p+":"+css[p]
                    }).join(";");
                    sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
                }
                
            })(document.createElement("style"))
        }
    }])
    .factory('formData',[function(){
        function formData($scope){
            this.$scope=$scope;
            if(!window.FormData){
                alert_modal("Your browser does not support FormData, try to update it");
            }
            else{
                this.form=new FormData();
            }
        }
        formData.prototype.setData=function(datas){
            for(data in datas){
                if(typeof datas[data]==='object'){
                    console.log(datas[data]);
                    if(datas[data].length !=undefined){
                        console.log("array");
                        if(datas[data].length>0){
                            for(var i=0;i<datas[data].length;i++){
                                var elem=datas[data][i];
                                for(key in elem){
                                    this.form.append(data+"["+i+"]["+key+"]",elem[key]);
                                }
                            }
                        }
                    }
                    else{
                        console.log("json");
                       for(key in datas[data]){
                            this.form.append(data+"["+key+"]",datas[data][key]);
                        } 
                    }
                }
                else{
                    this.form.append(data,datas[data]);
                }
            }
        }
        formData.prototype.setFile=function(files){
            //var files=fileInput[0].files;
            if(files.length!=0){
                this.form.append('file',files[0]);
            }    
        }
        formData.prototype.send=function(url,callback,progressFunction){
            var xhr = new XMLHttpRequest();
            xhr.open('POST',url); 
            progress={};
            var self=this;
            xhr.onload = function() {
                    if (callback && typeof(callback) === "function") {  
                        self.$scope.$apply(function(){
                            console.log(xhr.response);
                            callback.call(this,JSON.parse(xhr.response));
                        });
                    }
            };
            xhr.upload.onprogress = function(e) {
                    progress.value = e.loaded;
                    progress.max = e.total;
                    console.log(progress);
                    if (progressFunction && typeof(progressFunction) === "function") {
                        self.$scope.$apply(function(){
                            progressFunction.call(this,progress);
                        });
                    }
            };
            xhr.send(this.form);
        }
        formData.prototype.put=function(url,callback,progressFunction){
            var xhr = new XMLHttpRequest();
            xhr.open('PUT',url); 
            progress={};
            var self=this;
            xhr.onload = function() {
                    if (callback && typeof(callback) === "function") {  
                        self.$scope.$apply(function(){
                            console.log(xhr.response);
                            callback.call(this,JSON.parse(xhr.response));
                        });
                    }
            };
            xhr.upload.onprogress = function(e) {
                    progress.value = e.loaded;
                    progress.max = e.total;
                    console.log(progress);
                    if (progressFunction && typeof(progressFunction) === "function") {
                        self.$scope.$apply(function(){
                            progressFunction.call(this,progress);
                        });
                    }
            };
            xhr.send(this.form);
        }
        return  formData;
    }]);
});