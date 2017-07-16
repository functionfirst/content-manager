(function(){
	angular
		.module('blogViewCtrl', ['blogService'])
		.controller('BlogViewController', blogView);

	blogView.$inject = ['$rootScope', '$routeParams', '$scope', '$sce', 'Blog'];


	/////


	function blogView($rootScope, $routeParams, $scope, $sce, Blog) {
		init();

		/////

		function init() {
			var filter = { slug : $routeParams.slug };
			$rootScope.processing = true;

			Blog.all(filter)
				.success(function(data) {

					$rootScope.processing = false;
					$scope.blog = data[0];
					$scope.trustedHtml = $sce.trustAsHtml(data[0].content);
					$rootScope.setPageTitle($scope.blog.title);

				});

		}
	}
})();