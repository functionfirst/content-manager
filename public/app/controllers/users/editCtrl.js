(function(){
	angular.module('userEditCtrl', ['userService', 'ngFileUpload'])
		.controller('UserEditController', editUser);

	/////

	function editUser($routeParams, $rootScope, $scope, $timeout, User, Upload, Notification) {
		$scope.upload 		= upload;
		$scope.updateUser 	= updateUser;
		$scope.toggleBlock 	= toggleBlock;
		$scope.removeAvatar = removeAvatar;

		init();


		/////


	    function upload(files) {
	    	$scope.progress = 0;

	        if (files && files.length) {
	            for (var i = 0; i < files.length; i++) {
	                var file = files[i];

	                Upload.upload({
	                    url: '/api/users/' + $scope.user._id + '/upload/',
	                    data : $scope.user,
	                    method : 'POST',
	                    file: file
	                }).progress(uploadProgress)
	                .success(uploadSuccess);
	            }
	        }
	    }


		function toggleBlock(block) {
			$rootScope.processing = true;

			User.update($routeParams.user_id, { blocked: block })
				.success(function(data) {
					$rootScope.processing = false;

			        if($scope.user.blocked) {
			        	Notification.success('User has been blocked');
			        } else {
			        	Notification.success('User has been Unblocked');
			        }

		        	$scope.user.blocked = block;
				});
		}

		function removeAvatar() {
			User.update($routeParams.user_id, { image: null })
				.success(function(data) {
					$rootScope.processing = false;

			        Notification.success('Image has been removed');

		        	$scope.user.image = '';
				});
		}


		function updateUser() {
			$rootScope.processing = true;

			// Remove user image
			if($scope.user.removeImage) {
				$scope.user.image = '';
			}

			// Call the userService function to update
			User.update($routeParams.user_id, $scope.user)
				.success(function(data) {
					$rootScope.processing = false;

					// Confirmation message
	        		Notification.success(data.message);
				});
		}


	    function uploadProgress(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress = progressPercentage;
            $rootScope.processing = true;
	    }


	    function uploadSuccess(data, status, headers, config) {
            $timeout(function() {
            	$rootScope.processing = false;

            	if(data.error) {
            		Notification.error(data.error);
            		return;
            	}

            	$scope.user.image = data.filename;

            	Notification.success(data.message);
            });
	    }


		function init() {
			User.get($routeParams.user_id)
				.success(function(data) {
					$scope.user = data;
				});	
		}
	}
})();