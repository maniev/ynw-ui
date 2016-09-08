/**
 * Created by Mani on 27-04-2016.
 */
define(['./providerModule', 'angular-breadcumb', './main', './controllers/loginController', './controllers/activationController',
        './controllers/signUpController', './controllers/forgotPWDController', './controllers/logoutController',
        './controllers/homeController', './controllers/appointmentController',
        './controllers/changePWDController', './controllers/profileController', './controllers/settingsController',
        './controllers/businessSettingsController', './controllers/systemSettingsController',
        './controllers/labelsController', './controllers/labelViewController', './controllers/businessProfileController','./controllers/businessProfileViewController'
        , './controllers/holidaysController','./controllers/holidayViewController', './controllers/featuresSettingsController','./controllers/svmController',
    './controllers/servicesController','./controllers/serviceViewController','./controllers/sgController','./controllers/sgViewController','./controllers/slController','./controllers/slViewController','./controllers/sdsController',
    './controllers/vacationsController','./controllers/vacationViewController','./controllers/spsController','./controllers/discountController','./controllers/discountViewController','./controllers/customerSettingsController',
    './controllers/consumersController','./controllers/consumerLabelsController','./controllers/aptViewController','./controllers/waitlistController','./controllers/waitlistAllController','./controllers/WaitlistMgrCtrl'],
    function (ynwModule) {
        console.log("in Provider Router");
        return ynwModule.config(['$stateProvider', '$urlRouterProvider','$tooltipProvider', function ($stateProvider, $urlRouterProvider,$tooltipProvider) {
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login', templateUrl: '../provider/templates/login.html',
                    controller: 'ProviderLoginCtrl as vm'
                })
                .state('register', {
                    url: '/register', templateUrl: '../provider/templates/signup.html',
                    controller: 'ProviderSignUpCtrl as vm'
                })
                
                .state('activate', {
                    url: '/activate/{activationId}',
                    templateUrl: '../provider/templates/activate-account.html',
                    controller: 'ProviderActivateCtrl as pa'
                })
                .state('forgot-password', {
                    url: '/forgot-password', templateUrl: '../provider/templates/forgot-password.html',
                    controller: "ProviderFPWDCtrl as fp"
                })
                .state('logout', {
                    url: '/logout', controller: 'ProviderLogoutCtrl'
                })
                
                .state('change-password', {
                    url: '/change-password', templateUrl: '../provider/templates/change-password.html',
                    controller: "ProviderCPWDCtrl as cp"
                })
                
                .state('profile', {
                    url: '/profile', templateUrl: '../provider/templates/profile.html',
                    controller: "ProviderProfileCtrl as cp"
                })
                .state('home', {
                    url: '/home', templateUrl: '../provider/templates/provider.html',
                    controller: "ProviderHomeCtrl", data: {displayName: false}
                })
                .state('home.appointments', {
                    url: '/appointments/{type}', templateUrl: '../provider/templates/waitlist.html',
                    controller: 'ProviderWaitListCtrl as wl'
                })
               /* .state('home.appointments', {
                    url: '/appointments/{type}', templateUrl: '../provider/templates/appointments.html',
                    controller: 'ProviderApptCtrl'
                })*/
                .state('home.waitlist', {
                    url: '/waitlist', templateUrl: '../provider/templates/waitlist.html',
                    controller: 'ProviderWaitListCtrl as wl'
                })
                .state('home.waitlistall', {
                    url: '/waitlist/all', templateUrl: '../provider/templates/waitlist-all.html',
                    controller: 'ProviderWaitListAllCtrl as wl'
                })
                .state('home.consumers',
                 {url: '/consumers/{type}',
                 views:{'main':{ templateUrl: '../provider/templates/consumers.html',
                 controller:"ConsumersCtrl"}
                }
            })
                .state('home.settings', {
                    url: '/settings',
                    views: {
                        'main': {templateUrl: '../provider/templates/settings.html'},
                        'detail@home.settings': {
                            templateUrl: '../provider/templates/settingslist.html', controller: "SettingsHomeCtrl"
                        }
                    },
                    data: {displayName: 'Settings'}
                })
                .state('home.settings.business', {
                    url: '/business',
                    views: {
                        'detail@home.settings': {
                            templateUrl: '../provider/templates/business-settings.html',
                            controller: "BusinessSettingsCtrl"
                        }
                    },
                    data: {displayName: 'Business'}
                })
                .state('home.settings.business.profile', {
                    url: '/bprofile',
                    views: {
                        'detail@home.settings': {
                            templateUrl: '../provider/templates/business-profile.html',
                            //templateUrl: '../provider/templates/business-profile-view.html',
                            controller: 'BusinessProfileViewCtrl as bp'
                            
                            
                        }
                    },
                    data: {displayName: 'Profile'}
                })

                .state('home.settings.system', {
                    url: '/system',
                    views: {
                        'detail@home.settings': {templateUrl: '../provider/templates/systemSettings.html'},
                        controller: "SystemSettingsCtrl"
                    },
                    data: {displayName: 'System'}
                })
                .state('home.settings.business.customers', {
                    url: '/customers',
                    views: {
                        'detail@home.settings': {
                            templateUrl: '../provider/templates/customer-settings.html',
                            controller: 'CustomerSettingsCtrl'
                        }
                    },
                    data: {displayName: 'Customers'}
                })
                .state('home.settings.business.customers.labels', {
                    url: '/labels',
                    views: {
                        'detail@home.settings': {
                            templateUrl: '../provider/templates/labels-list.html',
                            controller: 'LabelsCtrl'
                        }
                    },
                    data: {displayName: 'Labels'}
                })
                .state('home.settings.business.customers.labels.view', {
                    url: '/{id}',
                     views: {'detail@home.settings':{templateUrl: '../provider/templates/label-view.html',
                    controller: 'LabelViewCtrl as lm'}},
                    data: {displayName: 'Label View'}
                })
                .state('home.settings.business.holidays', {
                    url: '/holidays',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/holidays-list.html',
                        controller: 'HolidaysCtrl'}},
                    data: {displayName: 'Holidays'}
                })
                .state('home.settings.business.holidays.view', {
                    url: '/{id}',
                    templateUrl: '../provider/templates/holiday-view.html',
                    controller: 'HolidayViewCtrl as lm',
                    data: {displayName: 'Holiday View'}
                })
                .state('home.settings.business.features', {
                    url: '/features',
                    views: {
                        'detail@home.settings': {
                            templateUrl: '../provider/templates/features-settings.html',
                            controller: "FeaturesSettingsCtrl"
                        }
                    },
                    data: {displayName: 'Features'}
                })
                .state('home.settings.business.features.svm', {
                    url: '/svm',
                    views: {
                        'detail@home.settings': {
                            templateUrl: 'templates/svm-settings.html',
                            controller: "ServiceMgrCtrl"
                        }
                    },
                    data: {displayName: 'Service Manager'}
                })
                .state('home.settings.business.features.wm', {
                    url: '/wm',
                    views: {
                        'detail@home.settings': {
                            templateUrl: 'templates/wm-settings.html',
                            controller: "WaitlistMgrCtrl as wm"
                        }
                    },
                    data: {displayName: 'Waitlist Manager'}
                })
                .state('home.settings.business.features.wm.view', {
                    url: '/view',
                    views: {
                        'detail@home.settings': {
                            templateUrl: 'templates/customerView.html',
                            controller: "WaitlistMgrCtrl as wm"
                        }
                    },
                    data: {displayName: 'Customer'}
                })
               .state('home.settings.business.features.svm.service', {
                    url: '/service',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/services-list.html',controller: "ServicesCtrl"}},
                    data: {displayName: 'Services'}
                })
                .state('home.settings.business.features.svm.service.view', {
                    url: '/{id}',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/service-view.html', controller: 'ServiceViewCtrl as svc'}},
                    data: {displayName: 'Service'}
                })
                .state('home.settings.business.features.svm.servicegroup', {
                    url: '/service_group',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/sgs-list.html',controller: "SGCtrl"}},
                    data: {displayName: 'Service Groups'}
                })
                .state('home.settings.business.features.svm.servicegroup.view', {
                    url: '/{id}',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/sg-view.html',controller: "SGViewCtrl as sg"}},
                    data: {displayName: 'Service Group View'}
                })
                .state('home.settings.business.features.svm.servicelocation', {
                    url: '/service_location',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/sl-list.html',controller: "SLCtrl"}},
                    data: {displayName: 'Service Location'}
                })
                 .state('home.settings.business.features.svm.servicelocation.view', {
                    url: '/{id}',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/sl-view.html',controller: "SLViewCtrl as sl"}},
                    data: {displayName: 'Service Location View'}
                }) 
                .state('home.settings.business.features.svm.appointments', {
                    url: '/appointments',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/apt-view.html',controller: "AptViewCtrl as av"}},
                    data: {displayName: 'Appointment Settings'}
                })
                /*.state('home.settings.business.features.apm.discount', {
                    url: '/discount',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/discount-list.html',controller: "DiscountCtrl"}},
                    data: {displayName: 'Discount'}
                })
                .state('home.settings.business.features.apm.discount.view', {
                    url: '/{id}',
                     views: {'detail@home.settings':{templateUrl: '../provider/templates/discount-view.html',controller: 'DiscountViewCtrl as dc'}},
                    data: {displayName: 'Discount'}
                })*/
                .state('home.settings.business.sps', {
                    url: '/SPs',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/sps-list.html',controller: "SPsCtrl"}},
                    data: {displayName: 'Service Providers'}
                })
                .state('home.settings.business.sds', {
                    url: '/SDs',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/sds-list.html',controller: "SDsCtrl"}},
                    data: {displayName: 'Service Discount'}
                })
               .state('home.settings.business.unavailability', {
                    url: '/unavailability',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/vacations.html'},controller: "VacationsCtrl"},
                    data: {displayName: 'Unavailability'}
                })
                .state('home.settings.business.unavailability.view', {
                    url: '/{id}',
                    views: {'detail@home.settings': {templateUrl: '../provider/templates/vacation-view.html',controller: "VacationViewCtrl as lm"}},
                    data: {displayName: 'Unavailability'}
                })
                

                $tooltipProvider.setTriggers({'customEvent': 'customEvent'});
        }])
    });