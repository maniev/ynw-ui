 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ConsumerLabelsCtrl', ['$scope','$rootScope','UrlService', 'UrlConstants',
        'Constants','$log', 'ModalService','selCustomers', function ($scope, $rootScope, urlService, urlConstants, constants,$log, modalService,customers) {
            $scope.labels={};
       urlService.get(urlConstants.LABELSURL).then(function (result) {
            $scope.labels = result.data;
        })

        $scope.close = function (result) {
            close(result, 500);
        }

        function getSelectedLabels(labels) {

            var selLabels = [];
            angular.forEach(labels, function (value) {
                if (value.isChecked)
                    selLabels.push(value);
            })
            return selLabels;
        }

        $scope.submit = function () {
            var labCons = {};
            labCons.consumers = [];

            var selLabels = getSelectedLabels($scope.labels);
                angular.forEach(selLabels, function (lbl) {
                var labelConsumerObj = {};
                labelConsumerObj.label = lbl.id;
                //labelConsumerObj.createdDate = lbl.createdDate;
                labelConsumerObj.createdDate = "2016-05-09"; 
                labelConsumerObj.consumerIds = customers;
                labCons.consumers.push(labelConsumerObj);

            })
            alert("label assigned list" + JSON.stringify(labCons));
            urlService.put(urlConstants.LABELASSIGNURL,labCons).then(function(response){
                alert("response.data"+JSON.stringify(response.data));
                if (response.data){
                    $scope.success=true;
                    $scope.danger=false;
                    $scope.message="Label assigned";
                    
                } else {
                    $scope.danger=true;
                    $scope.success=false;
                    $scope.message=response.data;
                } 
            },function(response){
                if(response.data.$valid){
                    alert(JSON.stringify(response.data));
                }
            })
        }
    }]);
});