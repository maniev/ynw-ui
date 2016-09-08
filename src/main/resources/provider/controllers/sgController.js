 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./sgCreateController'], function (providerModule) {
    return providerModule.controller('SGCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', 'ModalService', function ($scope, urlService, urlConstants, constants, $log, modalService) {
            $log.info('Service Groups Controller Started');
           	urlService.get(urlConstants.PROVIDERSERVICEGROUPURL).then(function(result){
	            $scope.servicegroups=result.data;
	            urlService.get(urlConstants.PROVIDERSERVICEURL).then(function(result){
	                var servicelist;
	                servicelist=result.data;
	                $scope.serviceCount = servicelist.reduce(function (prev, item) {
	                    if ( !! prev[item.group]) {
	                        prev[item.group]++;
	                    } else {
	                        prev[item.group] = 1;
	                    }
	                    return prev;
	                }, {});
	            })
	        })
            function newServiceGroup(){
	            modalService.showModal({
	                templateUrl:"../provider/templates/sg-create.html",
	                controller:"SGCreateCtrl as sgc",
	                inputs :{
                        title:"Create Service Group"
                    }
	            }).then(function(modal){
	                modal.element.modal({backdrop: 'static',keyboard: false });
	                modal.close.then(function(result) {
	                    urlService.get(urlConstants.PROVIDERSERVICEGROUPURL).then(function(result){
	                        $scope.servicegroups=result.data;
	                    })
	                });
	            });
	        }
	        function deleteServiceGroup(servicegrpID,index){
	        	var status=confirm("Do you want to delete this label? : " + servicegrpID);
	        	if(status){
		            urlService.deleteR(urlConstants.PROVIDERSERVICEGROUPURL+'/'+servicegrpID).then(function(response){
		                $scope.servicegroups.splice(index,1);
		                alert("Delete Success");
		            })
	        	}
	        }
	        $scope.createServiceGroup = newServiceGroup;
	        $scope.deleteServiceGroup = deleteServiceGroup;
    }]);
});
