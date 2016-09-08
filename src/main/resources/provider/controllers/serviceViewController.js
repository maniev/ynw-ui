/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./serviceUpdateController'], function (providerModule) {
    return providerModule.controller('ServiceViewCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService','$filter' , function ($scope, urlService, urlConstants, constants, $log, $stateParams,modalService,$filter) {
            var lm = this;
            $log.info('Service View Controller');
            var id=$stateParams.id;
            lm.options={
                formState: {
                    readOnly: true
                }
            };
             lm.fields = [
                {"key":"description","type":"input","className":"col-md-6","templateOptions":{"type":"text","label":"Description"}},
                {"key":"appmtDuration","type":"input","className":"col-md-3","templateOptions":{"type":"text","label":"Service Duration (in mins)"}},
                {"key":"maxCustomers","type":"input","className":"col-md-3","templateOptions":{"type":"text","label":"No of customers at a time"}}];
            

            var serviceloclist;
            lm.serviceInfo = {};

            urlService.get(urlConstants.SLURL).then(function(result){
                locations=result.data;
                urlService.get(urlConstants.PROVIDERSERVICEURL+"/"+id).then(function (response) {
                    lm.serviceInfo = response.data;
                    var locationsStr=getLocationsString(locations, lm.serviceInfo.locations);
                    lm.serviceInfo.locations=locationsStr;
                })
            });

            function getLocationsString (locationObjs, locationIds) {
                var tmpLocations="";
                angular.forEach(locationIds, function  (locationId) {
                    angular.forEach(locationObjs,function  (locationObj) {
                        if(locationObj.id==locationId){
                            if(tmpLocations=="")
                                tmpLocations=locationObj.location;
                            else
                                tmpLocations+=", " + locationObj.location;
                            return false;
                        }
                    })
                })
                return tmpLocations;
            }

            function updateService() {
                modalService.showModal({
                    templateUrl: "../provider/templates/service-create.html",
                    width: "70%",
                    controller: "ServiceUpdateCtrl as sc",
                    inputs:{
                        serviceInfo:angular.copy(lm.serviceInfo),
                        title:"Update Service"
                    } 
                
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.PROVIDERSERVICEURL+"/"+id).then(function (response) {
                            lm.serviceInfo=response.data;
                            var locationsStr=getLocationsString(locations, lm.serviceInfo.locations);
                            lm.serviceInfo.locations=locationsStr;
                        });
                    });
                });
            }
            $scope.updateService=updateService;
        }]);
});