/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./discountCreateController'], function (providerModule) {
    return providerModule.controller('DiscountCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log','ModalService', function ($scope, urlService, urlConstants, constants,$log,modalService) {
            $log.info('Discount Started');
	        urlService.get(urlConstants.DISCOUNTURL).then(function(result){
				$scope.discounts = result.data;
			})
          	function newDiscount() {
                    modalService.showModal({
                    templateUrl: "../provider/templates/discount-create.html",
                    width: "20%",
                    controller: "DiscountCreateCtrl as dcc",
                    inputs:{
                        title:"Create Discount"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.DISCOUNTURL).then(function (result) {
                            $scope.discounts = result.data;
                        })
                    });
                });
            }
		    function deleteDiscount(id,index){
                var status=confirm("Do you want to delete this discount? : " + id);
                if(status){
                    urlService.deleteR(urlConstants.DISCOUNTURL + '/'+ id).then(function(result){
                        $scope.discounts.splice(index, 1);     
                        alert("discount  deleted");
                    })   
                }       
            }
		    $scope.createDiscount=newDiscount;
		    $scope.deleteDiscount=deleteDiscount;	
    }]);
});
