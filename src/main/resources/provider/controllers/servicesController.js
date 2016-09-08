 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./serviceCreateController'], function (providerModule) {
    return providerModule.controller('ServicesCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log','ModalService', function ($scope, urlService, urlConstants, constants,$log,modalService) {
            $log.info('Services List Controller');
            urlService.get(urlConstants.PROVIDERSERVICEURL).then(function(result){
	            $scope.services=result.data; 
	        })
           	function newService(){
	            modalService.showModal({
	                templateUrl:"../provider/templates/service-create.html",
	                controller:"ServiceCreateCtrl as sc",
	                inputs:{
	                	title:"Create Service"
	                }
	            }).then(function(modal){
	                modal.element.modal({backdrop: 'static',keyboard: false });
	                modal.close.then(function(result) {
	                    urlService.get(urlConstants.PROVIDERSERVICEURL).then(function(result){
	                        $scope.services=result.data;
	                    })
	                });
	            });
	        }
	        function deleteService(serviceID,$index){
	            var servID = serviceID;
	            urlService.deleteR(urlConstants.PROVIDERSERVICEDELURL+servID).then(function(response){
	                $scope.selectedIndex = $index;
	                alert("Delete Success");
	                urlService.get(urlConstants.PROVIDERSERVICEURL).then(function(result){
	                    $scope.services=result.data;
	                })
	            })
	        }
	        urlService.get(urlConstants.PROVIDERSERVICEGROUPURL).then(function(result){
	            $scope.servicegrplist=result.data;
	        })
	        $scope.createService = newService;
            $scope.deleteService = deleteService;
    }]);
});