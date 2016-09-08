/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ServiceUpdateCtrl', ['$scope','$rootScope','UrlService', 'UrlConstants',
        'Constants', '$log','serviceInfo','close','title', function ($scope,$rootScope, urlService, urlConstants, constants, $log,serviceInfo, close,title) {
            $log.info('Service Update Controller');
            $rootScope.loading = false;//spinner
            var lm = this;
            lm.title = title;
            lm.serviceInfo = serviceInfo;
            $scope.selected = serviceInfo.notificationType;
            delete lm.serviceInfo.createdDate;
            lm.fields=[{
                "className":"col-md-6",
                "fieldGroup": [
                    {"className":"col-md-12","key":"name","type":"input","templateOptions":{"type":"text","label":"Service name","required":true}},
                    {"className":"col-md-12","key":"description","type":"textarea","templateOptions":{"rows":4,"label":"Description","required":true}},
                ]
            },                  
            {
                "className":"col-md-6",
                "fieldGroup": [
                    {"className":"col-md-12 number","key":"serviceDuration","type":"input","templateOptions":{"type":"text","pattern": "^[1-9][0-9]*$","label":"Service Duration (in mins)","required":true}},
                    {"className":"col-md-12","key": "notification", "type": "checkbox", "templateOptions": {"label": "Enable end of service notification"}},
                    {"className":"col-md-6","key":"notificationType","type":"select","templateOptions":{"label":"","options":[{"name":"SMS","value":"sms"},{"name":"Email","value":"email"},{"name":"Phone","value":"phone"}]},hideExpression: "!model.notification"}
                ]
            }]

            lm.submit = function () {
                lm.serviceInfo.notificationType = $scope.selected;
                $rootScope.loading = true;//spinner
                urlService.put(urlConstants.PROVIDERSERVICEURL+'/'+id, lm.serviceInfo).then(function (response) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.SERVICE_UPDATE_SUCCESS;
                }, function (response) {
                    $scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
                }).finally(function () {
                    $rootScope.loading = false;//spinner
                });
            }

            $scope.close = function (result) {
                close(result, 500);
            }
        }]);
});