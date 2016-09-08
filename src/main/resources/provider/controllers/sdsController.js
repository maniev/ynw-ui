 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./sdCreateController'], function (providerModule) {
    return providerModule.controller('SDsCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log','ModalService', function ($scope, urlService, urlConstants, constants,$log,modalService) {
            $log.info('Discount Schedule Started');
            /*urlService.get(urlConstants.PROVIDERSERVICEURL).then(function(result){
	            $scope.services=result.data; 
	        })*/
           	function newDSchedule(){
	            modalService.showModal({
	                templateUrl:"../provider/templates/sd-create.html",
	                width:"70%",
	                controller:"SDCreateCtrl as sd"
	            }).then(function(modal){
	                modal.element.modal({backdrop: 'static',keyboard: false });
	                modal.close.then(function(result) {
	                    /*urlService.get(urlConstants.PROVIDERSERVICEURL).then(function(result){
	                        $scope.services=result.data;
	                    })*/
	                });
	            });
	        }
	        function deleteDSchedule(serviceID,$index){
	            /*var servID = serviceID;
	            urlService.deleteR(urlConstants.PROVIDERSERVICEDELURL+servID).then(function(response){
	                $scope.selectedIndex = $index;
	                alert("Delete Success");
	                urlService.get(urlConstants.PROVIDERSERVICEURL).then(function(result){
	                    $scope.services=result.data;
	                })
	            })*/
	        }
	        $scope.createDSchedule = newDSchedule;
            $scope.deleteDSchedule = deleteDSchedule;
    }]);
});