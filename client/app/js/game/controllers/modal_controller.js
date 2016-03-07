var angular = require('angular');

module.exports = function() {
  app.controller( "ModalController", ['$scope', 'gameModal', function($scope, modals) {

			$scope.message = (modals.params().message || "Whoa!");
			$scope.close = modals.resolve;
			$scope.jumpToConfirm = function() {
				modals.proceedTo(
					"confirm",
					{
						message: "I just came from Alert - doesn't that blow your mind?",
						confirmButton: "Eh, maybe a little",
						denyButton: "Oh please"
					}
				)
				.then(
					function handleResolve() {
						console.log( "Piped confirm resolved." );
					},
					function handleReject() {
						console.warn( "Piped confirm rejected." );
				  }
				);

			};

	}]);
};
