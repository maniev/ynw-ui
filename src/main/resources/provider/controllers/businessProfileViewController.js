/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./businessProfileUpdateController','./BusinessProfileImgUpdateCtrl'], function (providerModule) {
    return providerModule.controller('BusinessProfileViewCtrl', ['$scope', '$rootScope','GenericService','UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService',  function ($scope, $rootScope,genericService, urlService, urlConstants, constants, $log, $stateParams,modalService) {
            var lm = this;
            $log.info('business profile View Controller');
            var id=$stateParams.id;
            var serviceSector;
            lm.options={
                formState: {
                    readOnly: true
                }
            };


            urlService.get(urlConstants.ACCOUNTPROFILEURL).then(function (response) {
                lm.sLInfo=response.data;
                lm.bpInfo = angular.copy(lm.sLInfo);
                    urlService.get(urlConstants.GETACCOUNTCONFIG).then(function (response) {
                        lm.ssInfo=response.data;
                        var serviceStr = getServiceSector(lm.ssInfo.serviceSectors,lm.bpInfo.serviceSector.id);
                        lm.bpInfo.serviceSector=serviceStr;
                    });
                   
            });
            function getServiceSector(ssList,ssid){
                var serviceSector = null;
                angular.forEach(ssList, function(ss){
                    if(ss.id==ssid){
                        serviceSector = ss.name;
                        return false;
                    }
                });
                 return serviceSector;
            }
            lm.fieldsLeft = [
                {"key": "businessName","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Business name"}},
                {"key": "serviceSector","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Service sector"}, hideExpression: "model.serviceSector.id==0"},
                {"key": "primaryPhoneNo","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Primary phone"}},
                {"key": "secondaryPhoneNo","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Secondary phone"}, hideExpression: "model.secondaryPhoneNo==null"},
                {"key": "tertiaryPhoneNo","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Tertiary phone"}, hideExpression: "model.tertiaryPhoneNo==null"}
            ]
            lm.fieldsRight = [
                {"key": "businessDesc","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Business description"}},
                {"key": "email","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Email"}},
                {"key": "place","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Place"}, hideExpression: "model.place==null"}
             ]
            lm.fields2 = [
                {"key": "bSchedule","type": "input","className":"col-md-12","templateOptions": {"type": "text", "label": "Business schedule"}}
            ]
            lm.bpInfo = {};


            $scope.businessSchedule=genericService.getScheduleString($rootScope.businessScheduleP).toString();
            urlService.get(urlConstants.ACCOUNTGALLERYURL).then(function (response) {
                lm.galleryInfo=response.data;
                $log.info("galleryInfo--"+JSON.stringify(lm.galleryInfo));
            });
            
            function updateBasic(){
              modalService.showModal({
              templateUrl:"../provider/templates/basic-update.html",
              width:"30%", 
              controller:"BusinessProfileUpdateController as bp",
              inputs:{
                'profileInfo':lm.sLInfo,
                'title':"Update basic profile info"
              }             
            }).then(function(modal){
                modal.element.modal({backdrop:'static',keyboard:false});
                modal.close.then(function(result){
                urlService.get(urlConstants.ACCOUNTPROFILEURL).then(function (response) {
                lm.sLInfo=response.data;
                    urlService.get(urlConstants.GETACCOUNTCONFIG).then(function (response) {
                        lm.ssInfo=response.data;
                        var serviceStr = getServiceSector(lm.ssInfo.serviceSectors,lm.sLInfo.serviceSector.id);
                        lm.sLInfo.serviceSector=serviceStr;
                    });
                   
            });
            
                $scope.businessSchedule=genericService.getScheduleString($rootScope.businessScheduleP).toString();
                urlService.get(urlConstants.ACCOUNTGALLERYURL).then(function (response) {
                    lm.galleryInfo=response.data;
                    $log.info("galleryInfo--"+JSON.stringify(lm.galleryInfo));
                });
              });
            });
          }

          function updateImages(){
            modalService.showModal({
              templateUrl:"../provider/templates/businessProfImgUpload.html",
              width:"30%", 
              controller:"BusinessProfileImgUpdateCtrl as bp",
              inputs:{
                'profileInfo':lm.sLInfo,
                'title':"Upload images"
              }             
            }).then(function(modal){
                modal.element.modal({backdrop:'static',keyboard:false});
                modal.close.then(function(result){
                urlService.get(urlConstants.ACCOUNTPROFILEURL).then(function (response) {
                lm.sLInfo=response.data;
                    urlService.get(urlConstants.GETACCOUNTCONFIG).then(function (response) {
                        lm.ssInfo=response.data;
                        var serviceStr = getServiceSector(lm.ssInfo.serviceSectors,lm.sLInfo.serviceSector.id);
                        lm.sLInfo.serviceSector=serviceStr;
                    });
                   
            });
            
                $scope.businessSchedule=genericService.getScheduleString($rootScope.businessScheduleP).toString();
                urlService.get(urlConstants.ACCOUNTGALLERYURL).then(function (response) {
                    lm.galleryInfo=response.data;
                    $log.info("galleryInfo--"+JSON.stringify(lm.galleryInfo));
                });
              });
            });  
          }
          $scope.updateImages=updateImages;
         /* function updateBusinessSchedule(){
              modalService.showModal({
              templateUrl:"../provider/templates/businessSchedule-update.html",
              width:"30%", 
              controller:"BusinessProfileUpdateController as dcc",
              inputs:{
                'schedule':$scope.businessSchedule,
                'title':"Update business schedule"
              }             
            }).then(function(modal){
                modal.element.modal({backdrop:'static',keyboard:false});
                modal.close.then(function(result){
                urlService.get(urlConstants.ACCOUNTPROFILEURL).then(function (response) {
                lm.sLInfo=response.data;
                    urlService.get(urlConstants.GETACCOUNTCONFIG).then(function (response) {
                        lm.ssInfo=response.data;
                        var serviceStr = getServiceSector(lm.ssInfo.serviceSectors,lm.sLInfo.serviceSector.id);
                        lm.sLInfo.serviceSector=serviceStr;
                    });
                   
            });
            
                $scope.businessSchedule=genericService.getScheduleString($rootScope.businessScheduleP).toString();
                urlService.get(urlConstants.ACCOUNTGALLERYURL).then(function (response) {
                    lm.galleryInfo=response.data;
                    $log.info("galleryInfo--"+JSON.stringify(lm.galleryInfo));
                });
              });
            });
          }*/
          $scope.updateBasic=updateBasic;
            function updateSL() {
                modalService.showModal({
                    templateUrl: "../provider/templates/sl-create.html",
                    width: "70%",
                    controller: "SLUpdateCtrl as slc",
                    inputs:{
                        sLInfo:angular.copy(lm.sLInfo),
                        title:"Update Service Location"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.SLURL+"/"+id).then(function (response) {
                            lm.sLInfo=response.data;
                        });
                    });
                });
            }
            $scope.updateSL=updateSL;

        }]);
});