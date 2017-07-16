(function(){
	angular
		.module('pageViewCtrl', ['pageService'])
		.controller('PageViewController', pageView);

	pageView.$inject = ['$rootScope', '$routeParams', '$scope', '$sce', 'Page'];


	/////


	function pageView($rootScope, $routeParams, $scope, $sce, Page) {
		init();

		// bind events
		$scope.createPage 	= createPage;
		$scope.selectParent = selectParent;
		$scope.clearParent 	= clearParent;
		$scope.savePage 	= savePage;
		$scope.setAdminOnly = toggleAdminOnlyView;
		$scope.selectPage 	= selectParentPage;

		$scope.mediumBindOptions = {
			toolbar : {
				'buttons': ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'anchor', 'quote','orderedlist','unorderedlist', 'indent', 'outdent',
				'justifyLeft','justifyCenter','justifyRight','justifyFull']
			},
			images : true,
			anchorPreview: false,
			keyboardCommands: {
		        commands: [
		            {
		                command: 'h1',
		                key: '1',
		                meta: false,
		                shift: true,
		                alt: true
		            }
		        ]
		    }
		};

		/////


		// function to create a page
		function createPage() {
			$rootScope.processing = true;

			$scope.page = {
				name: $routeParams.name
			};

			// create page
			Page.create($scope.page)
				.success(function(data) {
					$rootScope.processing = false;
				});
		}

		function populatePageList() {

			if(!$scope.page_list) {

				Page.all()
					.success(function(data) {
						$scope.page_list = data;
					});

			}

		}


		function selectParent() {
		
			populatePageList();
			$('#addToPageModal').modal();
		
		}


		function clearParent() {

			$scope.page.parent = null;
			savePage();

		}


		function toggleAdminOnlyView(state) {

			$scope.page.admin_only = state || false;
			savePage();

		}



		function savePage() {
			
			Page.update($routeParams.name, $scope.page)
				.success(function(data) {
					// $scope.page = data.page;
				});

		}


		function selectParentPage(parent) {
			$scope.page.parent = parent;

			savePage();

			$('#addToPageModal').modal('hide');

		}

		function init() {
			// Assume default home page is displayed if no route param is passed in
			var pagename = $routeParams.name || 'home';
			$rootScope.processing = true;

			Page.get(pagename)
				.success(function(data) {

					$rootScope.processing = false;
					$scope.page = data;
					$scope.trustedHtml = $sce.trustAsHtml(data.content);
					$rootScope.setPageTitle(data.name);

				});

		}
	}
})();