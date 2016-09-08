/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerApptCtrl',['$scope','UrlService', function ($scope,urlService) {
       // $scope.appointmentType="Today's";
        $scope.type = 'upcoming';
        $scope.status='active';
         $scope.appointments = {};
        urlService.get('../consumer/data/appointments.json').then(function(result){
            $scope.appointments=result.data.list;
        })
    }]);
});