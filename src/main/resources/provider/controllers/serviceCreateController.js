/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ServiceCreateCtrl', ['$scope','$rootScope', 'UrlService', 'UrlConstants',
        'Constants', '$log','close','title',function ($scope,$rootScope, urlService, urlConstants, constants, $log,close,title) {
            $log.info('Service Create Controller');
            $rootScope.loading = false;//spinner
            var providernewservice = this;
            providernewservice.title = title;
            providernewservice.serviceInfo = {}
            $scope.selected = "";
        	providernewservice.fields=[{
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
            providernewservice.submit = function(serviceInfo){
                this.newserviceInfo = {};
                this.newserviceInfo.name = this.serviceInfo.name;
                this.newserviceInfo.description = this.serviceInfo.description;
                this.newserviceInfo.notificationType = this.serviceInfo.notificationType;
                this.newserviceInfo.appmtDuration = this.serviceInfo.appmtDuration;
                this.newserviceInfo.status = "Active";
                this.newserviceInfo.bType="Waitlist";
                $rootScope.loading = true;//spinner
                urlService.post(urlConstants.PROVIDERSERVICEURL,this.newserviceInfo).then(function(response){
                	 $rootScope.loading = false;//spinner
                    $scope.success=true;
                    $scope.danger=false;
                    $scope.message=constants.SERVICE_CREATE_SUCCESS;
                },function (response) {
                    $scope.danger=true;
                    $scope.success=false;
                    $scope.message=response.data;
                }).finally(function () {
                     $rootScope.loading = false;
                })
            }
            $scope.close = function(result){
                close(result,500);
            }
        }]);
});
