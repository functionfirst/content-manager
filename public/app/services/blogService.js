(function(){
	angular.module('blogService', [])
		.factory('Blog', function($http) {
			return {
				get: 	get,
				// edit: 	edit,
				all: 	all,
				create: create,
				update: update,
				remove: remove
			};

			/////

			// get single blog
			function get(id, slug) {
				return $http.get('/api/blogs/' + id);
			}

			// get all blogs
			function all(filter) {
				return $http.get('/api/blogs/', {
					params: filter
				});
			}

			// create a blog
			function create(blogData) {
				return $http.post('/api/blogs', blogData);
			}

			// update blog
			function update(id, blogData) {
				return $http.put('/api/blogs/' + id, blogData);
			}

			// delete blog
			function remove(id) {
				return $http.delete('/api/blogs/' + id);
			}
	});
})();