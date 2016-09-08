/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('NotificationsWLCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','title','close','waitlistInfo', '$timeout','$element',function ($scope, urlService, urlConstants, constants, $log, title, close,waitlistInfo,$timeout,$element) {
            $log.info('WaitList Notifications Controller');

            var wl = this;
            wl.title=title;
            wl.waitlistInfo=waitlistInfo;
            
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