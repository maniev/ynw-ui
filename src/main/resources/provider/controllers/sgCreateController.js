/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('SGCreateCtrl', ['$scope','$rootScope','UrlService', 'UrlConstants',
        'Constants', '$log','close','title', function ($scope,$rootScope,urlService, urlConstants, constants, $log, close,title) {
            $log.info('Service Group Create Controller');
            $rootScope.loading = false;//spinner
            var servicegrp = this;
            servicegrp.title = title;
            servicegrp.sGInfo = {};
            
            servicegrp.fields=[{
                "key":"name","type":"input",
                "templateOptions":{"type":"text","label":"Enter Service Group Name","required":true}
            }];
            servicegrp.submit = function(sGInfo){
            	 $rootScope.loading = true;//spinner
                urlService.post(urlConstants.PROVIDERSERVICEGROUPURL+"/"+sGInfo.name).then(function(response){
                	 $rootScope.loading = false;//spinner
                    $scope.success=true;
                    $scope.danger=false;
                    $scope.message=constants.SERVICEGRP_CREATE_SUCCESS;
                     servicegrp.sGInfo = {};
                      servicegrp = {};
                     
                },function (response) {
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



