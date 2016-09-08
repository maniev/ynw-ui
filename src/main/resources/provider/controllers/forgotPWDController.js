/**
 * Created by Mani on 30-04-2016.
 *
 * return Controller to handle the consumer forgot password
 * @param $scope gives scope to variables
 * @param NVService service for server url handling
 */

define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ProviderFPWDCtrl', ['$scope', 'UrlService', 'UrlConstants', 'Constants', function ($scope, urlService, urlConstants, constants) {
        var fp = this;
        fp.forgotpassword = {};
        fp.fields=[{"key": "email","type": "input","templateOptions": {"label":"What is your email address?","type": "email", "placeholder":"Email address","required": true}}];
        $scope.stage="fpStart";
        fp.submit = function (email) {
            var fpUrl = urlConstants.PROVIDERRESETURL + email;
            urlService.post(fpUrl, null).then(function (response) {
                $scope.stage="otpGenerated";
                fp.otpfield=[{"key": "activationId","type": "input","templateOptions": {"type": "text","label":"OTP","required": true}}];        
                fp.otpVerify = function () {
                    $scope.success=false;
                    $scope.danger=false;
                    urlService.post(urlConstants.PROVIDERRESETURL + fp.otpInfo.activationId + '/validate').then(function (response) {
                        $scope.stage="setCredentials";
                        fp.credentialfields=[{"key":"password","type":"input","templateOptions":{"label":"New Password","type":"password","required":true}},{"key":"confirmPassword","optionsTypes":["matchField"],"type":"input","templateOptions":{"type":"password","label":"Confirm Password","required":true},"data":{"fieldToMatch":"password"}}];
                        fp.completeFP = function () {                        
                            urlService.put(urlConstants.PROVIDERRESETURL+fp.otpInfo.activationId, fp.credentialInfoC).then(function (response) {
                                  $scope.success=true;
                                  $scope.danger=false;
                                  $scope.message=constants.SETPASSWORD_SUCCESS;

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
        }
    }]);
});