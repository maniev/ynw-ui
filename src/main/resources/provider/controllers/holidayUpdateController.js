/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('HolidayUpdateCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','$filter','holiday','title','close', function ($scope, urlService, urlConstants, constants, $log, $filter, holiday,title,close) {
            $log.info('Labels Update Controller');
            var lm = this;
            lm.title=title;
            lm.holiday = holiday;
            lm.holidayInfo={};
            lm.holidayInfo.day=holiday.startDay;
            lm.holidayInfo.description=holiday.description;
            var startTime=holiday.nonWorkingHours.sTime.split(":");
            var startDate= new Date();
            var endDate=new Date();
            startDate.setHours(startTime[0]);
            startDate.setMinutes(startTime[1]);
            var endTime = holiday.nonWorkingHours.eTime.split(":");
            endDate.setHours(endTime[0]);
            endDate.setMinutes(endTime[1]);
            lm.holidayInfo.startTime=startDate;
            lm.holidayInfo.endTime=endDate;
            
            lm.fields = [
                {
                    "className": "col-md-12",
                    "fieldGroup": [
                        {
                            "key": "day",
                            "className": "col-sm-6",
                            "type": "datepicker",
                            "templateOptions": {"label": "Date", "type": "text", "datepickerPopup": "dd-MM-yyyy"}
                        },
                        {
                            "key": "description",
                            "className": "col-sm-6",
                            "type": "input",
                            "templateOptions": {"type": "text", "label": "Holiday"}
                        }
                    ]
                },
                {
                    "className": "col-md-12",
                    "fieldGroup": [
                        {
                            "key": "startTime",
                            "className": "col-sm-6",
                            "type": "timepicker",
                            "templateOptions": {"label": "Start Time"}
                        },
                        {
                            "key": "endTime",
                            "className": "col-sm-6",
                            "type": "timepicker",
                            "templateOptions": {"label": "End Time"}
                        }
                    ]
                }
            ]
            lm.submit = function () {
                var holiday={};
                holiday.startDay=$filter('date')(lm.holidayInfo.day, "yyyy-MM-dd");
                holiday.description=lm.holidayInfo.description;
                holiday.nonWorkingHours={};
                holiday.nonWorkingHours.sTime=$filter('date')(lm.holidayInfo.startTime, "hh:mm:a");
                holiday.nonWorkingHours.eTime=$filter('date')(lm.holidayInfo.endTime, "hh:mm:a");
                alert(JSON.stringify(holiday));
                urlService.put(urlConstants.HOLIDAYSURL+"/"+lm.holiday.id, holiday).then(function (response) {
                    
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.HOLIDAY_UPDATE_SUCCESS;

                }, function (response) {
                    if (response.data.$valid) {
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.message = response.data;
                    }
                });
            }

            $scope.close = function (result) {
                close(result, 500);
            }

        }]);
});