/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('HolidayCreateCtrl', ['$scope', '$filter', 'UrlService', 'UrlConstants',
        'Constants', '$log','title', 'close', function ($scope, $filter, urlService, urlConstants, constants, $log, title, close) {
            $log.info('Holiday Create Controller');

            var lm = this;
            lm.title=title;
            lm.holidayInfo = {};
            lm.fields = [{"className": "col-md-12","fieldGroup":[{"key":"day","className": "col-sm-6",
        "type": "datepicker",
        "templateOptions": {
            "label": "Date",
            "type": "text",
            "datepickerPopup": "dd-MM-yyyy",
             "required":true
        }
    }, {
        "key": "description",
        "className": "col-sm-6",
        "type": "input",
        "templateOptions": {
            "type": "text",
            "label": "Holiday",
            "required":true
        }
    }]
}, {
    
    "className": "col-md-12",
    "fieldGroup": [{
        "key": "startTime",
        "className": "col-sm-6",
        "type": "timepicker",
        "templateOptions": {
            "label": "Start Time",
             "required":true
        }
    }, {
        "key": "endTime",
        "className": "col-sm-6",
        "type": "timepicker",
        "templateOptions": {
            "label": "End Time",
             "required":true
        }
    }]
}]
      
               
                    //var sTime=lm.holiday.nonWorkingHours.sTime.split(":");
                   // var eTime=lm.holiday.nonWorkingHours.eTime.split(":");
               
           
            
            lm.submit = function () {

                var holiday={};
                holiday.startDay=$filter('date')(lm.holidayInfo.day, "yyyy-MM-dd");
                holiday.description=lm.holidayInfo.description;
                holiday.nonWorkingHours={};

              
                holiday.nonWorkingHours.sTime=$filter('date')(lm.holidayInfo.startTime,"hh:mm:a");
                holiday.nonWorkingHours.eTime=$filter('date')(lm.holidayInfo.endTime,"hh:mm:a");



               
                urlService.post(urlConstants.HOLIDAYSURL,holiday).then(function(response){
                    $scope.success=true;
                    $scope.danger = false;
                    $scope.message=constants.HOLIDAY_CREATE_SUCCESS;
                  
                    lm.holidayInfo={};
                   
               },function (response) {
                	$scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
               });
                    
            }

            $scope.close = function (result) {
                close(result, 500);
            }

        }]);
});