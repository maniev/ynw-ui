/**
 * Created by Mani on 30-04-2016.
 *
 * return Controller to control consumer signUp
 * @param $scope gives scope to variables
 * @param NVService service for server url handling
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerSignUpCtrl', ['$scope','$rootScope','$location', 'UrlService', 'Validator', 'UrlConstants', 'Constants','$log','LStore','Auth',
        function ($scope,$rootScope,$location, urlService, validator, urlConstants, constants,$log, lStore,Auth) {
            $scope.error = "";
            $scope.title = "Join Us";
            $scope.stage="signupStart";
            var signupForm = this;
            signupForm.signInfo= {};
            signupForm.signInfo.userProfile ={};
            signupForm.otpInfo={};
            signupForm.fields=[{"key": "firstName","type": "input","templateOptions": {"type": "text","label":"First Name","required": true}},
                {"key": "email","type": "input","templateOptions": {"type": "email","label": "Email","required": true}},
                {"key": "primaryMobileNo","type": "input","templateOptions": {"type": "text","label":"Mobile","required": true}}];            
            signupForm.startSignup = function () {
                var isValid = validate(signupForm.signInfo);
                if (isValid == true) {
                    $rootScope.loading=true;
                    urlService.post(urlConstants.CONSUMERSIGNUPURL, signupForm.signInfo).then(function (response) {
                        $scope.stage="otpGenerated";
                        signupForm.otpfield=[{"key": "activationId","type": "input","templateOptions": {"type": "text","label":"OTP","required": true}}];        
                        signupForm.otpVerify = function () {
                            $scope.success=false;
                            $scope.danger=false;
                            $rootScope.loading=true;
                            urlService.post(urlConstants.CONSUMERSIGNUPURL + '/' + signupForm.otpInfo.activationId + '/verify').then(function (response) {
                                $scope.stage="setCredentials";
                                signupForm.credentialfields=[{"key":"password","type":"input","templateOptions":{"label":"New Password","type":"password","required":true}},{"key":"confirmPassword","optionsTypes":["matchField"],"type":"input","templateOptions":{"type":"password","label":"Confirm Password","required":true},"data":{"fieldToMatch":"password"}}];
                                signupForm.completeRegistration = function () {                                    
                                    var loginInfo={};
                                    loginInfo.loginId=signupForm.signInfo.userProfile.email;
                                    loginInfo.password=signupForm.credentialInfoC.password;
                                    $rootScope.loading=true;
                                    urlService.put(urlConstants.CONSUMERSIGNUPURL+"/"+signupForm.otpInfo.activationId +'/activate', signupForm.credentialInfoC).then(function (response) {
                                        urlService.post(urlConstants.CONSUMERLOGINURL, loginInfo).then(function (response) {
                                            lStore.store('ynw-consumer', JSON.stringify(response.data));
                                            lStore.store('ynw-credentials', JSON.stringify(loginInfo));
                                            Auth.setUser(response.data);
                                        },function (response) {
                                            $location.path("/login");
                                        }).finally(function() {
                                           $rootScope.loading=true;
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
                            }).finally(function () {
                                $rootScope.loading=false;
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
                    }).finally(function () {
                        $rootScope.loading=false;
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
        }]);
});