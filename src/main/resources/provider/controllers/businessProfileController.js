/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('BusinessProfileCtrl', ['$scope', 'UrlService', 'UrlConstants', '$log', 'LStore',
        function ($scope, urlService, urlConstants, $log, lStore) {
            var bp = this;
            bp.bprofileInfo = {};
            $log.info('Business Profile Started');
           // var activeProvider = JSON.parse(lStore.get('user'));
            urlService.get('../provider/data/provider-form.json').then(function (result) {
                bp.fields = result.data;
            })
           /* urlService.get(urlConstants.ACCOUNTPROFILEURL).then(function (result) {
                $scope.description = result.data.businessDesc;
                bp.profileInfo = result.data;
                bp.profileInfo.email = activeProvider.email;
                bp.profileInfo.primaryMobileNo = activeProvider.primaryMobileNo;
                bp.gallery = result.data.gallery;
                bp.submit = function (profileInfo) {
                    this.profileUp = {};
                    this.profileUp.businessName = this.profileInfo.businessName;
                    this.profileUp.address = this.profileInfo.address;
                    this.profileUp.place = this.profileInfo.place;
                    var providers = [];
                    providers.push(activeProvider);
                    this.profileUp.providers = providers;
                    this.profileUp.serviceSector = this.profileInfo.serviceSector;
                    this.profileUp.serviceSubSector = this.profileInfo.serviceSubSector;
                    this.profileUp.licence = this.profileInfo.licence;
                    this.profileUp.bSchedule = this.profileInfo.bSchedule;
                    alert(JSON.stringify(this.profileUp));
                    $scope.loading = true;
                    urlService.put(urlConstants.ACCOUNTPROFILEURL, this.profileUp).then(function (response) {
                        alert("Business profile updated successfully!");
                        $scope.loading = false;
                    })
                }
            })*/
            bp.updateDescription = function (description) {
                var busDesc = {};
                busDesc.businessDesc = description;
                $scope.loading = true;
                urlService.put(urlConstants.ACCOUNTDESCURL, busDesc).then(function (response) {
                    alert("Business description updated successfully!");
                    $scope.loading = false;
                })
            }
            bp.remove = function (imageUrl, index) {
                var imageName = imageUrl.substr((imageUrl.lastIndexOf("/") + 1), imageUrl.length);
                if ($window.confirm("Do you Want to Confirm?")) {
                    urlService.deleteR(urlConstants.ACCOUNTGALLERYDELURL + imageName).then(function (response) {
                        bp.gallery.splice(index, 1);
                    })
                }

            }
        }]);
});