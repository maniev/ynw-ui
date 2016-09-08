/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('SLCreateCtrl', ['$scope','$rootScope', 'UrlService', 'UrlConstants',
        'Constants', '$log','close','title', function ($scope,$rootScope, urlService, urlConstants, constants, $log,close,title) {
            $log.info('Service Location Create Controller');
            $rootScope.loading = false;//spinner
            var sl = this;
            sl.title = title;
            sl.sLInfo = {};
            sl.fields=[{"key":"name","type":"input","templateOptions":{"type":"text","label":"Enter Service location name","required":true}}]
            
            sl.submit = function(){
            	$rootScope.loading = true;//spinner
                urlService.post(urlConstants.SLURL+"/"+sl.sLInfo.name).then(function(response){
                	 $rootScope.loading = false;//spinner
                    $scope.success=true;
                    $scope.danger=false;
                    $scope.message=constants.SERVICELOC_CREATE_SUCCESS;
                    sl.sLInfo = {};
                    $scope.change=function($event){
                        $scope.success = false;   
                    };      
                },function  (response) {
                    $scope.danger=true;
                    $scope.success=false;
                    $scope.message=response.data;
                })
            }
            $scope.close = function(result){
                close(result,500);
            }
        }]);
});