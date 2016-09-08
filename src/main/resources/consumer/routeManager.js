/**
 * Created by Mani on 27-04-2016.
 */
define(['./consumerModule', './main', './controllers/loginController','./controllers/signUpController',
	'./controllers/changePWDController','./controllers/profileController', './controllers/logoutController',
	'./controllers/dashboardController','./controllers/homeController','./controllers/providerController',
	'./controllers/providerViewController','./controllers/forgotPWDController','./controllers/wlViewController'], function (ynwModule) {
    console.log("in Consumer Router");
    return ynwModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
        	 .state('index', {
                url: '/login', templateUrl: '../consumer/templates/login.html',
                controller: 'ConsumerLoginCtrl as vm'
            })
            .state('register', {
                url: '/register', templateUrl: '../consumer/templates/signup.html',
                controller: 'ConsumerSignUpCtrl as vm'
            })
            .state('change-password', {
                url: '/change-password',
                templateUrl: '../consumer/templates/change-password.html',
                controller: "ConsumerCPWDCtrl as cp"
            })
            .state('profile', {
                url: '/profile',
                templateUrl: '../consumer/templates/profile.html',
                controller: "ConsumerProfileCtrl as cp"
            })
            .state('logout', {
                url: '/logout', controller: 'ConsumerLogoutCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: '../consumer/templates/consumer-home.html',
                controller: "ConsumerHomeCtrl"
            })
            .state('forgot-password', {
                url: '/forgot-password',
                templateUrl: '../consumer/templates/forgot-password.html',
                controller: "ConsumerFPWDCtrl as fp"
            })
            .state('home.dashboard', {
                url: '/dashboard',
                templateUrl: '../consumer/templates/dashboard.html',
                controller: "ConsumerDashboardCtrl"
            })
            .state('home.wlview', {
                url: '/waitlist/{id}',
                templateUrl: '../consumer/templates/wl-view.html',
                controller: "ConsumerWLViewCtrl"
            })
            .state('home.providers', {
                url: '/providers',
                templateUrl: '../consumer/templates/myproviders.html',
                controller: 'ConsumerProviderCtrl as ps'
            })
            .state('home.providerview', {
                url: '/providers/{searchText}',
                templateUrl: '../consumer/templates/provider-view.html',
                controller: 'ConsumerProviderViewCtrl as src'
            })
    }])
});