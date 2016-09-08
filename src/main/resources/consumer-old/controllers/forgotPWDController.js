/**
 * Created by Mani on 30-04-2016.
 *
 * return Controller to handle the consumer forgot password
 * @param $scope gives scope to variables
 * @param NVService service for server url handling
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerFPWDCtrl', ['$scope', 'UrlService', 'UrlConstants', 'Constants', function ($scope, urlService, urlConstants, constants) {
        var fp = this;
        fp.forgotpassword = {};
        fp.fields=[{"key": "email","type": "input","templateOptions": {"label":"What is your email address?","type": "email", "placeholder":"Email address","required": true}}];
        fp.submit = function (email) {
            var fpUrl = urlConstants.CONSUMERRESETURL + email;
            urlService.post(fpUrl, null).then(function (response) {
                if (response.data) {
                    $scope.success = true;
                    $scope.message = constants.FORGOT_NOTIFICAITON_MSG;
                }
            })
        }
    }]);
});