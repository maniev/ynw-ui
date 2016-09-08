/**
 * Created by Mani on 30-04-2016.
 *
 * return Controller to control consumer signUp
 * @param $scope gives scope to variables
 * @param NVService service for server url handling
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerSignUpCtrl', ['$scope', 'UrlService', 'Validator', 'UrlConstants', 'Constants',
        function ($scope, urlService, validator, urlConstants, constants) {
            $scope.error = "";
            $scope.title = "Join Us";
            var signupForm = this;
            signupForm.signInfo = {};
            signupForm.fields=[{"key": "firstName","type": "input","templateOptions": {"type": "text","label":"First Name","required": true}},
  {"key": "lastName","type": "input","templateOptions": {"type": "text","label": "Last Name","required": true}},
  {"key": "email","type": "input","templateOptions": {"type": "email","label":"Email","required": true}},
  {"key": "confirmEmail","optionsTypes": ["matchField"],"type": "input","templateOptions": {"type": "email","label":"Confirm Email","required": true},"data":{"fieldToMatch": "email","matchFieldMessage": "$viewValue + ' does not match ' + options.data.modelToMatch.email"}}];
            signupForm.submit = function () {
                this.signupInfo = {};
                var userP = {};
                userP.firstName = this.signInfo.firstName;
                userP.lastName = this.signInfo.lastName;
                userP.email = this.signInfo.email;
                var credential = {};
                credential.loginId = this.signInfo.email;
                credential.password = this.signInfo.password;
                this.signupInfo.userProfile = userP;
                this.signupInfo.credentials = credential;

                var isValid = validate(this.signInfo);
                if (isValid == true) {
                    urlService.post(urlConstants.CONSUMERSIGNUPURL, this.signupInfo).then(function (response) {
                        if (response.data) {
                            $scope.success = true;
                            $scope.danger = false;
                            $scope.message = constants.ACTIVATION_NOTIFY_MSG;
                        } else {
                            $scope.danger = true;
                            $scope.success = false;
                            $scope.message = response.data;
                        }
                    }, function (response) {
                        if (response.data.$valid) {
                            alert(JSON.stringify(response.data));
                        }
                    });
                } else {
                    $scope.danger = true;
                    $scope.success = false;
                    $scope.message = isValid;
                }
                function validate(signupInfo) {
                    if (validator.isNull(signupInfo.email)) {
                        return constants.EMAILREQUIRED;
                    }
                    return true;
                }
            }    
        }]);
});