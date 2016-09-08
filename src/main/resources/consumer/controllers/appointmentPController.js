/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerPApptCtrl',['$scope','UrlService', function ($scope,urlService) {
        $scope.appointmentType="Past";
        $scope.type = 'past';
        $scope.providers=null;
        urlService.get('../consumer/data/appointmentsP.json').then(function(result){
            $scope.providers=result.data.list;
        })
    }]);
});