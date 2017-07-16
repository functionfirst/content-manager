angular.module('commentService', [])

.factory('Comment', function($http) {
	var commentFactory = {};

	commentFactory.view = function(filter) {
		return $http.get('/api/comments', {
			params: filter
		});
	};

	commentFactory.create = function(commentData) {
		return $http.post('/api/comments', commentData);
	};

	// update page
	commentFactory.update = function(id, commentData) {
		return $http.put('/api/comments/' + id, commentData);
	};

	// delete page
	commentFactory.delete = function(id) {
		return $http.delete('/api/comments/' + id);
	};

	return commentFactory;
});