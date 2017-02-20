angular.module('stream1App', ['ngRoute', 'stream1Controllers', 'myService', 'formDirectives']);
	


	angular.module('stream1App').config(function($locationProvider, $routeProvider) {
	$routeProvider
			.when('/form', {
			templateUrl : 'templates/registerForm.html',
			controller  : 'RegisterController'
		})

		.when('/home', {
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		.when('/about', {
			'templateUrl': 'templates/about.html',
			'controller': 'AboutController'
		})
		.when('/activities', {
			templateUrl: 'templates/activities.html',
			controller: 'activitiesController'
		})
		.when('/prices', {
			templateUrl: 'templates/prices.html',
			controller: 'pricesController'
		})
		.when('/availability', {
			templateUrl: 'templates/availability.html',
			controller: 'availabilityController'
		})

		.when('/weather', {
			templateUrl: 'templates/weather.html',
			controller: 'weatherController'
		})
		
		.otherwise({redirectTo: '/home'});
	});