module.exports = function(app) {
  app.directive('modal', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/game/temp_modal.html',
      scope: {
        modalData: '='
      }
    };
  });
};
