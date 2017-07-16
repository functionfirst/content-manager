(function(){
	angular.module('blogCreateCtrl', ['blogService'])
		.controller('BlogCreateController', createBlog);

	// Create Blogs
	function createBlog($rootScope, $scope, Blog, Notification) {
		$rootScope.setPageTitle('Add a Blog');
		$scope.create 	= create;


		/////


		function create() {
			$rootScope.processing = true;

			Blog.create($scope.blog)
				.success(function(data) {
					$rootScope.processing = false;

					// Confirmation message
					if(data.error) {
						Notification.error(data.error);
						return;	
					}

					$scope.blog = {};
	        		Notification.success(data.message);
				});
		}

	}
})();