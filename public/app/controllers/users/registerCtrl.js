(function(){
	angular.module('userRegisterCtrl', ['userService'])
		.controller('UserRegisterController', ['$rootScope', '$scope', '$location', 'User', 'Notification', registerUser]);


	/////


	function registerUser($rootScope, $scope, $location, User, Notification) {
		$scope.registerUser = registerUser;


		/////


		// function to create user
		function registerUser() {
			$rootScope.processing = true;

			// user create function from userService
			User.create($scope.user)
				.success(function(data) {
					$rootScope.processing = false;

					// Confirmation
	       			Notification.success(data.message);
					
					// check for success before clearing form
					if(data.success) {
						// Clear form data
						$scope.user = {};

						// Redirect to confirmation page.
						$location.path('/registered');
					}
				});
		}
	}

})();