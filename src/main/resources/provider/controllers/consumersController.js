/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./consumerCreateController'], function (providerModule) {
    return providerModule.controller('ConsumersCtrl', ['$scope', '$stateParams', 'UrlService', 'UrlConstants',
        'Constants','ModalService', function ($scope, $stateParams, urlService, urlConstants, constants,modalService) {
            $scope.consumers = {};
            urlService.get(urlConstants.CONSUMERURL).then(function(result){
                $scope.consumers = result.data;    
            })
            $scope.assignLabel = function(){
                //alert("$scope.consumers--" + JSON.stringify($scope.consumers));
                var selCustomers=getSelectedCustomers($scope.consumers); //hold selected customers list
                if(selCustomers.length==0){
                    alert("Select atleast one customer");
                }else{
                applyGroupLabels(selCustomers);
                }
            }
            function getSelectedCustomers (consumers) {
                $scope.selCustomers=[];
                angular.forEach(consumers, function(value){

                    if (value.isSelected) 
                        $scope.selCustomers.push(value.id);     
                })
               //  alert("$scope.selCustomers--" + JSON.stringify($scope.selCustomers));
                return $scope.selCustomers;
            }
            function applyGroupLabels (selCustomers) {
                alert("inside applyGroupLabels");
                modalService.showModal({
                    templateUrl:"../provider/templates/label-select-list.html",
                    width:"70%",
                    controller:"ConsumerLabelsCtrl",
                    inputs:{
                        'selCustomers':selCustomers
                    }
                }).then(function(modal){
                    modal.element.modal({backdrop: 'static',keyboard: false });
                    modal.close.then(function(result) {

                    });
                });
            }
            /**
            * Method to trigger new customer modal box
            */
            $scope.newcustomer = function(){
                modalService.showModal({
                    templateUrl:"../provider/templates/consumer-create.html",
                    controller:"ConsumerCreateCtrl as pm"
                }).then(function(modal){
                    modal.element.modal({backdrop: 'static',keyboard: false });
                    modal.close.then(function(result) {
						 urlService.get(urlConstants.ADDCONSUMERURL).then(function (result) {
                            $scope.consumers = result.data;
                        })
                    });
                });
            }
    }]);
});