/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerProviderCtrl',['$scope','UrlService','$log','UrlConstants','$location',
     function ($scope,urlService,$log,urlConstants,$location) {
     	var ps=this;
        $log.info('My Providers Controller');
        urlService.get(urlConstants.FAVPROVIDERSURL).then(function(result){
            ps.providers=result.data;
        })     

        $scope.search=function (mobile) {
        	if(mobile){
        		$location.path('/home/providers/'+mobile);
        	}
        }  
    }]);
});