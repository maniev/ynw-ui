/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('DiscountCreateCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','close','title', function ($scope, urlService, urlConstants, constants, $log,close,title) {
            $log.info('Discount Create Controller');
            var discount = this;
            discount.title = title;
            discount.discountInfo = {};
            discount.fields=[

                    {"className":"col-md-12","key":"name","type":"input","templateOptions": {"type":"input","label":"Name","required":true}},
                    {"className":"col-md-12","key":"description","type":"textarea","templateOptions":{"rows":"4","label":"Description","required":true}},
                    {"className":"col-md-6",
                    "fieldGroup":[
                        {"key":"calculationType","type":"radioType","templateOptions":{"options":[{"name":"₹","value":"Fixed"},{"name":"%","value":"Percentage"}],"label":"Value In","required":true}}
                    ]},
                    {"className":"col-md-6",
                        "fieldGroup":[ 
                            {className:"col-md-12 no-padding",key:"discType",type:"radioType",templateOptions:{"options":[{"name":"OnDemand","value":"OnDemand"},{"name":"Predefined","value":"Predefine"}]}},
                            {"className":"col-md-3 no-padding","key":"discValue","type":"input","templateOptions": {"type":"input","pattern": "^[1-9][0-9]*$","required":true}, hideExpression: "model.discType=='OnDemand'"}  
                        ]
                    }
            ]
            discount.discountInfo.discType="OnDemand";
            discount.submit = function(){
               var newdiscountInfo = {};
               newdiscountInfo=discount.discountInfo;
				//console.log(JSON.stringify(newdiscountInfo));
                
                urlService.post(urlConstants.DISCOUNTURL,discount.discountInfo).then(function(response){
                	 $scope.success=true;
                    $scope.danger = false;
                    $scope.message=constants.APM_DISCOUNT_CREATE_SUCCESS;
                    discount.discountInfo={};
                	},function(response){
                		$scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
               });
                    
            }
	
            $scope.close = function(result){
                close(result,500);
            }
         
     $scope.ShowHideDiv = function() {
        var chkYes = document.getElementById("chkYes");
        var discountVal = document.getElementById("discountVal");
        discountVal.style.display = chkYes.checked ? "block" : "none";
        
    }

        }]);
});
