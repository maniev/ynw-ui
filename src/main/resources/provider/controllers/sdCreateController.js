/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('SDCreateCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','close','$filter', function ($scope, urlService, urlConstants, constants, $log,close,$filter) {
            $log.info('Discount Schedule Create Controller');
            
            var sd=this;
			sd.sDiscount={};
			var discountlist;
			urlService.get(urlConstants.DISCOUNTURL).then(function(result){
				discountlist = result.data;
				sd.fields = [{"className":"col-md-6","key":"discount","type":"select","templateOptions":{"label":"Select Discount","ngOptions": "option[to.valueProp] as option in to.options","options":discountlist,
	                "valueProp":"id","labelProp":"name"}}]
            })
            sd.weeklySchFields = [{"className":"col-md-6","key":"sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
            {"className":"col-md-6","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}},
            {"className":"col-md-6","key": "sDate","type":"datepicker","templateOptions": {"type": "text","label": "Start Date","datepickerPopup": "dd-MM-yyyy"}},
            {"className":"col-md-6","key": "eDate","type":"datepicker","templateOptions": {"type": "text","label": "End Date","datepickerPopup": "dd-MM-yyyy"}}]
            
            sd.sch_DOM_Fields = [{"key": "dates","type":"input","templateOptions": {"type":"text","label": "Enter the Dates","placeholder":"Enter the dates seperated by commas or spaces"}},
            {"className":"col-md-6","key": "sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
            {"className":"col-md-6","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}}]

            sd.sch_DOW_Fields = [{"className":"col-md-6","key": "sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
            {"className":"col-md-6","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}}]

            $scope.selectedDays = [];
            $scope.selectedDaysInWeek = [];
            $scope.daysList = [{"id":1,"value":"Mon"},{"id":2,"value":"Tue"},{"id":3,"value": "Wed"},{"id":4,"value":"Thu"},{"id":5,"value":"Fri"},{"id":6,"value":"Sat"}];
			
			sd.sDiscount.weeklySchedule = {};
			$scope.weeklySchedules = [];
			$scope.weeklySchedule = {};
			$scope.weeklySchedule.repeatIntervals = $scope.selectedDays;
			$scope.timespec = [];
			
			$scope.schedules_DOM = [];
			$scope.schedule_DOM = {};

			$scope.schedules_DOW = [];
			$scope.schedule_DOW = {};
			$scope.schedule_DOW.repeatIntervals = $scope.selectedDaysInWeek;

			function addDaysToSelection(selectedDay){
				var selectedIndex = $scope.selectedDays.indexOf(selectedDay);//checking whether Day already selected
				if (selectedIndex == -1)
				  $scope.selectedDays.push(selectedDay);
				else 
				  $scope.selectedDays.splice(selectedIndex, 1);
			}

			function addDaysToWeekSelection(selectedDay){
				var selectedIndex = $scope.selectedDaysInWeek.indexOf(selectedDay);//checking whether Day already selected
				if (selectedIndex == -1)
				  $scope.selectedDaysInWeek.push(selectedDay);
				else
				  $scope.selectedDaysInWeek.splice(selectedIndex, 1);
			}

			function addWeeklySchedule(sDiscount){
				var timeSpec={};
                timeSpec.recurringType=$scope.sch.customSch;
                timeSpec.repeatIntervals=$scope.selectedDays;
                timeSpec.startDate = $filter('date')(sDiscount.sDate,"yyyy-MM-dd");
                timeSpec.terminator = {};
                timeSpec.terminator.endDate = $filter('date')(sDiscount.eDate,"yyyy-MM-dd");
                timeSpec.terminator.noOfOccurance = 1;
                timeSpec.sTime=$filter('date')(sDiscount.sTime, "hh:mm:a");
                timeSpec.eTime=$filter('date')(sDiscount.eTime, "hh:mm:a");
                $scope.timespec.push(timeSpec); 
                alert(JSON.stringify($scope.timespec));        
                $scope.selectedDays=[];
			}
			function removeWeeklySchedule(index){
				$scope.timespec.splice(index, 1);
			}
			
			function addSlot_DOM(staffInfo){
				var sTime=$filter('date')(sd.staffInfo.sTime, "hh:mm:a");
                var eTime=$filter('date')(sd.staffInfo.eTime, "hh:mm:a");
				$scope.schedules_DOM.push({'schType':$scope.sch.customSch,'dates':sd.staffInfo.dates,'startTime':sTime,'endTime':eTime});
				alert(JSON.stringify($scope.schedules_D));
			}
			function removeSlot_DOM(index){
				$scope.schedules_DOM.splice(index, 1);
			}
			
			function addSlot_DOW(sDiscount){
				var timeSpec={};
                timeSpec.recurringType=$scope.sch.customSch;
                timeSpec.repeatIntervals=$scope.selectedDaysInWeek;
                timeSpec.sTime=$filter('date')(sDiscount.sTime, "hh:mm:a");
                timeSpec.eTime=$filter('date')(sDiscount.eTime, "hh:mm:a");
                $scope.timespec.push(timeSpec); 
                alert(JSON.stringify($scope.timespec));        
                $scope.selectedDaysInWeek=[];
			}
			function removeSlot_DOW(index){
				$scope.timespec.splice(index, 1);
			}

			$scope.close = function (result) {
                close(result, 500);
            }

            $scope.addDaysToSelection=addDaysToSelection;
            $scope.addDaysToWeekSelection=addDaysToWeekSelection;
            $scope.addWeeklySchedule = addWeeklySchedule;
            $scope.removeWeeklySchedule = removeWeeklySchedule;
            $scope.addSlot_DOM=addSlot_DOM;
            $scope.addSlot_DOW=addSlot_DOW;
            $scope.removeSlot_DOM=removeSlot_DOM;
            $scope.removeSlot_DOW=removeSlot_DOW;
        }]);
});