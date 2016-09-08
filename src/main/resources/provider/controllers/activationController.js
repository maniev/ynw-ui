/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ProviderActivateCtrl', ['$scope', '$stateParams', 'UrlService', 'UrlConstants',
        'Constants', function ($scope, $stateParams, urlService, urlConstants, constants) {
            var activationId = $stateParams.activationId;
            var pa = this;
            var message = "";
            this.credentialInfo = {};
            urlService.post(urlConstants.ACCOUNTURL + '/' + activationId + '/verify').then(function (response) {
                urlService.get('../provider/data/set-password.json').then(function (result) {
                    pa.fields = result.data;
                })
                pa.submit = function () {
                    urlService.put(urlConstants.ACCOUNTURL+"/"+ activationId + '/activate', this.credentialInfo).then(function (response) {
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