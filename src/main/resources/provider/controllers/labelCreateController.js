/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('LabelCreateCtrl', ['$scope','$rootScope', 'UrlService', 'UrlConstants',
        'Constants', '$log','title','close', function ($scope,$rootScope, urlService, urlConstants, constants, $log, title, close) {
            $log.info('Labels Create Controller');
            $rootScope.loading = false;//spinner
            var lm = this;
            lm.title = title;
            lm.labelInfo = {};
            lm.fields = [{
                "key": "label","type": "input",
                "templateOptions": {"type": "text", "label": "Enter Customer Label ", required: true}
            }]
            lm.submit = function () {
            	 $rootScope.loading = true;//spinner
                urlService.post(urlConstants.LABELSURL+"/"+lm.labelInfo.label).then(function (response) {
                	 $rootScope.loading = false;//spinner
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.LABEL_CREATE_SUCCESS;
                    lm.labelInfo={};
                }, function (response) {
                    $scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
                });
            }
            $scope.close = function (result) {
                close(result, 500);
            }

        }]);
});