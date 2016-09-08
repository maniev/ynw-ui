/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./bpCreateController','./alertsCreateController','./tokenCreateController'], function (providerModule) {
    return providerModule.controller('ProviderHomeCtrl', ['$scope', '$log','$rootScope','$state', '$location', 'UrlService', 'UrlConstants','ModalService',
        function ($scope,$log,$rootScope, $state, $location, urlService, urlConstants,modalService) {
            $log.info('Home controller started');
            $scope.$location = $location;
             urlService.get(urlConstants.ALERTURL).then(function(result){
                $scope.alertList = result.data; 
                   
            })

          $scope.alertList = setInterval(getAlert, 30000);
            function getAlert() {
                urlService.get(urlConstants.ALERTURL).then(function(result){
                $scope.alertList = result.data; 
                    
            })
            }
            
            var accountStatus=$rootScope.activeUser.accStatus;
            if($rootScope.activeUser.accStatus=="Inactive")
                newBProfile();

            function newBProfile() {
                modalService.showModal({
                    templateUrl: "../provider/templates/business-profile-create.html",
                    width: "70%",
                    controller: "BPCreateCtrl as bp",
                    inputs :{
                        title:"Business Profile"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                       
                    });
                });
            }
            /**
            * Method to trigger new customer modal box
            */
            $scope.newcustomer = function(){
                modalService.showModal({
                    templateUrl:"../provider/templates/consumer-create.html",
                    controller:"ConsumerCreateCtrl as pm"
                }).then(function(modal){
                    modal.element.modal({backdrop: 'static',keyboard: false });
                    modal.close.then(function(result) {

                    });
                });
            }
            function createToken() {
                modalService.showModal({
                    templateUrl: "../provider/templates/token-create.html",
                    controller: "TokenCreateCtrl as tc",
                    inputs :{
                        title:"Take Token",
                        width: "50%"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                       
                    });
                });
            }

            $scope.createToken=createToken;
            $scope.alerts = function(){
                modalService.showModal({
                    templateUrl:"../provider/templates/alert-create.html",
                    controller:"AlertsCreateCtrl as pm"
                }).then(function(modal){
                    modal.element.modal({backdrop: 'static',keyboard: false });
                    modal.close.then(function(result) {

                    });
                });
            }
             $scope.ackAlert = function(id,index){
            
                alert("inside ackAlert-"+id);
                    urlService.put(urlConstants.ALERTURL + '/'+ id).then(function(result){
                        $scope.alertList.splice(index, 1);     
                        
                    })   
                      
            }
        }]);
});