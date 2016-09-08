 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('AppointmentMgrCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
            $log.info('APM Started');
            urlService.get('../provider/data/apm-settings.json').then(function(result){
                $scope.apmItems = result.data;
            })
    }]);
});