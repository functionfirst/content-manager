// name angular app
angular.module('userApp', [
	'appRoutes',
	'ui-notification',
	'cfp.hotkeys',

	// Directives
	'editor',
	'comment',
	'comments',

	// Controllers
	'mainCtrl',
	'loginCtrl',

	'userCtrl',
	'userConfirmCtrl',
	'userRegisterCtrl',
	'userEditCtrl',
	'userCreateCtrl',

	// homepage
	'homeViewCtrl',


	// homepage
	'blogCtrl',
	'blogCreateCtrl',
	'blogEditCtrl',
	'blogViewCtrl',

	// pages
	'pageCtrl',
	'pageViewCtrl',
	'pageSearchCtrl',

	// Services
	'authService',
	'commentService',
	'pageService',
	'blogService',
	'userService',

	// filters
	'sanitize'	
	
])

// application config to integrate token into requests
.config(function($httpProvider, NotificationProvider) {
	// attach auth interceptor to http requests
	$httpProvider.interceptors.push('AuthInterceptor');

	// notifications
	NotificationProvider.setOptions({
	    delay: 4000,
	    startTop: 10,
	    startRight: 10,
	    verticalSpacing: 20,
	    horizontalSpacing: 20,
	    positionX: 'right',
	    positionY: 'top',
	    replaceMessage: true
	  });
});