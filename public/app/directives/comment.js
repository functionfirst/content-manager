(function(){
    angular.module('comment', ['commentService'])
        .directive('comment', comment);

    comment.$inject = ['Comment', 'Notification'];

    function comment(Comment, Notification) {
        var directive = {
            restrict : 'E',
            templateUrl : '/app/views/directives/comment.html',
            link : linkFunc
        };

        return directive;


        /////


        function linkFunc(scope, elem, attrs) {
            scope.wasEdited     = wasEdited;
            scope.timeSince     = timeSince;
            scope.updateComment = updateComment;
            scope.deleteComment = deleteComment;


            /////


            function wasEdited(modified_at, created_at) {
                return moment(modified_at).isAfter(created_at);
            }


            function timeSince(date) {
                return moment(date).fromNow();
            }


            function updateComment(comment) {
                scope.editing = true;

                Comment.update(comment._id, comment)
                    .success(function(data) {
                        Notification.success(data.message);

                        comment.edit = false;
                        comment = data.comment;
                        scope.editing = false;
                });
            }


            function deleteComment(id) {
                Comment.delete(id)
                    .success(function(data) {
                        if(data.error) Notification.error(data.error);

                        if(data.message) {
                            Notification.success(data.message);
                            scope.comments.splice(scope.$index, 1);
                        }
                });
            }
        }
    }
})();