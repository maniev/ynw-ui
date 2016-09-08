/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./holidayUpdateController'], function (providerModule) {
    return providerModule.controller('HolidayViewCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService','$filter', function ($scope, urlService, urlConstants, constants, $log, $stateParams,modalService,$filter) {
            var lm=this;
            $log.info('Holidays View Controller');
            
            var id=$stateParams.id;
            lm.options={
                formState: {
                    readOnly: true
                }
            };
            lm.fields = [
                {"key": "day","className": "col-sm-4","type": "input",
                 "templateOptions": {"label": "Date and Time", "type": "text"}
                },
                {"key": "description","className": "col-sm-8","type": "input",
                 "templateOptions": {"label": "Holiday", "type": "text"}
                }
            ]
            lm.holidayInfo={};
            lm.holiday = {};
            alert(urlConstants.HOLIDAYSURL+"/"+id);
            urlService.get(urlConstants.HOLIDAYSURL+"/"+id).then(function (response) {
                lm.holiday=response.data;
              
                lm.holidayInfo.description=lm.holiday.description;

                    var sTime=lm.holiday.nonWorkingHours.sTime.split(":");
                    var eTime=lm.holiday.nonWorkingHours.eTime.split(":");
                    lm.holidayInfo.day=$filter('date')(lm.holiday.startDay,"dd-MM-yyyy") +","+ sTime[0] + ":" + sTime[1] + " " +sTime[2] +"-" + eTime[0] + ":" + eTime[1] + " " +eTime[2] ;
              
               
              

                
            });
            
            function updateHoliday() {
                modalService.showModal({
                    templateUrl: "../provider/templates/holiday-create.html",
                    width: "70%",
                    controller: "HolidayUpdateCtrl as hcc",
                    inputs:{
                        holiday:angular.copy(lm.holiday),
                        title:"Update Holiday"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.HOLIDAYSURL+"/"+lm.holiday.id).then(function (response) {
                            lm.holiday=response.data;
                            lm.holidayInfo.description=lm.holiday.description;

                    var sTime=lm.holiday.nonWorkingHours.sTime.split(":");
                    var eTime=lm.holiday.nonWorkingHours.eTime.split(":");
                    lm.holidayInfo.day=$filter('date')(lm.holiday.startDay,"dd-MM-yyyy") +","+ sTime[0] + ":" + sTime[1] + " " +sTime[2] +"-" + eTime[0] + ":" + eTime[1] + " " +eTime[2] ;
                        });
                    });
                });
            }
            $scope.updateHoliday=updateHoliday;
        }]);
});