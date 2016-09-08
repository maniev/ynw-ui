/**
 * Created by Mani on 01-05-2016.
 */
define(['../coreModule',], function (coreModule) {
    return coreModule.controller('FilterInputCtrl', ['$scope','GenericService', 'UrlConstants',
        'Constants','$log', function ($scope, genericService, urlConstants, constants,$log) {
            $scope.type="";
        
        function setValues(fltr) {          
            $scope.fltr.value="";
            $scope.operators=[];
            $scope.valueList=""
            angular.forEach($scope.filters, function(filter,index){
                if(filter.value==fltr.name){
                    $scope.type=filter.type;
                    $scope.operators=genericService.getOperators(filter.type);   
                    console.log(JSON.stringify($scope.operators));
                    $scope.valueList = genericService.getList(fltr.name);
                }
            });             
        }
        $scope.setValues=setValues;
    }]);
});
