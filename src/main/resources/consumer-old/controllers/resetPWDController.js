/**
 * Created by Mani on 29-04-2016.
 *
 * return Controller to handle the consumer reset password
 * @param $scope gives scope to variables
 * @param NVService service for server url handling
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerRPWCtrl', ['$scope', '$log', '$stateParams', 'UrlService', 'UrlConstants','Constants', function ($scope, $log, $stateParams, urlService, urlConstants,constants) {
        $log.info('Consumer Reset Password Controller ...');
        var fp = this;
        var resetKey = $stateParams.resetKey;
        var message = "";
        fp.resetpassword = {};
        urlService.post(urlConstants.CONSUMERRESETURL + resetKey + '/validate').then(function (result) {
            fp.fields=[{"key": "password","type": "input","templateOptions": {"label":"New Password","type": "password","required": true}},{"key": "confirmpassword","type": "input","templateOptions": {"label":"Confirm Password","type": "password","required": true}}];
            fp.submit = function () {
                var fpUrl = urlConstants.CONSUMERRESETURL + resetKey;
                var credentials = {};
                credentials.password = fp.resetpassword.password;
                urlService.put(fpUrl, credentials).then(function (response) {
                    if (response.data) {
                        $scope.success = true;
                        $scope.message = constants.RESET_SUCCESS_MSG;
                    }
                })
            }
        }, function (response) {
            $scope.message = response.data;
        });
    }]);
});