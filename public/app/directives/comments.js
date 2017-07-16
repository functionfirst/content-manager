(function(){
    angular.module('comments', ['commentService'])
        .directive('comments', comments);

    comments.$inject = ['Comment', 'Notification'];

    function comments(Comment, Notification) {
        var directive = {
            restrict : 'E',
            scope: {
                user: '=',
                object: '='
            },
            templateUrl : '/app/views/directives/comments.html',
            link: linkFunc
        };

        return directive;


        function linkFunc(scope, elem, attrs) {
            scope.addComment = addComment;


            /////


            scope.$watch('object', function(newVal) {
                if(newVal._id) {
                    getComments(newVal._id);
                }
            }, true);


            function getComments(id) {
                var filter = {
                    object : attrs.object,
                    id : id
                };

                Comment.view(filter)
                    .success(function(data) {
                        if(data) {
                            scope.comments = data.comments;
                        }
                    });
            }


            function addComment(e) {
                if(e.comment) {
                    scope.processing = true;

    				var comment = {
                        object  : attrs.object,
                        id      : scope.object._id,
    					user    : scope.user.userid,
    					content : e.comment
    				};

      				Comment.create(comment)
      					.success(function(data) {
      						Notification.success(data.message);
                            scope.processing = false;
                            scope.comments = data.comments;
                            e.comment = '';
      				});
      			}
      		}
        }
    }
})();