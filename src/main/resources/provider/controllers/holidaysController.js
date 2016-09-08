/**	
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./holidayCreateController'], function (providerModule) {
    return providerModule.controller('HolidaysCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', 'ModalService','$filter', function ($scope, urlService, urlConstants, constants, $log, modalService,$filter) {
            $log.info('Holidays List Controller');
            $scope.holidays = [];
            urlService.get(urlConstants.HOLIDAYSURL).then(function (result) {
                var tempVcList = result.data;
                angular.forEach(tempVcList, function (vc) {
                    vc.startDay = $filter('date')(vc.startDay, "dd-MM-yyyy");
                    $scope.holidays.push(vc);      
                })
                $scope.holidays =tempVcList;  
            })
            function newHoliday() {
                modalService.showModal({
                    templateUrl: "../provider/templates/holiday-create.html",
                    width: "70%",
                    controller: "HolidayCreateCtrl as hcc",
                    inputs :{
                        title:"Create Holiday"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.HOLIDAYSURL).then(function (result) {
                            $scope.holidays = result.data;
                        })
                    });
                });
            }
            function deleteHoliday(id,index) {
                var status = confirm("Do you want to delete this holiday? : " + id);
                if(status){
                    urlService.deleteR(urlConstants.HOLIDAYSURL+"/"+id).then(function (result) {
                        $scope.holidays.splice(index,1);
                        alert("Holiday deleted");
                    })   
                }
            } 
			$scope.createHoliday = newHoliday;
            $scope.deleteHoliday = deleteHoliday;
        }]);
});