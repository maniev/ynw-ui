/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerActivateCtrl', ['$scope','$rootScope', '$stateParams', 'UrlService', 'UrlConstants',
        'Constants', function ($scope, $rootScope,$stateParams, urlService, urlConstants, constants) {
        var activationId = $stateParams.activationId;
        var pp = this;
        var message = "";
        this.credentialInfoC = {};
        $rootScope.loading=true;
        urlService.post(urlConstants.CONSUMERSIGNUPURL + '/' + activationId + '/verify').then(function (response) {
            pp.fields=[{"key":"password","type":"input","templateOptions":{"label":"New Password","type":"password","required":true}},{"key":"confirmPassword","optionsTypes":["matchField"],"type":"input","templateOptions":{"type":"password","label":"Confirm Password","required":true},"data":{"fieldToMatch":"password"}}];
            pp.submit = function () {
                $rootScope.loading=true;
                urlService.put(urlConstants.CONSUMERSIGNUPURL+"/"+activationId +'/activate', this.credentialInfoC).then(function (response) {
                    $scope.success = true;
                    $scope.danger=false;
                    $scope.message =constants.SETPASSWORD_SUCCESS;
                }, function (response) {
                    $scope.danger = true;
                    $scope.success=false;
                    $scope.message = response.data;
                }).finally(function () {
                    $rootScope.loading=false;
                })
            }
        }, function (response) {
            $scope.danger = true;
            $scope.message = response.data;
        }).finally(function () {
           $rootScope.loading=false;
        });
    }]);
});