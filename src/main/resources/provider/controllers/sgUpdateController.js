/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('SGUpdateCtrl', ['$scope','$rootScope', '$timeout', '$element','UrlService', 'UrlConstants',
        'Constants', '$log','sGInfo','title','close', function ($scope,$rootScope, $timeout, $element, urlService, urlConstants, constants, $log,sGInfo, title, close) {
            $log.info('Service Group Update Controller');
            $rootScope.loading = false;//spinner
            var lm = this;
            lm.title=title;
            lm.sGInfo = sGInfo;
            delete lm.sGInfo.createdDate;
            lm.fields = [{
                "key": "name","type": "input",
                "templateOptions": {"type": "text", "label": "Group Name", required: true}
            }]
            lm.submit = function () {
            	 $rootScope.loading = true;//spinner
                urlService.put(urlConstants.PROVIDERSERVICEGROUPURL+"/"+lm.sGInfo.name+"/"+lm.sGInfo.id).then(function (response) {
                	 $rootScope.loading = false;//spinner
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.SERVICEGRP_UPDATE_SUCCESS;
                    $timeout(function () {
                        $element.modal('hide');
                         close(null, 500)},3000);
                },function (response) {
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