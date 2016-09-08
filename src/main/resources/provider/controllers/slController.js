 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./slCreateController'], function (providerModule) {
    return providerModule.controller('SLCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log','ModalService', function ($scope, urlService, urlConstants, constants,$log,modalService) {
            $log.info('Service Location List Controller');
            urlService.get(urlConstants.SLURL).then(function(result){
	            $scope.serviceL=result.data;
	        })
           	function newServiceLocation(){
	            modalService.showModal({
	                templateUrl:"../provider/templates/sl-create.html",
	                width:"70%",
	                controller:"SLCreateCtrl as slc",
	                inputs:{
	                	title:"Create Service Location"
	                }
	            }).then(function(modal){
	                modal.element.modal({backdrop: 'static',keyboard: false });
	                modal.close.then(function(result) {
	                	urlService.get(urlConstants.SLURL).then(function(result){
			            	$scope.serviceL=result.data;
			       		})
	                });
	            });
	        }
	        function deleteServiceLocation(sLID,index){
	            var status=confirm("Do you want to delete this location? : " + sLID);
                if(status){
                    urlService.deleteR(urlConstants.SLURL + '/'+ sLID).then(function(result){
                        $scope.serviceL.splice(index, 1);     
                        alert("Location Deleted");
                    })   
                } 
	        }
	        $scope.createServiceLocation = newServiceLocation;
            $scope.deleteServiceLocation = deleteServiceLocation;
    }]);
});
