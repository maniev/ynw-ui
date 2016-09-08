/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./addDelayController','./cancelWLController','./communicateWLController'], function (providerModule) {
    return providerModule.controller('ProviderWaitListAllCtrl',['$scope','UrlService','ModalService', function ($scope,urlService,modalService) {
        $scope.waitList = {};
        urlService.get("../provider/data/waitlist.json").then(function(result){
            $scope.waitList = result.data;
        })

        $scope.selectedRows=[];

	    $scope.showFilter=false;
        $scope.filters=[{"name":"Time Period","value":"timePeriod","type":"String"},{"name":"Date","value":"date","type":"Date"},{"name":"Doctor","value":"doctor","type":"String"}];
        $scope.toggleFilter=function () {
            if($scope.showFilter)
                $scope.showFilter=false;
            else
                $scope.showFilter=true;
        }
        $scope.getNotes=function (id) {
            console.log("get Notes");
            $scope.message=null;
            if(id==1)
                $scope.message="Hi I am 1";
            else if(id==2)
                $scope.message= "Hi I am 2";
            return $scope.message;
        }
        $scope.communicateWaitlist = function(waitlistInfo){
            modalService.showModal({
                    templateUrl:"../provider/templates/communicate-wl.html",
                    controller:"CommunicateWLCtrl as cwlc",
                    inputs:{
                        'title':'Communicate',
                        'waitlistInfo':waitlistInfo
                    }
            }).then(function(modal){
                modal.element.modal({backdrop: 'static',keyboard: false });
                modal.close.then(function(result) {

                });
            });
        }
        $scope.doneWL = function(waitlistInfo){
            modalService.showModal({
                    templateUrl:"../provider/templates/cancel-wl.html",
                    controller:"CancelWLCtrl as cwlc",
                    inputs:{
                        'title':'Done',
                        'waitlistInfo':waitlistInfo
                    }
            }).then(function(modal){
                modal.element.modal({backdrop: 'static',keyboard: false });
                modal.close.then(function(result) {

                });
            });
        }
        $scope.changeStatus = function(waitlistInfo){
            modalService.showModal({
                    templateUrl:"../provider/templates/communicate-wl.html",
                    controller:"CommunicateWLCtrl as cwlc",
                    inputs:{
                        'title':'Change Waitlist Status',
                        'waitlistInfo':waitlistInfo
                    }
            }).then(function(modal){
                modal.element.modal({backdrop: 'static',keyboard: false });
                modal.close.then(function(result) {

                });
            });
        }
    }]);
});