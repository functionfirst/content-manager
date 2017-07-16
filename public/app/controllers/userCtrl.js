(function(){
	angular.module('userCtrl', ['userService'])
		.controller('UserController', ['$scope','$rootScope','User', viewAllUsers]);


	/////


	function viewAllUsers($scope, $rootScope, User) {
		$rootScope.processing = true;
		$scope.deleteUser = deleteUser;

		init();


		/////


		// grab all the users at page load
		function init() {
			User.all().success(function(data) {
				$rootScope.processing = false;
				$scope.users = data;
			});
		}
		
		// delete a user
		function deleteUser(id) {
			$rootScope.processing = true;

			// accept the user id as a param
			User.delete(id).success(function(data) {
				// get all users to update the table
				// also setup api to return the list of users with the delete call
				User.all()
					.success(function(data) {
						$rootScope.processing = false;
						$scope.users = data;
					});
			});
		}
	}

})();