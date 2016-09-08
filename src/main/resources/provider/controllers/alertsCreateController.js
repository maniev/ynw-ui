 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('AlertsCreateCtrl', ['$scope','$rootScope','UrlService', 'UrlConstants',
        'Constants','$log','Validator', function ($scope, $rootScope, urlService, urlConstants, constants,$log,validator) {
    	 $rootScope.loading = false;//spinner
         $scope.alertConf = {};
         var sources;
         var categories;
            urlService.get(urlConstants.ALERTCONF).then(function(result){
                $scope.alertConf = result.data;    
                
                sources = result.data.sources;
                categories = result.data.categories;
                alertForm.fields = [
                                    {"key": "subject","className":"col-sm-12","type": "input","templateOptions": {"type": "text","label": "Subject","required": true}},
                                    {"key": "text","className":"col-sm-12","type": "input","templateOptions": {"type": "text","label":"Text","required": true}},
                                    {"key": "ackRequired", "className":"col-sm-12","type": "radioType", "templateOptions": {"label": "Acknowledgement Required", "required": true,"options": [{"name": "Yes","value": "true"}, {"name": "No","value": "false"}]}},
                                    {"key": "sources", "className": "col-md-12", "type": "select", "templateOptions": {"label": "Sources", "ngOptions": "option[to.valueProp] as option in to.options","options": sources, "valueProp": "id", "labelProp": "name"}},
                                    {"className": "col-md-12", "key": "categories", "type": "select", "templateOptions": {"label": "Categories", "ngOptions": "option[to.valueProp] as option in to.options","options": categories, "valueProp": "id", "labelProp": "name"}},
                                    {"className":"col-md-12","key": "subCategories","type": "select","templateOptions": {"label":"Subcategories","valueProp":"id","labelProp":"name","options":[]},
                                        controller: function($scope){
                                            $scope.$watch('model.categories',function(newValue, oldValue){
                                                if(newValue!=oldValue){
                                                    $scope.to.options =getSubServiceSectors(newValue);
                                                }
                                            })
                                        }
                                    }
                                  ]
                function getSubServiceSectors(serviceSectorId){
                    var subsectors=null;
                    angular.forEach(categories,function(category){
                        if(category.id==serviceSectorId){
                            if(category.subCategories)
                                subsectors=category.subCategories;
                                return false;
                        }
                    })
                return subsectors;
                }
            })
        var alertForm=this;
        alertForm.alertInfo={};
       
       alertForm.submit=function(){
            this.alert={};
            var source={};
            var category={};
            var subCategory={};
            var severity={};
            source.id=this.alertInfo.sources;
            category.id=this.alertInfo.categories;
            subCategory.id=this.alertInfo.subCategories;
            severity.id=1;
            this.alert.subject=this.alertInfo.subject;
            this.alert.text=this.alertInfo.text;
            this.alert.ackRequired=this.alertInfo.ackRequired;
            this.alert.source=source;
            this.alert.category=category;
            this.alert.subCategory=subCategory
            this.alert.severity=severity;
            
            var isValid = validate(this.alert);
            if(isValid == true){
            	 $rootScope.loading = true;//spinner
                urlService.post(urlConstants.ALERTURL,this.alert).then(function(response){
                	 $rootScope.loading = false;//spinner
                    if (response.data){
                        $scope.success=true;
                        $scope.danger=false;
                        $scope.message=constants.ALERT_ADD_SUCCESS;
                    }
                },function (response) {
                    $scope.success= false;
                    $scope.danger= true;
                    $scope.message=response.data;
                });
            } else {
                $scope.success= false;
                $scope.danger= true;
                $scope.message=isValid;
            }
            function validate(signupInfo){
                if(validator.isNull(signupInfo.subject)){
                    return "Required";
                }else if(validator.isNull(signupInfo.text)){
                    return "Required";
                }
                return true;
            }
        }
    }]);
});