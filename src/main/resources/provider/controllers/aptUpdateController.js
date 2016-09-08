/**ur
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('AptUpdateCtrl', ['$scope','$timeout','$element', 'UrlService', 'UrlConstants',
        'Constants', '$log','appointmentConfig','close','title', function ($scope, $timeout, $element, urlService, urlConstants, constants, $log,appointmentConfig, close,title) {
            $log.info(' AppointmentSetting Update Controller');
            var av = this;
            av.title = title;
            av.appointmentConfig=appointmentConfig;

            av.fields=[{"className":"col-sm-8","template":"<div>Minimum appointment duration(in minutes)</div>"},
                       {"className":"col-sm-2","key":"minApmtTime","type":"input","templateOptions":{"type":"number","min":"0","required":true}},
                       {"className":"col-sm-8","template":"<div>Minimum days before one can book appointment</div>"},
                       {"className":"col-sm-2","key":"minLeadTimeOnline","type":"input","templateOptions":{"type":"number","min":"0","required":true}},
                       {"className":"col-sm-8","template":"<div>Maximum days before one can book appointment</div>"},
                       {"className":"col-sm-2","key":"onlineFutureTime","type":"input","templateOptions":{"type":"number","min":"0","required":true}}
                      ] 

            av.submit=function () {
                urlService.patch(urlConstants.APPOINTMENT,av.appointmentConfig).then(function (response) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message =  constants.APPOINTMENT_UPDATE_SUCCESS;
                    $timeout(function () {
                        $element.modal('hide');
                         close(null, 500)},3000);
                }, function (response) {
                    if (response.data.$valid) {
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.message = response.data;
                    }
                });
            }
    }]);
});
