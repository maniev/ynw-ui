/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerActivateCtrl', ['$scope', '$stateParams', 'UrlService', 'UrlConstants',
        'Constants', function ($scope, $stateParams, urlService, urlConstants, constants) {
        var activationId = $stateParams.activationId;
        var pp = this;
        var message = "";
        this.credentialInfoC = {};
        urlService.post(urlConstants.CONSUMERSIGNUPURL + '/' + activationId + '/verify').then(function (response) {
            pp.fields=[{"key":"password","type":"input","templateOptions":{"label":"New Password","type":"password","required":true}},{"key":"confirmPassword","optionsTypes":["matchField"],"type":"input","templateOptions":{"type":"password","label":"Confirm Password","required":true},"data":{"fieldToMatch":"password"}}];
            pp.submit = function () {
                urlService.put(urlConstants.CONSUMERSIGNUPURL+"/"+activationId +'/activate', this.credentialInfoC).then(function (response) {
                    if (response.data) {
                        $scope.success = true;
                        $scope.message =constants.SETPASSWORD_SUCCESS;
                    }
                }, function (response) {
                    $scope.danger = true;
                    $scope.message = response.data;
                })
            }
        }, function (response) {
            $scope.danger = true;
            $scope.message = response.data;
        });
    }]);
});