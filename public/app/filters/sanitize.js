(function(){
	angular.module('sanitize', [])
		.filter('sanitize', sanitize);

	sanitize.$inject = ['$sce'];

	function sanitize($sce) {
		return function(htmlCode){
			console.log(htmlCode);
            return $sce.trustAsHtml(htmlCode);
        };
	}
})();