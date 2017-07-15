var app = angular.module('myApp', ['ui.router','myApp.loginModule','myApp.registerModule','myApp.shopModule','myApp.detailModule']);
app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');
	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: 'pages/login/login.html',
			controller: 'loginCtrl'
		})
		.state('register',{
			url: '/register',
			templateUrl: 'pages/login/register.html',
			controller: 'registerCtrl'
		})
		.state('shop',{
			url: '/shop',
			templateUrl: 'pages/shop/shop.html',
			controller: 'shopCtrl'
		})
		.state('detail',{
			url: '/detail/:param',
			templateUrl: 'pages/shop/detail.html',
			controller: 'detailCtrl'
		})

});

