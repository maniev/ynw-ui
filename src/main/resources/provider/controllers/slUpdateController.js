/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('SLUpdateCtrl', ['$scope','$rootScope','$timeout', '$element','UrlService', 'UrlConstants',
        'Constants', '$log','sLInfo','title','close', function ($scope,$rootScope, $timeout, $element, urlService, urlConstants, constants, $log,sLInfo, title, close) {
            $log.info('Service Location Update Controller');
            var lm = this;
            $rootScope.loading = false;//spinner
            lm.title=title;
            lm.sLInfo = sLInfo;
            delete lm.sLInfo.createdDate;
            lm.fields = [{
                "key": "location","type": "input",
                "templateOptions": {"type": "text", "label": "Enter Service location name", required: true}
            }]
            lm.submit = function () {
            	 $rootScope.loading = true;//spinner
                urlService.put(urlConstants.SLURL+"/"+lm.sLInfo.location+"/"+lm.sLInfo.id).then(function (response) {
                	 $rootScope.loading = false;//spinner
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.SERVICELOC_UPDATE_SUCCESS;
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