/**ur
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('DiscountUpdateCtrl', ['$scope', '$timeout', '$element', 'UrlService', 'UrlConstants',
        'Constants', '$log','discountInfo','close', 'title',function ($scope, $timeout, $element, urlService, urlConstants, constants, $log,discountInfo, close,title) {
            $log.info('Discount Update Controller');
            var discount = this;
            discount.discountInfo=discountInfo;
            discount.title = title;
            var id=discountInfo.id;
            discount.fields=[

                    {"className": "col-md-12","key":"name","type":"input","templateOptions": {"type":"input","label":"Name","required":true}},
                    {"className": "col-md-12","key":"description","type":"textarea","templateOptions":{"rows":"4","label":"Description","required":true}},
                    {"className":"col-md-6",
                    "fieldGroup":[
                        {"className":"col-md-6","key":"calculationType","type":"radioType","templateOptions":{"options":[{"name":"₹","value":"Fixed"},{"name":"%","value":"Percentage"}],"label":"Value In","required":true}}
                    ]},
                    {"className":"col-md-6",
                        "fieldGroup":[ 
                            {"className":"col-md-12 no-padding","key":"discType","type":"radioType","templateOptions":{"options":[{"name":"OnDemand","value":"OnDemand"},{"name":"Predefined","value":"Predefine"}]}},
                            {"className":"col-md-3 no-padding","key":"discValue","type":"input","templateOptions": {"type":"input","pattern": "^[1-9][0-9]*$"}, "hideExpression": "model.discType=='OnDemand'"}  
                        ]
                    }
            ]
            discount.submit=function(){
                if($scope.discType=="OnDemand"){
                    discount.discountInfo.discValue =0;
                }else if($scope.discType=="Predefine"){
                    discount.discountInfo.discValue = $scope.discValue;
                    
                }
                
               
                urlService.put(urlConstants.DISCOUNTURL+'/'+id,discount.discountInfo).then(function (response) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.APM_DISCOUNT_UPDATE_SUCCESS;
                    $timeout(function () {
        $element.modal('hide');
         close(null, 500)},3000);
                }, function (response) {
                    if (response.data.$valid) {
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.message = response.data;
                    }
                });
            }
            $scope.close = function (result){
                close(result, 500);
            }   
            $scope.ShowHideDiv = function() {
                var chkYes = document.getElementById("chkYes");
                var discountVal = document.getElementById("discountVal");
                discountVal.style.display = chkYes.checked ? "block" : "none";
                
            }       
        }]);
});