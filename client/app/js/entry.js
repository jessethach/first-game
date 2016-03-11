const angular = require('angular');
require('angular-route');

//Used to run game.js
require('angular-local-storage');
require('oclazyload');

const gameApp = angular.module('gameApp', ['ngRoute' , 'oc.lazyLoad', 'LocalStorageModule']);

require('./game')(gameApp);
require('./auth')(gameApp);


gameApp.config(['$ocLazyLoadProvider' , '$routeProvider', 'localStorageServiceProvider', function($ocLazyLoadProvider , routes , localStorageServiceProvider) {
  $ocLazyLoadProvider.config({
    loadedModules: ['gameApp'] , modules: [
      {
        name: 'displayGame',
        files: ['/game/js/game.min.js']
      }
    ]
  });
  routes
    .when('/', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/home', {
      controller: 'SigninController',
      templateUrl: '/views/home.html'
    })
    .when('/about', {
      templateUrl: '/views/about.html'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/boards', {
      controller: 'authController',
      templateUrl: '/views/boards.html'
    })
    .when('/game', {
      templateUrl: '/views/game_main.html',
      resolve: {
        loadModule: ['$ocLazyLoad' , function ($ocLazyLoad) {
          return $ocLazyLoad.load('displayGame');
        }]
      }
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });//end
}]);
