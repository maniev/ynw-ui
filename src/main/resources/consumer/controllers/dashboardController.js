/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule','./deleteWLController','./notificationsWLController'], function (consumerModule) {
    return consumerModule.controller('ConsumerDashboardCtrl', ['$scope', '$rootScope','$state', '$location','UrlService', 'ModalService','$log','UrlConstants',
     function ($scope, $rootScope, $state, $location,urlService,modalService,$log,urlConstants) {
        $log.info('Dashboard Controller');
        $rootScope.loading=true;
        $scope.$location=$location;
        $scope.showFilter=false;
        $scope.filters=[{"name":"Time Period","value":"timePeriod","type":"String"}];
        $scope.toggleFilter=function () {
            if($scope.showFilter)
                $scope.showFilter=false;
            else
                $scope.showFilter=true;
        }
        $scope.viewWL=function (id) {
            $location.path('/home/waitlist/'+id);
        }
        $scope.waitList = {};
        urlService.get(urlConstants.WAITLISTURL).then(function(result){
            $scope.waitList = result.data;
        }).finally(function () {
            $rootScope.loading=false;
        })
        $scope.deleteWL=function (wlInfo) {
            modalService.showModal({
                    templateUrl:"../consumer/templates/delete-wl.html",
                    controller:"DeleteWLCtrl as wldc",
                    inputs:{
                        'title':'Cancel',
                        'waitlistInfo':wlInfo
                    }
            }).then(function(modal){
                modal.element.modal({backdrop: 'static',keyboard: false });
                modal.close.then(function(result) {

                });
            });
        }
        $scope.getNotifications=function (wlInfo) {
            modalService.showModal({
                    templateUrl:"../consumer/templates/notifications-wl.html",
                    controller:"NotificationsWLCtrl as wlnc",
                    inputs:{
                        'title':'Notifications',
                        'waitlistInfo':wlInfo
                    }
            }).then(function(modal){
                modal.element.modal({backdrop: 'static',keyboard: false });
                modal.close.then(function(result) {

                });
            });
        }

    }]);
});