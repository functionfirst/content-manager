(function(){
	angular.module('editor', [])
	.directive('editor', editor);

	editor.$inject = ['Notification'];

	function editor(Notification) {
		var directive = {
			require: 'ngModel',
			restrict: 'E',
      		scope: { bindOptions: '=' },
			link: linkFunc
		};

		return directive;

		
		/////


		function linkFunc(scope, elem, attrs, ngModel) {
			var addons = {},
				editor = new MediumEditor(elem, scope.bindOptions);

			if(scope.bindOptions.images) {

			    $('editor').mediumInsert({
			        editor: editor,
			        addons: {
			        	images : {
			        		deleteScript: '/api/images',
			        		deleteMethod: 'DELETE',
			        		fileDeleteOptions: {},

			        		fileUploadOptions: {
			        			url: '/api/images',
			        			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
			        		},
			        		
			        		uploadCompleted: function($el, data) {
			        			Notification.success("Image was uploaded successfully");
			        		},

			        		uploadFailed: function(uploadErrors, data) {
			        			Notification.error("There was a problem uploading the image");
			        		}
			        	}
			        }
			    });
			}

        	ngModel.editor = editor;

			ngModel.$render = function() {
          		elem.html(ngModel.$viewValue || "");
          		var placeholder = ngModel.editor.getExtensionByName('placeholder');
          		if (placeholder) {
            		placeholder.updatePlaceholder(elem[0]);
          		}
        	};

        	ngModel.$isEmpty = function(value) {
          		if (/[<>]/.test(value)) {
            		return toInnerText(value).length === 0;
          		} else if (value) {
            		return value.length === 0;
          		} else {
            		return true;
          		}
        	};

        	ngModel.editor.subscribe('editableInput', function (event, editable) {
        		ngModel.$setViewValue(editable.innerHTML.trim());
        	});

        	scope.$watch('bindOptions', function(bindOptions) {
        		ngModel.editor.init(elem, bindOptions);
        	});

        	scope.$on('$destroy', function() {
        		ngModel.editor.destroy();
        	});
		}
	}
})();