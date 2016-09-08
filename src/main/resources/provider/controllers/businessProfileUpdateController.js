/**ur
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('BusinessProfileUpdateController', ['$scope', '$timeout', '$element', 'UrlService', 'UrlConstants',
        'Constants', '$log','profileInfo','close', 'title',function ($scope, $timeout, $element, urlService, urlConstants, constants, $log, profileInfo, close, title) {
            $log.info('BusinessProfileUpdateController');
            
            var profile = this;
            profile.profileInfo=profileInfo;
            alert("profileInfo-"+JSON.stringify(profileInfo));
           
            profile.profileInfo.serviceSector=profileInfo.serviceSector.id;
            
            profile.title = title;
            var id=profileInfo.id;
           
            urlService.get(urlConstants.GETACCOUNTCONFIG).then(function (result) {
                var serviceSectors = result.data.serviceSectors;

            profile.fields=[
                {"key": "businessName","type": "input","className":"col-md-6","templateOptions": {"type": "text", "label": "Business name","required":true}},
                {"key": "serviceSector", "type": "select", "className":"col-md-6", "templateOptions": {
                        "label": "Service Sector", "ngOptions": "option[to.valueProp] as option in to.options",
                        "options": serviceSectors, "valueProp": "id", "labelProp": "name"}
                },
                {"key": "primaryPhoneNo","type": "input","className":"col-md-6","templateOptions": {"type": "text", "label": "Primary phone","required":true}},
                {"key": "secondaryPhoneNo","type": "input","className":"col-md-6","templateOptions": {"type": "text", "label": "Secondary phone"}},
                {"key": "tertiaryPhoneNo","type": "input","className":"col-md-6","templateOptions": {"type": "text", "label": "Tertiary phone"}},
                {"key": "businessDesc","type": "textarea","className":"col-md-6","templateOptions": {"type": "text", "label": "Business description","required":true}},
                {"key": "email","type": "input","className":"col-md-6","templateOptions": {"type": "text", "label": "Email"}},
                {"key": "place","type": "input","className":"col-md-6","templateOptions": {"type": "text", "label": "Place"}}
             ]
            });  
    	   profile.submit=function(){

               alert(JSON.stringify(profile.profileInfo));
                    urlService.put(urlConstants.ACCOUNTPROFILEURL,profile.profileInfo).then(function (response) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.APM_profile_UPDATE_SUCCESS;
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
	        
        }]);
});