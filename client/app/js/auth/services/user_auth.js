var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  }
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  }
};

module.exports = function(app) {
  app.factory('userAuth', ['$http', '$window', function($http, $window) {
    var token;
    var user;
    var auth = {
      createUser: function(user, callback) {
        callback = callback || function() {};
        $http.post('http://localhost:3000/api/signup', user)
        .then(function(res) {
          token = $window.localStorage.token = res.data.token;
          callback(null, res);
        }, function(res) {
          callback(res)
        });
      },

      signIn: function(user, callback) {
        callback = callback || function() {};
        $http({
          method: 'GET',
          url: 'http://localhost:3000/api/signin',
          headers: {
            'Authorization': 'Basic ' + btoa((user.email + ':' + user.password))
          }
        })
        .then(function(res) {
          token = $window.localStorage.token = res.data.token;
          callback(null, res);
        }, function(res) {
          callback(res);
        });
      },

      getToken: function() {
        token = token || $window.localStorage.token;
        return token;
      },

      signOut: function(callback) {
        $window.localStorage.token = null;
        token = null;
        user = null;
        if(callback) callback();
      },

      getUsername: function(callback) {
        callback = callback || function() {};
        $http({
          method: 'GET',
          url: 'http://localhost:3000/api/currentuser',
          headers: {
            token: auth.getToken()
          }
        })
        .then(function(res) {
          user = res.data.username;
          callback(res);
        }, function(res) {
          callback(res);
        });
      },

      putUsername: function(user, callback) {
        callback = callback || function() {};
        $http({
          method: 'PUT',
          url: 'http://localhost:3000/api/currentuser',
          headers: {
            token: auth.getToken()
          },
          user: user
        })
        .then(function(res) {
          user = res.data.username;
          callback(null, res);
        }, function(res) {
          callback(res);
        });
      },

      username: function() {
        if(!user) auth.getUsername();
        return user;
      }
    };
    return auth;
  }]);
};
