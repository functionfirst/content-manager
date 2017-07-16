(function(){
	angular
		.module('homeViewCtrl', ['blogService'])
		.controller('HomeViewController', homeView);

	homeView.$inject = ['$rootScope', '$routeParams', '$scope', '$location', 'Blog'];


	/////


	function homeView($rootScope, $routeParams, $scope, $location, Blog) {
		init();

		function init() {
			$rootScope.processing = true;

			Blog.all()
				.success(function(data) {
					$rootScope.processing = false;
					$scope.blogs = data;
					$rootScope.setPageTitle('Welcome');
				});

		}
	}
})();