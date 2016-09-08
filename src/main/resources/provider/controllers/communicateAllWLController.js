/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('CommunicateAllWLCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','title','close','$timeout','$element',function ($scope, urlService, urlConstants, constants, $log, title, close,$timeout,$element) {
            $log.info('WaitList Cancel Controller');
            var wl = this;
            wl.title = title;
            wl.communicateWlInfo = {};
            wl.fields=[
                {"className":"col-md-12","key":"message","type": "textarea","templateOptions":{"rows":3,"label":"Message"}}
            ];

            wl.submit = function () {
                urlService.post(urlConstants.LABELSURL+"/"+lm.labelInfo.label).then(function (response) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.LABEL_CREATE_SUCCESS;
                    lm.labelInfo={};
                }, function (response) {
                    $scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
                });
            }
            $scope.close = function (result) {
                 $timeout(function () {
                    $element.modal('hide');
                    close(null, 500)},200);
            }

        }]);
});