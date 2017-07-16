(function(){
	angular
		.module('pageSearchCtrl', ['pageService'])
		.controller('PageSearchController', search);

	/////

	// Search page controller
	function search($rootScope, $scope, Page, $routeParams) {

		init();

		////

		// grab all the pages at page load
		function init() {
			$rootScope.processing = true;
			$rootScope.setPageTitle('Search results');
			$rootScope.globalSearch = $routeParams.name;

			Page.all($routeParams.name)
				.success(function(data) {
					$rootScope.processing = false;
					$scope.pages = data;
				});
		}
	}

})();