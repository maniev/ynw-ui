/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('LabelUpdateCtrl', ['$scope','$rootScope' ,'$timeout', '$element','UrlService', 'UrlConstants',
        'Constants', '$log','labelInfo','title','close', function ($scope,$rootScope,$timeout, $element,urlService, urlConstants, constants, $log,labelInfo, title, close) {
            $log.info('Labels Update Controller');
            $rootScope.loading = false;//spinner
            var lm = this;
            lm.title=title;
            
            lm.labelInfo = labelInfo;
            delete lm.labelInfo.createdDate;
            lm.fields = [{
                "key": "label","type": "input",
                "templateOptions": {"type": "text", "label": "Enter label name", required: true}
            }]
            lm.submit = function () {
            	 $rootScope.loading = true;//spinner
                urlService.put(urlConstants.LABELSURL+"/"+lm.labelInfo.label+"/"+labelInfo.id).then(function (response) {
                	 $rootScope.loading = false;//spinner
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.LABEL_UPDATE_SUCCESS;
                    $timeout(function () {
                        $element.modal('hide');
                         close(null, 500)},3000);
                }, function (response) {
                    if (response.data.$valid) {
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.message = response.data;
                    }
                });
            }

            $scope.close = function (result) {
                close(result, 500);
            }

        }]);
});