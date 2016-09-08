 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./spCreateController'], function (providerModule) {
    return providerModule.controller('SPsCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log','ModalService', function ($scope, urlService, urlConstants, constants,$log,modalService) {
            
			$log.info('Service Provider Module Started');
			
			$scope.createSP = newSP;
			function newSP(){
				modalService.showModal({
					templateUrl:"../provider/templates/sp-create.html",
					controller:"SPCreateControl as npsc",
					"inputs":{
						"title":"Create Service Provider"
					}
				}) .then(function(modal){
					modal.element.modal({backdrop: 'static',keyboard: false });
					modal.close.then(function(result) { 
						urlService.get(urlConstants.PROVIDERSIGNUPURL).then(function(result){
							$scope.stafflist = result.data;
						})            
					});
				}); 
			}
			urlService.get(urlConstants.SERVICEPROVIDERS).then(function(result){
				$scope.stafflist = result.data;
			})
    }]);
});