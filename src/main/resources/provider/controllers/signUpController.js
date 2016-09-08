/**
 * Created by Mani on 30-04-2016.
 *
 * return Controller to control consumer signUp
 * @param $scope gives scope to variables
 * @param NVService service for server url handling
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ProviderSignUpCtrl', ['$scope', '$rootScope','UrlService', 'Validator', 'UrlConstants', 'Constants','LStore','Auth',
        function ($scope, $rootScope, urlService, validator, urlConstants, constants,lStore,Auth) {
            var signupForm = this;
            $rootScope.loading = false;//spinner
            signupForm.options = {};
            signupForm.signInfo = {};
            $scope.stage="signupStart";
            signupForm.otpInfo={};
            var serviceSectors;
            urlService.get(urlConstants.GETACCOUNTCONFIG).then(function (result) {
                serviceSectors = result.data.serviceSectors;
                signupForm.fields = [{
                    "className":"col-md-12","key":"firstName","type": "input","templateOptions":{"type":"text","label":"First Name","required": true}},
                    {"className":"col-md-12","key":"lastName","type":"input","templateOptions":{"type":"text","label":"Last Name","required":true}},
                    {"className":"col-md-12","key":"email","type":"input","templateOptions":{"type":"email","label":"Email","required":true}},
                    {"className":"col-md-12","key":"serviceSector","type":"select","templateOptions": {"label":"Service Sector","ngOptions":"option[to.valueProp] as option in to.options","options":serviceSectors,"valueProp":"name","labelProp":"name"}}];

                    signupForm.startSignup = function () {
                        var provider = {};
                        provider.userProfile = {};
                        provider.userProfile.firstName = signupForm.signupInfo.firstName;
                        provider.userProfile.lastName = signupForm.signupInfo.lastName;
                        provider.userProfile.email = signupForm.signupInfo.email;
                        provider.isAdmin=true;
                        provider.industryType=signupForm.signupInfo.serviceSector;
                        var isValid = validate(provider);
                        if (isValid == true) {
                            $rootScope.loading = true;//spinner
                            urlService.post(urlConstants.ACCOUNTURL, provider).then(function (response) {
                                $rootScope.loading = false;//spinner
                                $scope.stage="otpGenerated";
                                signupForm.otpfield=[{"key": "activationId","type": "input","templateOptions": {"type": "text","label":"OTP","required": true}}];        
                                signupForm.otpVerify = function () {
                                    $scope.success=false;
                                    $scope.danger=false;
                                    $rootScope.loading = true;//spinner
                                    urlService.post(urlConstants.PROVIDERSIGNUPURL + '/' + signupForm.otpInfo.activationId + '/verify').then(function (response) {
                                         $rootScope.loading = false;//spinner
                                        $scope.stage="setCredentials";
                                        signupForm.credentialfields=[{"key":"password","type":"input","templateOptions":{"label":"New Password","type":"password","required":true}},{"key":"confirmPassword","optionsTypes":["matchField"],"type":"input","templateOptions":{"type":"password","label":"Confirm Password","required":true},"data":{"fieldToMatch":"password"}}];
                                        signupForm.completeRegistration = function () {
                                            var loginInfo={};
                                            loginInfo.loginId=provider.userProfile.email;
                                            loginInfo.password=signupForm.credentialInfoC.password;
                                            $rootScope.loading = true;//spinner
                                            urlService.put(urlConstants.PROVIDERSIGNUPURL+"/"+signupForm.otpInfo.activationId +'/activate', signupForm.credentialInfoC).then(function (response) {
                                                urlService.post(urlConstants.PROVIDERLOGINURL, loginInfo).then(function (response) {
                                                     $rootScope.loading = false;//spinner
                                                    lStore.store('ynw-provider', JSON.stringify(response.data));
                                                    lStore.store('ynw-p-credentials', JSON.stringify(loginInfo));
                                                    Auth.setUser(response.data);
                                                },function (response) {
                                                    $location.path("/login");
                                                });    

                                            }, function (response) {
                                                $scope.success = false;
                                                $scope.danger = true;
                                                $scope.message = response.data;
                                            })
                                        }
                                    }, function (response) {
                                        $scope.success = false;
                                        $scope.danger = true;
                                        $scope.message = response.data;
                                    });
                                }
                                $scope.otpGenerated = true;
                                $scope.success=true;
                                $scope.danger = false;
                                $scope.message = constants.OTP_NOTIFY_MSG;
                            }, function (response) {
                                $scope.success=false;
                                $scope.danger=true;
                                $scope.message = response.data;
                            });
                        } else {
                            $scope.danger = true;
                            $scope.success = false;
                            $scope.message = isValid;
                        }
                        function validate(signupInfo) {
                            if (validator.isNull(signupInfo.userProfile.email)) {
                                return constants.EMAILREQUIRED;
                            }
                            return true;
                        }
                    }
            })
        }]);
});