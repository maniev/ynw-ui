/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('BPCreateCtrl', ['$scope', '$rootScope','LStore','UrlService', 'UrlConstants','GenericService',
        'Constants', '$log','close','title', '$timeout', '$element','$filter', '$timeout',function ($scope,$rootScope, lStore, urlService, urlConstants,genericService, constants, $log,close,title, $timeout, $element,$filter,$timeout) {
            $log.info('Business Profile Create Controller');
            var bp = this;
            $rootScope.loading = false;//spinner
            bp.CWH=false;//to show/hide custom working hours 
            bp.isBPSaved=true; // to check whether business account is active or not
            bp.title=title;//title of the modal box
            bp.workingHours=[];//
            bp.bProfile = {};//to store the business profile object
            bp.selectedDays = []; //to hold selected days from check box
            $scope.businessSchedule=genericService.getScheduleString($rootScope.businessScheduleP).toString();
            bp.bProfile.bSchedule={};//to store the business profile schedule object
            bp.bSchedule={};
            bp.timeSpecs=[];
            console.log("Status:" + $rootScope.activeUser.accStatus);
            /*input for creating days selection check box*/
            bp.daysList = [{"id": 1,"value": "Sun"}, {"id": 2,"value": "Mon"}, {"id": 3,"value": "Tue"},
                {"id": 4,"value": "Wed"},{"id": 5,"value": "Thu"},{"id": 6,"value": "Fri"},{"id": 7,"value": "Sat"}];
            if($rootScope.activeUser.accStatus!='active')
                bp.isBPSaved=false;
            var businessProfile;
            urlService.get(urlConstants.GETACCOUNTCONFIG).then(function (result) {
                var serviceSectors = result.data.serviceSectors;
            
                bp.fields=[{"className":"col-md-8","key":"businessName","type":"input","templateOptions":{"type":"text","label":"Business Name","required":true}
                },{"className":"col-md-4", "key": "serviceSector", "type": "select", "templateOptions": {
                        "label": "Service Sector", "ngOptions": "option[to.valueProp] as option in to.options",
                        "options": serviceSectors, "valueProp": "name", "labelProp": "name"}
                },{"className":"col-md-12","key":"businessDesc","type":"textarea","templateOptions":{"rows":"3","label":"Description","required":true}
                },{"className": "col-md-12 section-label","template":"<div><strong><u>Contact Info:</u></strong></div>"},
                {"className":"col-md-6","key":"primaryPhoneNo","type":"input","templateOptions":{"type":"text","label":"Mobile","required":true}},
                {"className":"col-md-6","key":"secondaryPhoneNo","type":"input","templateOptions":{"type":"text","label":"Phone"}},
                {"className":"clearfix","template":"<div></div>"},
                {"className":"col-md-6","key":"email","type":"input","templateOptions":{"type":"text","label":"Email"}},  
                {"className":"col-md-6","key":"Place","type":"input","templateOptions":{"type":"text","label":"Place"}}];

                bp.schfields = [{"className":"col-md-6","key": "sTime","type":"timepicker","templateOptions": {"label": "Starting Time"}},
                {"className":"col-md-6","key": "eTime","type":"timepicker","templateOptions": {"label": "Closing Time"}}]
            });
                    
                      
            function daySelectionModified(selectedDay){
                var selectedIndex = bp.selectedDays.indexOf(selectedDay);//checking whether Day already selected
                if (selectedIndex == -1) 
                    bp.selectedDays.push(selectedDay);
                else
                    bp.selectedDays.splice(selectedIndex, 1);
            }

            function setCWH() {
                bp.CWH=true;
            }

            function addTimeSlot(bProfile) {
                var timeSpec={};
                timeSpec.recurringType="Weekly";
                timeSpec.repeatIntervals=bp.selectedDays;
                timeSpec.days=[];
                angular.forEach(bp.selectedDays,function (selIndex) {
                    switch(selIndex){
                        case 1 : timeSpec.days.push("Sun");break;
                        case 2 : timeSpec.days.push("Mon");break;
                        case 3 : timeSpec.days.push("Tue");break;
                        case 4 : timeSpec.days.push("Wed");break;
                        case 5 : timeSpec.days.push("Thu");break;
                        case 6 : timeSpec.days.push("Fri");break;
                        case 7 : timeSpec.days.push("Sat");break;
                    }
                });     
                timeSpec.sTime=$filter('date')(bProfile.sTime, "hh:mm:a");
                timeSpec.eTime=$filter('date')(bProfile.eTime, "hh:mm:a");
                bp.timeSpecs.push(timeSpec);         
                bp.selectedDays=[];
            }
            function removeTimeSlot(scheduleIndex) {
                bp.timeSpecs.splice(scheduleIndex, 1);
            }
            bp.setCWH=setCWH;
            bp.removeTimeSlot = removeTimeSlot;
            bp.addTimeSlot=addTimeSlot;
            bp.daySelectionModified=daySelectionModified;
            bp.submit_exit=function () {
                var timeSpecs=[];
                angular.forEach(bp.timeSpecs,function (timeSpecObj) {
                    var timeSpec = {};
                    timeSpec.recurringType=timeSpecObj.recurringType;
                    timeSpec.repeatIntervals=timeSpecObj.repeatIntervals;
                    timeSpec.startDate=$filter('date')(new Date(), "yyyy-MM-dd");
                    timeSpec.terminator={};
                    timeSpec.timeSlots=[];
                    var timeSlot = {};
                    timeSlot.sTime=timeSpecObj.sTime;
                    timeSlot.eTime=timeSpecObj.eTime;                
                    timeSpec.timeSlots.push(timeSlot);
                    timeSpecs.push(timeSpec);
                });
                bp.bProfile.bSchedule.timespec=timeSpecs;
                if(timeSpecs.length==0)
                    bp.bProfile.bSchedule=null;
                $rootScope.loading = true;//spinner
                urlService.post(urlConstants.ACCOUNTPROFILEURL,bp.bProfile).then(function (result) {
                	 $rootScope.loading = false;//spinner
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.PROFILE_CREATE_SUCCESS;
                    $rootScope.activeUser.accStatus="active";
                    lStore.store('user', JSON.stringify($rootScope.activeUser));
                    bp.isBPSaved=true;
                     $timeout(function () {
                        $scope.success=false;$scope.danger=false;
                      },3000);        
                },function (response) {
                    $scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
                });
            }

            //submit function end
            bp.upload=function () {
                var fd = new FormData();
                console.dir(imageList);
                var propertyList={};
                propertyList.propertiesMap=propertyMap;
                angular.forEach(imageList,function (file,index) {
                    fd.append("files",file);
                })
                console.dir(JSON.stringify(propertyList));
                fd.append('properties', new Blob([JSON.stringify(propertyList)],{type: "application/json"}));
                $rootScope.loading = true;//spinner
                urlService.postImageWithData(urlConstants.ACCOUNTGALLERYURL,fd).then(function(response){
                	 $rootScope.loading = false;//spinner
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.IMAGE_UPLOAD_SUCCESS;
                     $timeout(function () {
                       $element.modal('hide');
                        close(null, 500)},3000);
                },function(response){
                    $scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
                });
            }
            bp.remove=function (imgIndex) {
                $('.preview'+imgIndex).remove();
                $scope.curLen-=1;
                imageList.splice(imgIndex,1);
                propertiesList.splice(imgIndex,1);
            } 
            $scope.length=0;
            $scope.curLen=0;
            var imageList=[];
            var propertyMap=new Object(); 
           $scope.addImages=function () {
                var properties={"caption":"gallery"};                          
                $scope.length+=bp.myFiles.length; 
                angular.forEach(bp.myFiles,function (file) {
                    imageList.push(file);
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(e){     
                        $('.preview'+$scope.curLen).prepend('<img class="thumbnail" src="'+ e.target.result +  '"/>');
                        propertyMap[$scope.curLen]=properties;
                        $scope.curLen+=1;
                    } 
                })
           }
            $scope.range = function(min, max, step){
                step = step || 1;
                var input = [];
                for (var i = min; i < max; i += step) input.push(i);
                return input;
              };
        }]);
});