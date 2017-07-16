(function(){
	angular.module('blogCtrl', ['blogService'])
		.controller('BlogController', viewAllBlogs);

	// View all Blogs
	function viewAllBlogs($rootScope, $scope, Blog, Notification) {
		$rootScope.processing = true;

		$rootScope.setPageTitle('Blogs');
		$scope.deleteBlog = deleteBlog;

		init();

		/////


		// grab all the blogs at page load
		function init() {
			Blog.all()
				.success(function(data) {
					$rootScope.processing = false;
					$scope.blogs = data;
				});
		}

		// delete a blog
		function deleteBlog(id) {
			var confirmDelete = confirm("Are you sure you wish to delete this blog?");

			if(confirmDelete) {
				$rootScope.processing = true;

				// accept the blog id as a param
				Blog.remove(id)
					.success(function(data) {
						// Confirm blog was deleted
						Notification.success(data.message);

						// get all blogs to redraw the table
						Blog.all()
							.success(function(data) {
								$rootScope.processing = false;
								$scope.blogs = data;
							});
					});
			}
		}
	}
})();