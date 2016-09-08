/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('SPCreateControl', ['$scope','$rootScope', 'UrlService', 'UrlConstants','GenericService',
        'Constants', '$log','title','close','$filter', function ($scope,$rootScope, urlService, urlConstants, genericService, constants, $log,title,close,$filter) {
            $log.info('Service Provider Create Controller');
            var sp = this;
            $rootScope.loading = false;//spinner
			sp.details={};
			$scope.title=title;
			var businessSchedule;
			$scope.businessSchedule=genericService.getScheduleString($rootScope.businessScheduleP).toString();
			sp.fields =[{"className": "col-md-3","key":"firstName","type":"input","templateOptions":{"type":"text","required": true,"label":"First Name"}}, 
			{"className":"col-md-3","key":"lastName","type": "input","templateOptions":{"type":"text","label":"Last Name"}},
			{"className":"col-md-3","key":"gender","type": "radioType","templateOptions":{"label":"Gender","options":[{"name":"Male","value":"male"},{"name":"Female","value":"female"}]}},
			{"className":"col-md-3","key":"dob","type": "datepicker","templateOptions":{"label":"DOB","type":"text","datepickerPopup":"dd-MMMM-yyyy"}},
			{template:"<div class='clearfix'></div>"},
			{"className":"col-md-3","key":"mobile","type": "input","templateOptions":{"type":"text","required": true,"label":"Mobile"}},
			{"className": "col-md-3","key":"email","type": "input","templateOptions": {"type": "text","required": true,"label": "Email"}},
			{"className":"col-md-6","key":"address","type": "textarea","templateOptions":{"rows":2,"label":"Address"}},
			{template:"<div class='clearfix'></div>"},
			{"className":"col-md-3","key":"availableFrom","type": "datepicker","templateOptions":{"label":"Service Starts From","required": true,"type":"text","datepickerPopup":"dd-MMMM-yyyy"}},
			{"className":"col-md-3","key":"availableTo","type": "datepicker","templateOptions":{"label":"Service Ends On","type":"text","datepickerPopup":"dd-MMMM-yyyy"}},
			{"className":"col-md-3","type":"checkbox","key": "enableOnlineApmt","templateOptions":{"label": "Online Appointments"}},
			{"className":"col-md-3","type":"checkbox","key": "enableLogin","templateOptions": {"label": "Self Login"}}]; 			
			sp.addInfo = [{"className":"col-md-6","key":"qualification","type":"select","templateOptions":{"label":"Highest Educational Qualification","options": [{"name": "Bachelors","value":"Bachelors"},{"name": "Masters","value":"Masters"},{"name": "Doctorate","value":"Doctorate"},{"name": "High School","value":"High School"},{"name":"Diploma","value":"Diploma"},{"name":"Others","value":"Others"}]}},
				{"className": "col-md-6","key": "specialization","type":"input","templateOptions": {"type": "text","label": "Specialization"}},
				{"className": "col-md-6","key": "achievements","type": "textarea","templateOptions": {"rows":4,"label": "Achievements/Notes"}},
				{"className": "col-md-6","key": "languages","type": "ui-select-multiple","templateOptions": {"label":"Languages Known","options": [{"name": "English","value":"english"},{"name": "Malayalam","value":"malayalam"}, {"name": "Tamil","value":"tamil"}, {"name": "Telugu","value":"telugu"}]}},
				{template:"<div class='clearfix col-md-12'><h4 style='font-weight:600;text-decoration:underline'>Public Profile Url</h4></div>"},
				{"key": "facebookUrl","className":"col-md-6","type":"input","templateOptions": {"type": "text","label": "Facebook Url"}},
				{"key": "linkedInUrl","className":"col-md-6","type":"input","templateOptions": {"type": "text","label": "LinkedIn Url"}},
				{"key": "twitterUrl","className":"col-md-6","type":"input","templateOptions": {"type": "text","label": "Twitter Url"}},
				{"key": "webPageUrl","className":"col-md-6","type":"input","templateOptions": {"type": "text","label": "WebPage Url"}}
			]		
			sp.weeklySchFields = [{"className":"col-md-4","key":"sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
            {"className":"col-md-4","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}}]  
            sp.sch_DOM_Fields = [{"key": "dates","type":"input","templateOptions": {"type":"text","label": "Enter the Dates","placeholder":"Enter the dates seperated by commas or spaces"}},
            {"className":"col-md-4","key": "sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
            {"className":"col-md-4","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}}]
            sp.sch_DOW_Fields = [{"className":"col-md-4","key": "sTime","type":"timepicker","templateOptions": {"label": "Start Time"}},
            {"className":"col-md-4","key": "eTime","type":"timepicker","templateOptions": {"label": "End Time"}}]
			$scope.daysList = [{"id": 1,"value": "Sun"}, {"id": 2,"value": "Mon"}, {"id": 3,"value": "Tue"},
                {"id": 4,"value": "Wed"},{"id": 5,"value": "Thu"},{"id": 6,"value": "Fri"},{"id": 7,"value": "Sat"}];
			var assignedServices=[];
			var serviceScheduleList=[];
			$scope.sch ={}
			$scope.sch.scheduleType="Business";
			var customServSchIdList=[];
			sp.submit=function () {
				var spInfo={}
				spInfo.basicInfo=sp.details.basicInfo;
				spInfo.basicInfo.dob=$filter('date')(spInfo.basicInfo.dob,"yyyy-MM-dd");
				spInfo.basicInfo.availableFrom=$filter('date')(spInfo.basicInfo.availableFrom,"yyyy-MM-dd");
				if(spInfo.basicInfo.availableTo)
					spInfo.basicInfo.availableTo=$filter('date')(spInfo.basicInfo.availableTo,"yyyy-MM-dd");
				spInfo.additionalInfo=sp.details.additionalInfo;
				spInfo.assignedservices=assignedServices;	
				spInfo.isAdmin=false;

				var serviceScheduleObj={}
				serviceScheduleObj.services=[];
				serviceScheduleObj.schedule={};
				if(customServSchIdList.length==0)
					serviceScheduleObj.services=assignedServices;
				else {
					angular.forEach(assignedServices,function (serviceId) {
						if(customServSchIdList.indexOf(serviceId)==-1)
							serviceScheduleObj.services.push(serviceId);
					})
				}
				serviceScheduleObj.schType=$scope.sch.scheduleType;
				if($scope.sch.scheduleType=='Business')
					serviceScheduleObj.schedule.timespec=genericService.getScheduleFromBusiness($rootScope.businessScheduleP);
				else
					serviceScheduleObj.schedule.timespec=$scope.timespec;							
				serviceScheduleList.push(serviceScheduleObj);

				spInfo.schedlueWithServices=serviceScheduleList;
				console.log(JSON.stringify(spInfo));	
				 $rootScope.loading = true;//spinner
				urlService.post(urlConstants.SERVICEPROVIDERS,spInfo).then	(function (result) {
					 $rootScope.loading = false;//spinner
					$scope.success = true;
                    $scope.danger = false;
                    $scope.message = "Service Provider created successfully";
				},function (response) {
					console.log(response.data)
					$scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
				})
			}
			
			urlService.get(urlConstants.PROVIDERGETSERVICEBYGROUPURL).then(function(result){
				var grpsServicesMap = result.data;// get map for group and services
				$scope.servicesByGrps=[];
				Object.keys(grpsServicesMap).forEach(function(key){
					var servicesByGrp={};
					urlService.get(urlConstants.PROVIDERSERVICEGROUPURL).then(function(result){
						$scope.groups = result.data;
 					})
					servicesByGrp.groupId=key;
					servicesByGrp.services=grpsServicesMap[key];
					$scope.servicesByGrps.push(servicesByGrp);
				})
			});

			$scope.serviceScheduleL=[];
			$scope.serviceSelect = function(isServiceSelected,service){
			    if(isServiceSelected){
			    	var scheduleWithService={};
			    	scheduleWithService.id=service.id;
			    	scheduleWithService.name=service.name;
			    	if($scope.sch.scheduleType=='Business'){
			    		scheduleWithService.timespec=$rootScope.businessScheduleP;
			    		scheduleWithService.timespecStr=$scope.businessSchedule;
			    	} else {
			    		scheduleWithService.timespec=$scope.timespec;
			    		scheduleWithService.timespecStr=genericService.getScheduleString($scope.timespec).toString();
			    	}	
			    	assignedServices.push(service.id);
			    	$scope.serviceScheduleL.push(scheduleWithService);
			    } else {
			      for(var i=0 ; i < assignedServices.length; i++) {
			        if(assignedServices[i].id == value.id){assignedServices.splice(i,1);$scope.serviceScheduleL.splice(i,1)}
			      }      
			    }
			};

		
			$scope.selectedDays = [];
            $scope.selectedDaysInWeek = [];
            sp.details.weeklySchedule = {};
			
			$scope.weeklySchedules = [];
			$scope.weeklySchedule = {};
			$scope.weeklySchedule.repeatIntervals = $scope.selectedDays;
			$scope.timespec = [];
			$scope.timespecsStr = [];
			
			$scope.timespec_serv_sch = [];
			$scope.timespecsStr_serv_sch = [];
			var selectedServiceId;
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
			function addWeeklySchedule(staffInfo){
				var timeSpec={};   
                timeSpec.recurringType=$scope.sch.customSch;
                var timespecStr=timeSpec.recurringType + " on ";   
                timeSpec.repeatIntervals=$scope.selectedDays;
                timespecStr+=genericService.getRepeatIntervalString(timeSpec.repeatIntervals);
                timeSpec.startDate=$filter('date')(sp.details.basicInfo.availableFrom,"yyyy-MM-dd");;
                timeSpec.terminator = {};
                if(sp.details.basicInfo.availableTo)
            		timeSpec.terminator.endDate = $filter('date')(sp.details.basicInfo.availableTo,"yyyy-MM-dd");
            	timeSpec.terminator.noOfOccurance = 0;
                timeSpec.timeSlots=[];
                var timeslot={};
                timeslot.sTime=$filter('date')(staffInfo.sTime, "hh:mm:a");
                timeslot.eTime=$filter('date')(staffInfo.eTime, "hh:mm:a");
                timespecStr+=" " + timeslot.sTime + " to " + timeslot.eTime;
                timeSpec.timeSlots.push(timeslot);
                $scope.timespecsStr.push(timespecStr);
                $scope.timespec.push(timeSpec);   
                $scope.selectedDays=[];
			}
			function removeWeeklySchedule(index){
				$scope.timespec.splice(index, 1);
				$scope.timespecsStr.splice(index,1);
			}
			function addSlot_DOM(staffInfo){
				var timeSpec={};
				timeSpec.recurringType=$scope.sch.customSch;
				var timespecStr=timeSpec.recurringType + " on ";                
                timeSpec.repeatIntervals=staffInfo.dates.split(",");
                console.log(timeSpec.repeatIntervals );
                timeSpec.startDate = $filter('date')(sp.details.basicInfo.availableFrom,"yyyy-MM-dd");
                timeSpec.terminator = {};
                if(sp.details.basicInfo.availableTo)
            		timeSpec.terminator.endDate = $filter('date')(sp.details.basicInfo.availableTo,"yyyy-MM-dd");
            	timeSpec.terminator.noOfOccurance = 0;
                timeSpec.timeSlots=[];
                var timeslot={};
                timeslot.sTime=$filter('date')(staffInfo.sTime, "hh:mm:a");
                timeslot.eTime=$filter('date')(staffInfo.eTime, "hh:mm:a");
                timespecStr+=" " + timeslot.sTime + " to " + timeslot.eTime;
                timeSpec.timeSlots.push(timeslot);
 
				$scope.timespecsStr.push(timespecStr);
                $scope.timespec.push(timeSpec);  
			}
			function addSlot_DOW(staffInfo){
				var timeSpec={};
				timeSpec.recurringType=$scope.sch.customSch;
				var timespecStr=timeSpec.recurringType + " on ";   
				timeSpec.repeatIntervals=[];
				angular.forEach($scope.selectedDaysInWeek,function (day) {
					timeSpec.repeatIntervals.push(day+"("+staffInfo.repeatNo+")");
				})
                console.log(timeSpec.repeatIntervals+ ":RNo.:"+staffInfo.repeatNo);
                timespecStr+=timeSpec.repeatIntervals.toString(); 
                timeSpec.startDate = $filter('date')(sp.details.basicInfo.availableFrom,"yyyy-MM-dd");
                timeSpec.terminator = {};
                if(sp.details.basicInfo.availableTo)
            		timeSpec.terminator.endDate = $filter('date')(sp.details.basicInfo.availableTo,"yyyy-MM-dd");
            	timeSpec.terminator.noOfOccurance=0;
                timeSpec.timeSlots=[];
                var timeslot={};
                timeslot.sTime=$filter('date')(staffInfo.sTime, "hh:mm:a");
                timeslot.eTime=$filter('date')(staffInfo.eTime, "hh:mm:a");
                timespecStr+=" " + timeslot.sTime + " to " + timeslot.eTime;
                timeSpec.timeSlots.push(timeslot);


				$scope.timespecsStr.push(timespecStr);
                $scope.timespec.push(timeSpec);         
                $scope.selectedDaysInWeek=[];
			}

			/*Service Schedule Section*/

			function selectedServiceSchedule(serviceId) {
				$scope.isServiceScheduleSelected=true;
				selectedServiceId=serviceId;			
			}

			function addWeeklyServiceSchedule(staffInfo){
				console.log("In Add weekly service schedule");
				var timeSpec={};   
                timeSpec.recurringType=$scope.sch.customSch;
                var timespecStr=timeSpec.recurringType + " on ";   
                timeSpec.repeatIntervals=$scope.selectedDays;
                timespecStr+=genericService.getRepeatIntervalString(timeSpec.repeatIntervals);
                timeSpec.startDate=$filter('date')(sp.details.basicInfo.availableFrom,"yyyy-MM-dd");;
                timeSpec.terminator = {};
                if(sp.details.basicInfo.availableTo)
            		timeSpec.terminator.endDate = $filter('date')(sp.details.basicInfo.availableTo,"yyyy-MM-dd");
            	timeSpec.terminator.noOfOccurance=0;
                timeSpec.timeSlots=[];
                var timeslot={};
                timeslot.sTime=$filter('date')(staffInfo.sTime, "hh:mm:a");
                timeslot.eTime=$filter('date')(staffInfo.eTime, "hh:mm:a");
                timespecStr+=" " + timeslot.sTime + " to " + timeslot.eTime;
                timeSpec.timeSlots.push(timeslot);
                
                $scope.timespecsStr_serv_sch.push(timespecStr);
                $scope.timespec_serv_sch.push(timeSpec);   


                $scope.selectedDays=[];
			}
			function removeWeeklyServiceSchedule(index){
				$scope.timespec_serv_sch.splice(index, 1);
				$scope.timespecsStr_serv_sch.splice(index,1);
			}
			function addService_Slot_DOM(staffInfo){
				var timeSpec={};
				timeSpec.recurringType=$scope.sch.customSch;
				var timespecStr=timeSpec.recurringType + " on ";                
                timeSpec.repeatIntervals=staffInfo.dates.split(",");
                console.log(timeSpec.repeatIntervals );
                timeSpec.startDate = $filter('date')(sp.details.basicInfo.availableFrom,"yyyy-MM-dd");
                timeSpec.terminator = {};
                if(sp.details.basicInfo.availableTo)
            		timeSpec.terminator.endDate = $filter('date')(sp.details.basicInfo.availableTo,"yyyy-MM-dd");
            	timeSpec.terminator.noOfOccurance=0;
                timeSpec.timeSlots=[];
                var timeslot={};
                timeslot.sTime=$filter('date')(staffInfo.sTime, "hh:mm:a");
                timeslot.eTime=$filter('date')(staffInfo.eTime, "hh:mm:a");
                timespecStr+=" " + timeslot.sTime + " to " + timeslot.eTime;
                timeSpec.timeSlots.push(timeslot);
 
				$scope.timespecsStr_serv_sch.push(timespecStr);
                $scope.timespec_serv_sch.push(timeSpec);  
			}
			function addService_Slot_DOW(staffInfo){
				var timeSpec={};
				timeSpec.recurringType=$scope.sch.customSch;
				var timespecStr=timeSpec.recurringType + " on ";   
				timeSpec.repeatIntervals=[];
				console.log($scope.selectedDaysInWeek);
				angular.forEach($scope.selectedDaysInWeek,function (day) {
					timeSpec.repeatIntervals.push(day+"("+staffInfo.repeatNo+")");
				})
                console.log(timeSpec.repeatIntervals+ ":RNo.:"+staffInfo.repeatNo);
                timespecStr+=timeSpec.repeatIntervals.toString(); 
                timeSpec.startDate = $filter('date')(sp.details.basicInfo.availableFrom,"yyyy-MM-dd");
                timeSpec.terminator = {};
                if(sp.details.basicInfo.availableTo)
            		timeSpec.terminator.endDate = $filter('date')(sp.details.basicInfo.availableTo,"yyyy-MM-dd");
            	timeSpec.terminator.noOfOccurance=0;
                timeSpec.timeSlots=[];
                var timeslot={};
                timeslot.sTime=$filter('date')(staffInfo.sTime, "hh:mm:a");
                timeslot.eTime=$filter('date')(staffInfo.eTime, "hh:mm:a");
                timespecStr+=" " + timeslot.sTime + " to " + timeslot.eTime;
                timeSpec.timeSlots.push(timeslot);


				$scope.timespecsStr_serv_sch.push(timespecStr);
                $scope.timespec_serv_sch.push(timeSpec);         
                $scope.selectedDaysInWeek=[];
			}

			function doneServiceSchedule() {
				console.log(JSON.stringify($scope.timespec_serv_sch));
				if($scope.timespec_serv_sch.length>0){
					customServSchIdList.push(selectedServiceId);
					var serviceScheduleObj={}
					serviceScheduleObj.schedule={};
					serviceScheduleObj.schedule.timespec=$scope.timespec_serv_sch;
					serviceScheduleObj.services=[];
					serviceScheduleObj.services.push(selectedServiceId);
					serviceScheduleObj.schType="ServiceSpecific";
					serviceScheduleList.push(serviceScheduleObj);
				}
				$scope.timespec_serv_sch=[];
				$scope.timespecsStr_serv_sch=[];
				selectedServiceId=null;
				$scope.isServiceScheduleSelected=false;
			}

			/*Service Schedule Section ends here*/


			$scope.close = function (result) {
                close(result, 500);
            }
			$scope.addDaysToSelection=addDaysToSelection;
            $scope.addDaysToWeekSelection=addDaysToWeekSelection;
            $scope.addWeeklySchedule = addWeeklySchedule;
            $scope.removeWeeklySchedule = removeWeeklySchedule;
            $scope.addSlot_DOM=addSlot_DOM;
            $scope.addSlot_DOW=addSlot_DOW;
			$scope.addWeeklyServiceSchedule=addWeeklyServiceSchedule;
            $scope.selectedServiceSchedule=selectedServiceSchedule;
            $scope.removeWeeklyServiceSchedule = removeWeeklyServiceSchedule;
			$scope.addService_Slot_DOM=addService_Slot_DOM;
            $scope.addService_Slot_DOW=addService_Slot_DOW;
            $scope.doneServiceSchedule=doneServiceSchedule;
			$scope.assignedServices=assignedServices;
        }]);
});