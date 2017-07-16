(function(){
	angular
		.module('blogEditCtrl', ['blogService'])
		.controller('BlogEditController', updateBlog);

	updateBlog.$inject = ['$routeParams', '$rootScope', '$scope', 'Blog', 'Notification'];

	// Create Blogs
	function updateBlog($routeParams, $rootScope, $scope, Blog, Notification) {
		$rootScope.setPageTitle('Blog Updated');
		$scope.update 	= update;

		$scope.mediumBindOptions = {
			toolbar: {
				buttons: ['bold', 'italic', 'underline']
			}
		};

		init();


		/////


		function init() {
			Blog.get($routeParams.id)
				.success(function(data) {
					$scope.blog = data;
				});	
		}


		function update() {
			$rootScope.processing = true;

			Blog.update($scope.blog._id, $scope.blog)
				.success(function(data) {
					$rootScope.processing = false;

					// Confirmation message
					if(data.error) {
						Notification.error(data.error);
						return;	
					}

					// $scope.blog = {};
	        		Notification.success(data.message);
				});
		}

	}
})();