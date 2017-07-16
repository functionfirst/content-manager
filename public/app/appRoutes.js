(function(){
	angular.module('appRoutes', ['ngRoute'])
		.config(config);

	/////

	function config($routeProvider, $locationProvider) {
		$routeProvider
			// homepage
			.when('/', {
				templateUrl : 'app/views/pages/home/index.html',
				controller : 'HomeViewController',
				controllerAs : 'page'
			})

			// search
			.when('/search', {
				templateUrl : 'app/views/pages/pages/search.html',
				controller : 'PageSearchController',
				controllerAs : 'page'
			})


			// login page
			.when('/login', {
				templateUrl : 'app/views/pages/login.html',
				controller : 'LoginController',
				controllerAs : 'login'
			})

			// form to register as a new user
			// same view as edit paage
			.when('/register', {
				templateUrl : '/app/views/pages/users/register.html',
				controller : 'UserRegisterController',
				controllerAs : 'user'
			})

			// Confirmation page after registering
			.when('/registered', {
				templateUrl : '/app/views/pages/users/registered.html',
				controller : 'UserConfirmController',
				controllerAs : 'user'
			})


			// view a blog
			.when('/blogs/:slug', {
				templateUrl : 'app/views/pages/blogs/view.html',
				controller : 'BlogViewController',
				controllerAs : 'blog'
			})


			// show all users
			.when('/admin', {
				templateUrl : 'app/views/pages/users/all.html',
				controller : 'UserController',
				controllerAs : 'user',
				access: {
					loginRequired: true
				}
			})

			// show all users
			.when('/admin/users', {
				templateUrl : 'app/views/pages/users/all.html',
				controller : 'UserController',
				controllerAs : 'user',
				access: {
					loginRequired: true
				}
			})

			// page to create a user
			.when('/admin/users/create', {
				templateUrl : 'app/views/pages/users/create.html',
				controller : 'UserCreateController',
				controllerAs : 'user',
				access: {
					loginRequired: true
				}
			})

			// page to edit user
			.when('/admin/users/:user_id', {
				templateUrl : 'app/views/pages/users/edit.html',
				controller : 'UserEditController',
				controllerAs : 'user',
				access: {
					loginRequired: true
				}
			})

			// show all Pages
			.when('/admin/pages', {
				templateUrl : 'app/views/pages/pages/all.html',
				controller : 'PageController',
				controllerAs : 'page',
				access: {
					loginRequired: true
				}
			})

			// // edit a page
			// .when('/:name/edit', {
			// 	templateUrl : 'app/views/pages/pages/edit.html',
			// 	controller : 'PageEditController',
			// 	controllerAs : 'page',
			// 	access: {
			// 		loginRequired: true
			// 	}
			// })

			// Blogs admin
			.when('/admin/blogs', {
				templateUrl : 'app/views/pages/blogs/index.html',
				controller : 'BlogController',
				controllerAs : 'blog',
				access: {
					loginRequired: true
				}
			})


			// create a Blog
			.when('/admin/blogs/add', {
				templateUrl : 'app/views/pages/blogs/add.html',
				controller : 'BlogCreateController',
				controllerAs : 'blog',
				access: {
					loginRequired: true
				}
			})


			// edit a Blog
			.when('/admin/blogs/:id', {
				templateUrl : 'app/views/pages/blogs/edit.html',
				controller : 'BlogEditController',
				controllerAs : 'blog',
				access: {
					loginRequired: true
				}
			})

			
			// view a page
			.when('/:name', {
				templateUrl : 'app/views/pages/pages/single.html',
				controller : 'PageViewController',
				controllerAs : 'page'
			});


			// get rid of the hash in url
			$locationProvider.html5Mode(true);
	}
})();