(function(){
	angular.module('pageService', [])
		.factory('Page', function($http) {
			return {
				get: 	get,
				edit: 	edit,
				all: 	all,
				create: create,
				update: update,
				remove: remove
			};

			/////

			// get single page
			function get(name) {
				return $http.get('/api/pages/' + name);
			}

			// edit single page
			function edit(name) {
				return $http.get('/api/pages/' + name + '/edit/');
			}

			// get all pages
			function all(data) {
				if(data) return $http.get('/api/pages?name=' + data);
				return $http.get('/api/pages');
			}

			// create a page
			function create(pageData) {
				return $http.post('/api/pages', pageData);
			}

			// update page
			function update(id, pageData) {
				return $http.put('/api/pages/' + id, pageData);
			}

			// delete page
			function remove(id) {
				return $http.delete('/api/pages/' + id);
			}
	});
})();