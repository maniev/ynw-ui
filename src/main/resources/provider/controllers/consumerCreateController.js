 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ConsumerCreateCtrl', ['$scope','$rootScope','UrlService', 'UrlConstants',
        'Constants','$log','close','Validator', function ($scope, $rootScope, urlService, urlConstants, constants,$log,close,validator) {
    	 $rootScope.loading = false;//spinner
        var consumerForm=this;
        consumerForm.consumerInfo={};
        urlService.get('../provider/data/consumer-create.json').then(function(result){
            consumerForm.fields = result.data;
        })
        consumerForm.submit=function(){
            this.signupInfo={};
            this.signupInfo.userProfile={};
            this.signupInfo.userProfile.firstName=this.consumerInfo.firstName;
            this.signupInfo.userProfile.lastName=this.consumerInfo.lastName;
            this.signupInfo.userProfile.address=this.consumerInfo.address;
            this.signupInfo.userProfile.primaryMobileNo=this.consumerInfo.primaryMobileNo;
            this.signupInfo.userProfile.alternativePhoneNo=this.consumerInfo.alternativePhoneNo;
            this.signupInfo.userProfile.age=this.consumerInfo.age;
            this.signupInfo.userProfile.gender=this.consumerInfo.gender;
            this.signupInfo.userProfile.email=this.consumerInfo.email;
            var isValid = validate(this.consumerInfo);
            if(isValid == true){
            	 $rootScope.loading = true;//spinner
                urlService.post(urlConstants.ADDCONSUMERURL,this.signupInfo).then(function(response){
                	 $rootScope.loading = false;//spinner
                    if (response.data){
                        $scope.success=true;
                        $scope.danger=false;
                        $scope.message=constants.CONSUMER_ADD_SUCCESS;
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
            $scope.close = function(result){
                close(result,500);
            }
            function validate(signupInfo){
                if(validator.isNull(signupInfo.email)){
                    return constants.EMAILREQUIRED;
                }
                return true;
            }
        }
    }]);
});