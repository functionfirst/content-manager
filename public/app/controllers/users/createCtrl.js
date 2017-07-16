(function(){
	angular.module('userCreateCtrl', ['userService'])
		.controller('UserCreateController', xcreateUser);

	/////

	function xcreateUser($rootScope, $scope, User, Notification) {
		$scope.create 	= create;


		/////


		function create() {
			$rootScope.processing = true;

			$scope.user.block = false;

			User.create($scope.user)
				.success(function(data) {
					$rootScope.processing = false;

					// Confirmation message
					if(data.error) {
						Notification.error(data.error);
						return;	
					}

					$scope.user = {};
	        		Notification.success(data.message);
				});
		}
	}
})();