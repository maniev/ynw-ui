/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerFPApptCtrl',['$scope','UrlService', function ($scope,urlService) {
        $scope.type = 'favproviders';
        $scope.items=null;
        urlService.get('../consumer/data/favproviders.json').then(function(result){
            $scope.items=result.data.list;
        })
    }]);
});