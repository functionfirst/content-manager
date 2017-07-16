(function(){
	angular.module('pageCtrl', ['pageService'])
		.controller('PageController', viewAllPages);

	// View all Pages
	function viewAllPages($rootScope, $scope, Page, Notification) {
		$rootScope.processing = true;

		$rootScope.setPageTitle('Pages');
		$scope.deletePage = deletePage;

		init();

		/////


		// grab all the pages at page load
		function init() {
			Page.all()
				.success(function(data) {
					$rootScope.processing = false;
					$scope.pages = data;
				});
		}

		// delete a page
		function deletePage(id) {
			var confirmDelete = confirm("Are you sure you wish to delete this page?");

			if(confirmDelete) {
				$rootScope.processing = true;

				// accept the page id as a param
				Page.remove(id)
					.success(function(data) {
						// Confirm page was deleted
						Notification.success(data.message);

						// get all pages to redraw the table
						Page.all()
							.success(function(data) {
								$rootScope.processing = false;
								$scope.pages = data;
							});
					});
			}
		}
	}
})();