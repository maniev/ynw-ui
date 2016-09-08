/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('BPCreateCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','close','title', '$timeout', '$element','$filter', function ($scope, urlService, urlConstants, constants, $log,close,title, $timeout, $element,$filter) {
            $log.info('Business Profile Create Controller');
            var bp = this;
            $scope.title=title;
            bp.bProfile = {};
            urlService.get(urlConstants.GETACCOUNTCONFIG).then(function (result) {
                serviceSectors = result.data.serviceSectors;
            
                bp.fields=[{"className":"col-md-6","key":"businessName","type":"input","templateOptions":{"type":"text","label":"Business Name","required":true}
                },{"className":"col-md-6", "key": "serviceSector", "type": "select", "templateOptions": {
                        "label": "Service Sector", "ngOptions": "option[to.valueProp] as option in to.options",
                        "options": serviceSectors, "valueProp": "name", "labelProp": "name"}
                },{"className":"col-md-12","key":"businessDesc","type":"textarea","templateOptions":{"rows":"3","label":"Description","required":true}
                },{"className": "col-md-12 section-label","template":"<div><strong><u>Address:</u></strong></div>"},

                {"className":"col-md-6","key":"primaryPhoneNo","type":"input","templateOptions":{"type":"text","label":"Mobile","required":true}},
                {"className":"col-md-6","key":"secondaryPhoneNo","type":"input","templateOptions":{"type":"text","label":"Phone"}},
                {"className":"clearfix","template":"<div></div>"},
                {"className":"col-md-6","key":"email","type":"input","templateOptions":{"type":"text","label":"Email"}},  
                {"className":"col-md-6","key":"Place","type":"input","templateOptions":{"type":"text","label":"Place"}},];

                bp.schfields = [{"className":"col-md-6","key": "sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
                {"className":"col-md-6","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}},
                {"className":"col-md-6","key": "sDate","type":"datepicker","templateOptions": {"type": "text","label": "Start Date","datepickerPopup": "dd-MM-yyyy"}},
                {"className":"col-md-6","key": "eDate","type":"datepicker","templateOptions": {"type": "text","label": "End Date","datepickerPopup": "dd-MM-yyyy"}}]
            
                bp.dmsfields = [{"key": "dates","type":"input","templateOptions": {"type":"text","label": "Enter the Dates","placeholder":"Enter the dates seperated by commas or spaces"}},
                {"className":"col-md-6","key": "sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
                {"className":"col-md-6","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}}]

                bp.dwsfields = [{"className":"col-md-6","key": "sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
                {"className":"col-md-6","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}}]

            });
        
            $scope.selectedDays = [];
            $scope.selectedDaysInWeek = [];
            $scope.daysList = [{"id": 1,"value": "Sun"}, {"id": 2,"value": "Mon"}, {"id": 3,"value": "Tue"},
                {"id": 4,"value": "Wed"},{"id": 5,"value": "Thu"},{"id": 6,"value": "Fri"},{"id": 7,"value": "Sat"}];
            $scope.bpSchedule={};
            $scope.weeklySchedules = [];
            $scope.weeklySchedule = {};
            $scope.weeklySchedule.days = $scope.selectedDays;
            
            $scope.schedules_DOM =[];     
            $scope.schedule_DOM = {};
            
            $scope.schedules_DOW = [];
            $scope.schedule_DOW = {};
            $scope.schedule_DOW.days = $scope.selectedDaysInWeek;
            
            
            function addDaysToSelection(selectedDay){
                var selectedIndex = $scope.selectedDays.indexOf(selectedDay);//checking whether Day already selected
                if (selectedIndex == -1) 
                    $scope.selectedDays.push(selectedDay);
                else
                    $scope.selectedDays.splice(selectedIndex, 1);
            }

            function addDaysToWeekSelection(selectedDay) {
                var selectedIndex = $scope.selectedDaysInWeek.indexOf(selectedDay);//checking whether Day already selected
                if (selectedIndex == -1) 
                    $scope.selectedDaysInWeek.push(selectedDay);
                else
                    $scope.selectedDaysInWeek.splice(selectedIndex, 1);
            }
                       
            function addWeeklySchedule(bProfile) {
                var sTime=$filter('date')(bProfile.sTime, "hh:mm:a");
                var eTime=$filter('date')(bProfile.eTime, "hh:mm:a");
                var sDate=$filter('date')(bProfile.sDate, "yyyy-MM-dd");
                var eDate=$filter('date')(bProfile.eDate, "yyyy-MM-dd");
                $scope.weeklySchedules.push({'schType':$scope.bpSchedule.scheduleType,'days':$scope.selectedDays,'startDate':sDate,'endDate':eDate,'startTime':sTime,'endTime':eTime});
                alert(JSON.stringify($scope.weeklySchedules));
            }

            function removeWeeklySchedule(scheduleIndex) {
                $scope.weeklySchedules.splice(scheduleIndex, 1);
            }

            function addSlot_DOM(bProfile) {
                 var sTime=$filter('date')(bProfile.sTime, "hh:mm:a");
                var eTime=$filter('date')(bProfile.eTime, "hh:mm:a");
                $scope.schedules_DOM.push({'schType':$scope.bpSchedule.scheduleType,'dates':bProfile.dates,'startTime':sTime,'endTime':eTime});
                alert(JSON.stringify($scope.schedules_DOM));
            }

            function addSlot_DOW(bProfile) {
                 var sTime=$filter('date')(bProfile.sTime, "hh:mm:a");
                var eTime=$filter('date')(bProfile.eTime, "hh:mm:a");
                $scope.dwSchedules.push({'schType':$scope.bpSchedule.scheduleType,'days':$scope.selectedDaysInWeek,'startTime':sTime,'endTime':eTime});
                alert(JSON.stringify($scope.dwSchedules));
            }

            function removeSlot_DOM(scheduleIndex) {
                $scope.schedules_DOM.splice(scheduleIndex, 1);
            }

            function removeSlot_DOW(scheduleIndex) {
               $scope.schedules_DOW.splice(scheduleIndex, 1);
            }

            $scope.toggleSelection=addDaysToSelection;
            $scope.toggleSelectionW=addDaysToWeekSelection;
            $scope.addWeeklySchedule = addWeeklySchedule;
            $scope.removeWeeklySchedule=removeWeeklySchedule;
            $scope.addSlot_DOM=addSlot_DOM;
            $scope.addSlot_DOW=addSlot_DOW;
            $scope.removeSlot_DOM=removeSlot_DOM;
            $scope.removeSlot_DOW=removeSlot_DOW;

            bp.submit=function () {
                alert("Mani");
                alert(JSON.stringify(bp.bProfile));
            }
            
        }]);
});