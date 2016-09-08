/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('VacationCreateCtrl', ['$scope', '$rootScope', 'Validator','$filter','UrlService', 'UrlConstants',
        'Constants', '$log','close','title', function ($scope, $rootScope, validator,$filter, urlService, urlConstants, constants, $log,close,title) {
            $log.info('Vacations Create Controller');
            var vaca=this;
            vaca.title=title;
            vaca.vacaInfo={};
            //alert("inside create contrl");
            urlService.get(urlConstants.PROVIDERSIGNUPURL).then(function(result){
            $scope.stafflist = result.data;
             //alert("stafflist--"+JSON.stringify($scope.stafflist));

        })
           vaca.fields = [{
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
        vaca.submit=function(vacaInfo){
            //alert("inside submit");
            this.newvacaInfo={};
            var timespec={};
            var timing = {};
            timing.sTime = $filter('date')(this.vacaInfo.sTime, "hh:mm:a");
            if(!timing.sTime){
                timing.sTime=$filter('date')(new Date(), "hh:mm:a");
            }
            timing.eTime = $filter('date')(this.vacaInfo.eTime, "hh:mm:a");
            if(!timing.eTime){
                timing.eTime=$filter('date')(new Date(), "hh:mm:a");
            }
            timespec.recurringType = "Monthly";
            timespec.repeatIntervals = ["4","5","10"];
            timespec.startDate = $filter('date')(this.vacaInfo.startDate, "yyyy-MM-dd");
            if(!timespec.startDate){
                timespec.startDate=$filter('date')(new Date(), "yyyy-MM-dd");
            }
            var terminator = {};
            terminator.endDate = $filter('date')(this.vacaInfo.endDate, "yyyy-MM-dd");
            if(!terminator.endDate){
                terminator.endDate=$filter('date')(new Date(), "yyyy-MM-dd");
            }
            terminator.noOfOccurance = "";
            timespec.terminator = terminator;
            timespec.timeSlots = [timing];
            /*this.newvacaInfo.providerId = $scope.selectedId;*/

            this.newvacaInfo.providerId =  $rootScope.activeUser.id;
            //console.log(this.newvacaInfo.providerId);
            this.newvacaInfo.timespec = timespec;
            //alert(JSON.stringify(this.vacaInfo));

             var isValid = validate(this.vacaInfo);
             //alert("isvalid-"+isValid);
               
            urlService.post(urlConstants.VACATIONSURL,this.newvacaInfo).then(function(response){
                console.log(JSON.stringify(response));
                $scope.success=true;
                    $scope.danger=false;
                    $scope.message=constants.UNAVAILABILITY_CREATE_SUCCESS;
                    // vaca={};
                },function (response) {
                     $scope.danger=true;
                    $scope.success=false;
                    $scope.message=response.data;
                })
                
            }
        $scope.close = function (result) {
                close(result, 500);
            }

       


        function validate(vacaInfo) {
                    //alert("vInfo-"+JSON.stringify(vInfo));
                    if (validator.isNumber(vacaInfo.selectedId)) {
                        return "Required";
                    }
                  /*  else if (signupInfo.email != signupInfo.confirmEmail) {
                        return "email mismatch";
                    }*/
                   /* if (validator.isNull(signupInfo.password)) {
                        return "password Required";
                    }
                    else if (signupInfo.password != signupInfo.confirmPassword) {
                        return "password mismatch";
                    }*/
                    return true;
                }

           

        }]);
});