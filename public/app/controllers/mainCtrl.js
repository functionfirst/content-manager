(function(){
	angular.module('mainCtrl', [])
		.controller('MainController', ['$rootScope', '$route', '$location', 'Auth', main]);

	// Main Controller
	function main($rootScope, $route, $location, Auth) {
		$rootScope.processing = false;

		var vm  = this;

		$rootScope.setPageTitle = function(title) {
			if(title) {
				page_title =  title + ' - Content Manager';
			}

			$rootScope.page_title = page_title;
		};

		// check to see if the user is logged in on every request
		$rootScope.$on('$routeChangeStart', function(event, next) {
			// get user information on route change
			Auth.getUser()
				.then(function(data) {
					vm.user = data.data;
				});
		});

		$rootScope.reloadRoute = function() {
			$route.reload();
		};

		// handle logging out
		vm.doLogout = function() {
			Auth.logout();

			// reset all user info
			vm.user = {};
			$location.path('/login');
		};
	}
})();