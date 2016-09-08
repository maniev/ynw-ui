/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('DeleteWLCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','title','close','waitlistInfo', '$timeout','$element',function ($scope, urlService, urlConstants, constants, $log, title, close,waitlistInfo,$timeout,$element) {
            $log.info('WaitList Delete Controller');

            var wl = this;
            wl.title=title;
            wl.waitlistInfo=waitlistInfo;
            wl.deleteWL = function () {
                urlService.post(urlConstants.WAITLISTURL+"/"+waitlistInfo.wailistId).then(function (response) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.WL_DEL_SUCCESS;
                    $timeout(function () {
                        $element.modal('hide');
                        close(null, 500)},500);
                    });
                }, function (response) {
                    $scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
            }
            $scope.close = function (result) {
                 $timeout(function () {
                    $element.modal('hide');
                    close(null, 500)},500);
            }

        }]);
});