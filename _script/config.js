'use strict';

var config = {};

// SETTINGS
config.app = {
	name:'app',
    production:false
};

// ENVIRONMENTS
config.app.environments = {
    local:{
        host:'http://localhost:8888/',
        apiURL:'http://localhost:8888/api/public/index.php/',
        filesURL:'http://localhost:8888/api/public/'
    },
    remote:{
        host:'http://54.213.206.26/',
        apiURL:'http://54.213.206.26/projects/the-squid/api/public/index.php/',
        filesURL:'http://54.213.206.26/projects/the-squid/api/public/'
    }
};

// ROUTES
config.app.routes = [
	{
        name:'Dashboard',
        route:'/dashboard',
        menu:{
            display:true,
            title:'Dashboard',
            icon:'home'
        },
        default:true
    },
    {
        name:'Pages',
        route:'/pages',
        menu:{
            display:true,
            title:'Pages',
            icon:'file'
        }
    },
    {
        name:'Newsletter',
        route:'/newsletter',
        menu:{
            display:true,
            title:'Newsletter',
            icon:'newspaper-o'
        }
    },
    {
        name:'Help',
        route:'/help',
        menu:{
            display:true,
            title:'Help',
            icon:'support'
        }
    }
];

// MODULES
config.app.modules = ['AngularEnhanced', 'Directives', 'Rootscope', 'Services', 'Filters'];

// MODELS
config.app.models = ['Lsd'];

// JS FILES
config.app.js = ['prototype', 'functions'];

// LIBRAIRIES
config.app.lib = [
    {
        name:'jQuery',
        url:'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
        local_url:'',
        boot:true,
        exports:'jQuery',
        deps:[
            {
                name:'jQueryUI',
                boot:true,
                url:'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min',
                local_url:''
            },
            {
                name:'jQueryNiceScroll',
                boot:true,
                url:'https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.5.1/jquery.nicescroll.min',
                local_url:''
            },
            {
                name:'Bootstrap',
                boot:true,
                url:'https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
                local_url:''
            },
            {
                name:'jsplumb',
                boot:true,
                url:'lib/jsplumb',
                local_url:'lib/jsplumb'
            },
            {
                name:'offline',
                boot:false,
                url:'lib/offline.min',
                local_url:'lib/offline.min'
            }
        ]
    },
    {
        name:'angular',
        url:'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min',
        local_url:'',
        boot:true,
        exports:'angular',
        deps:[
            {
                name:'angular-route',
                boot:true,
                url:'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular-route.min',
                local_url:'',
                module:'ngRoute'
            },
            {
                name:'angular-resource',
                boot:true,
                url:'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular-resource.min',
                local_url:''
            },
            {
                name:'angular-animate',
                boot:true,
                url:'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular-animate.min',
                local_url:''
            }
        ]
    }
];

// ROUTES BASE
config.app.root = '';
config.app.routes_base = {
    assets: config.app.root + '_assets/',
    css: config.app.root + '_css/',
    html: config.app.root + '_html/',
    scripts: config.app.root + '_script/',
    ctrl: config.app.root + 'ctrl/',
    mod: config.app.root + 'mod/',
    js: config.app.root + 'js/',
    mdl: config.app.root + 'mdl/'
};