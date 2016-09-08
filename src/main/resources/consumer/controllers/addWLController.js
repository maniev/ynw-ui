/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('AddtoWLCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','title','close','providerInfo','serviceInfo', '$timeout','$element',
        function ($scope, urlService, urlConstants, constants, $log, title, close,providerInfo,serviceInfo,$timeout,$element) {
            $log.info('WaitList Delete Controller');

            var wl = this;
            wl.title=title;
            wl.serviceInfo=serviceInfo
            wl.providerInfo=providerInfo;
            wl.waitlist={};
            wl.fields=[
                {template:"<div class='clearfix'></div>"},
                {"className":"left-align",template:"How many including you?"},
                {"className":"left-align col-xs-3","key":"mins","type":"input","templateOptions":{"type":"number","pattern": "^[1-9][0-9]*$"}},
                {template:"<div class='clearfix'></div>"},
                {"className":"col-xs-12","key":"notes","type": "textarea","templateOptions":{"rows":3,"label":"Notes"}}
            ]

            /*wl.submit = function () {
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
            }*/
            $scope.close = function (result) {
                 $timeout(function () {
                    $element.modal('hide');
                    close(null, 500)},500);
            }

        }]);
});