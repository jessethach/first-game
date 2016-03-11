module.exports = function(app) {
  app.controller('authController', ['$scope', 'userAuth', function($scope, userAuth) {
    $scope.username = null;
    $scope.username.score = null;

    $scope.updateUsername = function() {
      userAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
        $scope.username.score = res.data.score || 0;
      });
    };

    $scope.updateScore = function(user) {
      userAuth.putUsername(function(err, res) {
        if(err) {
          return console.log(err)
        }
        console.log(res);;
      });
    };

    $scope.logout = function() {
      userAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
