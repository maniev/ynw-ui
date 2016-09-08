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
                url: '/search/{searchText}', template: '<div class="search-results col-sm-12 col-md-12"><div class="col-md-12 col-xs-12 search-result"><div class="col-sm-2 col-md-2 col-xs-4 search-image"><img ng-if="src.bp.logo.url" ng-src="{{src.bp.logo.url}}" style="height:100%;width:100%" alt=""></div><div class="col-sm-6 col-md-6 col-xs-8 search-bus-info"><div class="bus-name">{{src.bp.businessName}} </div><div class="bus-desc">{{src.bp.businessDesc}}</div></div><div class="col-sm-4 col-md-4 col-xs-12 search-contact"><div class="bus-addr" ng-if="src.bp.address"><span class="fa fa-home"> {{src.bp.address}}</span></div><div class="bus-phone"><span class="fa fa-mobile"> {{src.bp.primaryPhoneNo}}</span><span style="padding-left:10px" class="fa fa-phone"> {{src.bp.secondaryPhoneNo}}</span></div><div class="bus-place"><span class="fa fa-location-arrow"> {{src.bp.place}}</span></div><div class="btn no-padding"><button class="btn btn-standard book-btn">Book Now</button></div></div></div></div>',
                controller:'SrchResultCtrl as src'
            })
            .state('login', {
                url: '/login', template: '<div class="content"><div class="login-box"><div class="login-box-body"><p class="login-box-msg">Sign in to start your session</p><div ng-messages="userForm.$error"><p ng-show="loginError" class="error">{{loginError}}</p></div><formly-form model="vm.login" fields="vm.fields" form="vm.forms.login" ng-enter="vm.submit(vm.login)"><button type="submit" ng-disabled="vm.forms.login.$invalid" class="btn btn-primary btn-block btn-flat" ng-click="vm.submit(vm.login)" data-dismiss="modal">Sign in</button></formly-form><a class="navigation-link" href="#/forgot-password">I forgot my password</a><br/><a class="navigation-link" href="#/register" class="text-center">Register a new membership</a></div></div></div>',
                controller: 'ConsumerLoginCtrl as vm'
            })
            .state('logout', {
                url: '/logout', controller: 'ConsumerLogoutCtrl'
            })
            .state('register', {
                url: '/register', template: '<div class="content"> <div class="login-box"> <div class="login-box-body"> <p class="login-box-msg">Register a new membership</p> <div class="alert alert-success" ng-if="success"> <strong>Signup Success!</strong> {{message}} </div> <div class="alert alert-danger" ng-if="danger"> <strong>{{message}}</strong> </div> <formly-form model="vm.signInfo" fields="vm.fields" form="consumer.signup.form"> <button class="btn btn-primary btn-block btn-flat" ng-disabled="consumer.signup.form.$invalid" ng-click="vm.submit(signup.signInfo)">Sign Up </button> </formly-form> <a class="navigation-link" href="#/login" class="text-center">I already have an account</a></div></div></div>',
                controller: 'ConsumerSignUpCtrl as vm'
            })
            .state('activate', {
                url: '/activate/{activationId}',
                template: '<section class="content"><div class="login-box"><div class="login-box-body"><p class="login-box-msg" ng-hide="danger">Set your password</p><div class="alert alert-success" ng-if="success"><strong>{{message}}</strong></div><div class="alert alert-danger" ng-if="danger"><strong>{{message}}</strong></div><formly-form model="ca.credentialInfoC" fields="ca.fields" form="consumer.credentials.form"><button class="btn btn-primary btn-block btn-flat" ng-show="ca.fields.length>0" ng-disabled="consumer.credentials.form.$invalid" ng-click="ca.submit()">Save</button></formly-form><a class="navigation-link" href="#/login" class="text-center">Take me to login</a></div></div></section>',
                controller: 'ConsumerActivateCtrl as ca'
            })
            .state('forgot-password', {
                url: '/forgot-password',
                template: '<div class="content"> <div class="login-box"> <div class="login-box-body"> <p class="login-box-msg">Forgot your password?</p> <div class="alert alert-success" ng-if="success"> {{message}} </div> <formly-form model="fp.forgotpassword" fields="fp.fields" form="fp.forms.fpform"> <button type="submit" ng-disabled="fp.forms.fpform.$invalid" class="btn btn-primary btn-block btn-flat" ng-click="fp.submit(fp.forgotpassword.email)">Submit </button> </formly-form> </div> </div></div>',
                controller: "ConsumerFPWDCtrl as fp"
            })
            .state('reset-password',{
                url: '/reset/{resetKey}', 
                template: '<div class="content"> <div class="login-box" style="background-color:#ccc;"> <div class="login-logo"> <a ui-sref="consumerlogin"><b>YouNeverWait</b></a> </div> <div class="login-box-body" style="border: 1px solid #ccc;"> <p class="login-box-msg">Reset your password</p> <div ng-messages="rp.forms.resetform.$error"> <p ng-show="message" class="error" style="color:red">{{message}}</p> </div> <formly-form model="rp.resetpassword" fields="rp.fields" form="rp.forms.resetform"><button type="submit" ng-show="rp.fields.length>0" ng-disabled="rp.forms.resetform.$invalid" class="btn btn-standard" ng-click="rp.submit()">Reset Password</button></formly-form> </div></div></div>',
                controller:'ConsumerRPWCtrl as rp'
            })
            .state('change-password', {
                url: '/change-password',
                template: '<div class="content"><div class="login-box" style="background-color:#ccc;"><div class="login-box-body" style="border: 1px solid #ccc;"><p class="login-box-msg">Change your password</p><loading></loading><div class="alert alert-success" ng-if="success"><strong> {{message}}</strong></div><div class="alert alert-danger" ng-if="danger"><strong>{{message}}</strong></div><formly-form model="cp.pwdInfo" fields="cp.fields" form="cp.form" novalidate><button type="submit" ng-disabled="cp.form.$invalid" class="btn btn-standard shadow-button" ng-click="cp.submit(cp.pwdInfo)">Save</button><a href="#/appointments/today"><button type="submit" class="btn btn-standard">Close</button></a></formly-form></div></div></div>',
                controller: "ConsumerCPWDCtrl as cp"
            })
            .state('profile', {
                url: '/profile',
                template: '<div class="content"><div class="login-box"><div class="login-box-body"><p class="login-box-msg">Profile Information</p><div class="alert alert-success" ng-if="success"><strong> {{message}}</strong></div><div class="alert alert-danger" ng-if="danger"><strong>{{message}}</strong></div><formly-form model="cp.profileInfo" fields="cp.fields" form="consumer.cp.form"><button type="submit" class="btn btn-standard" ng-disabled="consumer.cp.form.$invalid" ng-click="cp.submit(cp.profileInfo)">Update</button><a href="#/appointments/today"><button type="submit" class="btn btn-standard">Close</button></a></formly-form></div></div></div>',
                controller: "ConsumerProfileCtrl as cp"
            })
            .state('home', {
                url: '/home',
                template: ' <div class="consumer-dynamic-data"> <section> <div class="navbar scrollclass nomarginb menu-level-1"> <div class="col-md-9 col-sm-9 no-padding col-xs-12 mob-top-nav provider-top-nav"><ul id="cust_menu" class="nav navbar-nav navbar-left"><li ng-class="{active4: $location.path().indexOf(\'/home/appointments/\')!=-1}"><ahref="#/home/appointments/upcoming"><i class="fa fa-calendar"></i> My Appointments</a></li><li ng-class="{active4: $location.path().indexOf(\'/home/providers\')!=-1}"><a href="#/home/providers"><i class="fa fa-user-md"></i> My Providers</a></li></ul> </div> <div class="col-md-3 col-sm-3 col-xs-12 hidden-xs"> <div style="float:right; padding-top:0.5em;"> <a href="javascript:;" ng-click="newappointment()" class="btn btn-icon-only red tooltips" uib-tooltip="Create Appointment" tooltip-placement="top" tooltip-class="customClass"> <i class="fa fa-calendar"></i> </a> </div> </div> </div> </section> <div class="nopadding" ui-view></div></div>',
                controller: "ConsumerHomeCtrl"
            })
            .state('home.appointments', {
                url: '/appointments/{type}',
                template: '<div><div class="col-md-2 col-sm-12 col-lg-2 no-padding nv-top-sub nav navbar-nav"> <ul class="nav navbar-nav navbar-left bottom-up "><li ng-class="{active4: $location.path().indexOf(\'/home/appointments/upcoming\')!=-1}"><a href="#/home/appointments/upcoming"><i class="fa fa-calendar"></i>Upcoming</a></li><li ng-class="{active4: $location.path().indexOf(\'/home/appointments/past\')!=-1}"><ahref="#/home/appointments/past"><i class="fa fa-calendar"></i>Past</a></li></ul></div> <div class="content col-md-10 col-sm-12 col-lg-10 no-padding" class="row"><div class="col-sm-12 list-group single-profile-top box-content" ng-repeat="row in appointments"><div class="timings-section left-align" style="margin: auto"><div class="no-padding" ng-class="{active:type==\'upcoming\'}" ng-if="row.time"><p><span class="time"> {{row.time}}</span> <span class="date">- {{row.date}}</span></p><p ng-if="type==\'upcoming\'" class="countdown" countdown="" date="{{row.date_time}}"></p></div></div><div class="content-section left-align no-padding"><div class=""><div class="list-group-image" ><img src="../assets/img/noimage.png" style="height:100%;width:100%" alt="Cancel Appointment"></div><div class="left-align" style="padding-left:5px;"><p class="title"><span><a href="">{{row.name}}</a></span></p><p class="normal"><span class="fa fa-location-arrow" ng-if="row.address"> {{row.address}}</span><span class="fa fa-mobile "><a class="number" style="color:black"> {{row.mobile}}</a></span></div><span class="pull-right"> <a href="javascript:;" ng-click="assignLabel()" class="btn btn-icon-only default btn tooltips" data-placement="bottom" data-original-title="Remove Appointment"><i class="fa fa-remove"></i></a><a href="javascript:;" ng-click="assignLabel()" class="btn btn-icon-only default btn tooltips" data-placement="bottom" data-original-title="Edit Appointment"><i class="fa fa-edit"></i></a><a href="javascript:;" ng-click="assignLabel()" class="btn btn-icon-only default btn tooltips" data-placement="bottom" data-original-title="Take Appointment"><i class="fa fa-plus"></i></a></span> </div></div><div class="clearfix"></div></div> </div></div>',
                controller: 'ConsumerApptCtrl'
            })
            .state('home.providers', {
                url: '/providers',
                template: '<div class="content col-md-12 col-sm-12 col-lg-12 no-padding" class="row"><div class="col-sm-12 list-group single-profile-top box-content" ng-repeat="row in providers"><div class="content-section left-align no-padding"><div class=""><div class="list-group-image" ><img src="../assets/img/noimage.png" style="height:100%;width:100%" alt="Cancel Appointment"></div><div class="left-align" style="padding-left:5px;"><p class="title"><span><a href="">{{row.name}}</a></span></p><p><span class="normal"><span class="fa fa-location-arrow" ng-if="row.address"> {{row.address}}</span><span class="fa fa-mobile"> {{row.mobile}}</span></span></p><p class="normal"><span class="fa">Last visit : 2 days ago</span><span><img class="small-image" style="height:20px;width:20px" src="../assets/img/cal-new.png"/></span></p></div></div></div><div class="clearfix"></div></div></div>',
                controller: 'ConsumerPApptCtrl'
            })
    }])
});