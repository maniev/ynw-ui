/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ProviderApptCtrl',['$scope','UrlService','$stateParams', function ($scope,urlService,$stateParams) {

        $scope.showFilter=false;
        $scope.filters=[{"name":"Time Period","value":"timePeriod","type":"String"},{"name":"Date","value":"date","type":"Date"},{"name":"Doctor","value":"doctor","type":"String"}];
        $scope.toggleFilter=function () {
            if($scope.showFilter)
                $scope.showFilter=false;
            else
                $scope.showFilter=true;
        }


        if($stateParams.type!='past')
            $scope.type='upcoming';
        else
            $scope.type='past';
        $scope.appointments = {};
        urlService.get("../provider/data/" + $stateParams.type + ".json").then(function(result){
            $scope.appointments = result.data.list;
        })
    }]);
});