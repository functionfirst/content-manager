(function(){
	angular.module('loginCtrl', [])
		.controller('LoginController', ['$scope', '$rootScope', '$location', 'Auth', 'Notification', login]);

	/////

	function login($scope, $rootScope, $location, Auth, Notification) {
		$scope.doLogin = doLogin;

		/////

		function doLogin() {
			$rootScope.processing = true;

			Auth.login($scope.loginData.username, $scope.loginData.password)
				.success(function(data) {
					$rootScope.processing = false;

					if(data.error) {
						Notification.error(data.error);
						return;
					}

					$location.path('/');
				});
		}

	}

})();