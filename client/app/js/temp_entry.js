const angular = require('angular');
require('angular-route');
const gameApp = angular.module('gameApp', ['ngRoute']);

require('./services')(gameApp);

require('./game')(gameApp);
// require('./auth')(gameApp);

gameApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'GameController',
      templateUrl: '/views/menu_modal_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
