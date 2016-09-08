/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./discountUpdateController'], function (providerModule) {
    return providerModule.controller('DiscountViewCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService',  function ($scope, urlService, urlConstants, constants, $log, $stateParams,modalService) {
        var discount = this;
          $log.info('Discount View Controller');
          var id=$stateParams.id;
          discount.options={
            formState: {
              readOnly: true
            }
          };
          discount.fields =[
                        {"className": "col-md-3","key": "name","type": "input","templateOptions": {"type": "text","label":"Name"}},
                        {"className": "col-md-3","key": "discValue","type": "input","templateOptions": {"type": "text","label": "Value"}},
                        {"className": "col-md-6","key": "description","type": "input","templateOptions": {"type": "text","label": "Description"}}
                        ]
          
          discount.discountInfo = {};
          urlService.get(urlConstants.DISCOUNTURL+"/"+id).then(function(response){
            discount.discountInfo=response.data;
            discount.Info = angular.copy(response.data);
            if(discount.discountInfo.discValue==0)
              discount.discountInfo.discValue=="";
            else{
              if(discount.discountInfo.calculationType=='Fixed')
                discount.discountInfo.discValue='Rs.' + discount.discountInfo.discValue + '/-';
              else
                discount.discountInfo.discValue=discount.discountInfo.discValue + '%';
            }
          });
      function updateDiscount(){
            modalService.showModal({
              templateUrl:"../provider/templates/discount-create.html",
              width:"30%", 
              controller:"DiscountUpdateCtrl as dcc",
              inputs:{
                discountInfo:angular.copy(discount.discountInfo),
                title:"Update Discount"
              }             
            }).then(function(modal){
                modal.element.modal({backdrop:'static',keyboard:false});
                modal.close.then(function(result){
                  urlService.get(urlConstants.DISCOUNTURL+"/"+id).then(function(response){
                     discount.discountInfo = response.data;
                  
                    if(discount.discountInfo.calculationType=='Fixed')
                      discount.discountInfo.discValue='Rs.' + discount.discountInfo.discValue + '/-';
                    else
                      discount.discountInfo.discValue=discount.discountInfo.discValue + '%';


                    
                  })
              });
        });
        }
          $scope.updateDiscount=updateDiscount;             
    }]);
});
