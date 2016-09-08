/**
 * Created by Mani on 27-04-2016.
 */
define(['./consumerModule', './main', './controllers/loginController','./controllers/resizeSearchController','./controllers/activationController',
    './controllers/signUpController', './controllers/forgotPWDController','./controllers/resetPWDController', './controllers/logoutController',
    './controllers/homeController', './controllers/appointmentController','./controllers/appointmentPController',
    './controllers/favoritePController','./controllers/changePWDController','./controllers/profileController','./controllers/searchResultController'], function (ynwModule) {
    console.log("in Consumer Router");
    return ynwModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        	.state('index', {
                url: '/',
                controller:'SrchCtrl as sc'
            })
            .state('search', {
                url: '/search/{searchText}', templateUrl: '../consumer/templates/search-results.html',
                controller:'SrchResultCtrl as src'
            })
            .state('login', {
                url: '/login', templateUrl: '../consumer/templates/login.html',
                controller: 'ConsumerLoginCtrl as vm'
            })
            .state('logout', {
                url: '/logout', controller: 'ConsumerLogoutCtrl'
            })
            .state('register', {
                url: '/register', templateUrl: '../consumer/templates/signup.html',
                controller: 'ConsumerSignUpCtrl as vm'
            })
            .state('activate', {
                url: '/activate/{activationId}',
                templateUrl: '../consumer/templates/activate-account.html',
                controller: 'ConsumerActivateCtrl as ca'
            })
            .state('forgot-password', {
                url: '/forgot-password',
                templateUrl: '../consumer/templates/forgot-password.html',
                controller: "ConsumerFPWDCtrl as fp"
            })
            .state('reset-password',{
                url: '/reset/{resetKey}', templateUrl: '../consumer/templates/resetpwd.html',
                controller:'ConsumerRPWCtrl as rp'
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
            .state('home', {
                url: '/home',
                templateUrl: '../consumer/templates/consumer.html',
                controller: "ConsumerHomeCtrl"
            })
            .state('home.appointments', {
                url: '/appointments/{type}',
                templateUrl: '../consumer/templates/appointments.html',
                controller: 'ConsumerApptCtrl'
            })
            .state('home.providers', {
                url: '/providers',
                templateUrl: '../consumer/templates/myproviders.html',
                controller: 'ConsumerPApptCtrl'
            })
    }])
});