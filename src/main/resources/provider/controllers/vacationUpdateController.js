/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('VacationUpdateCtrl', ['$scope', 'UrlService','$filter', 'UrlConstants',
        'Constants', '$log','vacationInfo','title','close', function ($scope, urlService, $filter, urlConstants, constants, $log,vacationInfo, title, close) {
            $log.info('vacations Update Controller');
            var lm = this;
            lm.title=title;
            lm.vacaInfo = vacationInfo;
            urlService.get(urlConstants.PROVIDERSIGNUPURL).then(function(result){
            $scope.stafflist = result.data;
        })
            $scope.selectedId= vacationInfo.providerId;
            lm.fields = [{
                            "className": "col-md-12",
                            "fieldGroup": [
                                {
                                    "key": "startDate",
                                    "type": "datepicker",
                                    "templateOptions": {"label": "Start date", "type": "text", "datepickerPopup": "dd-MM-yyyy"}
                                },
                                {
                                    "key": "sTime",
                                    
                                    "type": "timepicker",
                                    "templateOptions": {"label": "Start time"}
                                },
                                {
                                    "key": "endDate",
                                    
                                    "type": "datepicker",
                                    "templateOptions": {"label": "End date", "type": "text", "datepickerPopup": "dd-MM-yyyy"}
                                },
                                {
                                    "key": "eTime",
                                    
                                    "type": "timepicker",
                                    "templateOptions": {"label": "End time "}
                                }
                            ]
                        }]
            lm.submit = function () {
                 this.newvacaInfo={};
            var timespec={};
            var timing = {};
            timing.sTime = $filter('date')(lm.vacaInfo.sTime, "hh:mm:a");
            if(!timing.sTime){
                timing.sTime=$filter('date')(new Date(), "hh:mm:a");
            }
            timing.eTime = $filter('date')(lm.vacaInfo.eTime, "hh:mm:a");
            if(!timing.eTime){
                timing.eTime=$filter('date')(new Date(), "hh:mm:a");
            }
            timespec.recurringType = "Weekly";
            timespec.repeatIntervals = ["1","7"];
            timespec.startDate = $filter('date')(lm.vacaInfo.startDate, "yyyy-MM-dd");
            if(!timespec.startDate){
                timespec.startDate=$filter('date')(new Date(), "yyyy-MM-dd");
            }
            var terminator = {};
            terminator.endDate = $filter('date')(lm.vacaInfo.endDate, "yyyy-MM-dd");
            if(!terminator.endDate){
                terminator.endDate=$filter('date')(new Date(), "yyyy-MM-dd");
            }
            terminator.noOfOccurance = "";
            timespec.terminator = terminator;
            timespec.timeSlots = [timing];
            /*this.newvacaInfo.providerId = $scope.selectedId;*/
            
            this.newvacaInfo = timespec;
            alert(JSON.stringify(this.newvacaInfo));
            
                urlService.put(urlConstants.VACATIONSURL+"/"+lm.vacaInfo.id,this.newvacaInfo).then(function (response) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.UNAVAILABILITY_UPDATE_SUCCESS;
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