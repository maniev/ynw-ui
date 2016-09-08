/**
 * Created by Mani on 30-04-2016.
 *
 * return Controller to handle the consumer forgot password
 * @param $scope gives scope to variables
 * @param NVService service for server url handling
 */

define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerCPWDCtrl', ['$scope','$rootScope', 'UrlService', 'UrlConstants', 'Constants',
     function ($scope, $rootScope,  urlService, urlConstants, constants) {
        var cp = this;
        cp.pwdInfo = {};
        cp.fields = [{
            "key": "oldpassword",
            "type": "input",
            "templateOptions": {
                "type": "password",
                "label": "Old Password",
                "minlength": "8",
                "required": true,
                "pattern": "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}"
            }
        },
            {
                "key": "password",
                "type": "input",
                "templateOptions": {
                    "type": "password",
                    "label": "New Password",
                    "minlength": "8",
                    "required": true,
                    "pattern": "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}",
                    "patternValidationMessage": "***Must have atleast one uppercase letter , atleast one number and minimum 8 characters"
                }
            },
            {
                "key": "confirmPassword",
                "optionsTypes": ["matchField"],
                "type": "input",
                "templateOptions": {"type": "password", "label": "Confirm New Password", "required": true},
                "data": {"fieldToMatch": "password"}
            }]
        cp.submit = function (pwdInfo) {
            if (pwdInfo.password != pwdInfo.confirmPassword)
                return false;
            var pwd = angular.copy(pwdInfo);
            delete pwd.confirmPassword;
            $rootScope.loading=true;
            urlService.put(urlConstants.CONSUMERCHANGEPWDURL, pwd).then(function (response) {
                $scope.success = true;
                $scope.danger = false;
                $scope.message = constants.RESET_SUCCESS_MSG;
            }, function (response) {
                $scope.danger = true;
                $scope.success = false;
                $scope.message = response.data;
            }).finally(function () {
                $rootScope.loading=false;
            })
        }
    }]);
});