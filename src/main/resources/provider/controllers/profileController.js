/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ProviderProfileCtrl', ['$scope','$rootScope', '$location', 'UrlService', 'UrlConstants', 'LStore', 'Auth', function ($scope, $rootScope,$location, urlService, urlConstants, lStore, Auth) {
        var cprofile = this;
        alert(JSON.stringify($rootScope.activeUser));
        cprofile.profileInfo = $rootScope.activeUser;
        cprofile.fields = [{
            "className": "col-md-12",
            "key": "firstName",
            "type": "input",
            "templateOptions": {"type": "text", "label": "First Name", "required": true}
        },
            {
                "className": "col-md-12",
                "key": "lastName",
                "type": "input",
                "templateOptions": {"type": "text", "label": "Last Name", "required": true}
            },
            {
                "className": "col-md-12",
                "key": "address",
                "type": "input",
                "templateOptions": {"type": "text", "label": "Address", "required": true}
            },
            {
                "className": "col-md-6",
                "key": "primaryMobileNo",
                "type": "input",
                "templateOptions": {"type": "text", "label": "Mobile", "required": true}
            },
            {
                "className": "col-md-6",
                "key": "alternativePhoneNo",
                "type": "input",
                "templateOptions": {"type": "text", "label": "Landline No.", "required": true}
            },
            {
                "className": "col-md-6",
                "key": "gender",
                "type": "radioType",
                "templateOptions": {
                    "label": "Gender",
                    "options": [{"name": "Male", "value": "male"}, {"name": "Female", "value": "female"}]
                }
            },
            {
                "className": "col-md-6",
                "key": "age",
                "type": "input",
                "templateOptions": {"type": "text", "label": "Age"}
            },
            {
                "className": "col-md-12",
                "key": "email",
                "type": "input",
                "templateOptions": {"type": "email", "label": "Email", "required": true}
            }]

        cprofile.submit = function (profileInfo) {
            this.profileUpInfo = {};
            this.profileUpInfo.firstName = this.profileInfo.firstName;
            this.profileUpInfo.lastName = this.profileInfo.lastName;
            this.profileUpInfo.email = this.profileInfo.email;
            this.profileUpInfo.primaryMobileNo = this.profileInfo.primaryMobileNo;
            this.profileUpInfo.address = this.profileInfo.address;
            this.profileUpInfo.alternativePhoneNo = this.profileInfo.alternativePhoneNo;
            this.profileUpInfo.age = this.profileInfo.age;
            this.profileUpInfo.gender = this.profileInfo.gender;
            alert(JSON.stringify(this.profileUpInfo));
            urlService.patch(urlConstants.PROVIDERPROFILEURL, this.profileUpInfo).then(function (response) {
                if (response.data) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = "Profile updated successfully";
                    $timeout(function () {
                        $element.modal('hide');
                        close(null, 500)
                    }, 2000);
                } else {
                    $scope.danger = true;
                    $scope.success = false;
                    $scope.message = response.data;
                }
            }, function (response) {
                if (!response.data.$valid) {
                    alert(JSON.stringify(response.data));
                }
            })
        }
    }]);
});