 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('SystemSettingsCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
            $log.info('System Settings Started');
           /* urlService.get('../provider/data/systmeSettings.json').then(function(result){
                $scope.businessItems = result.data;
            })*/
    }]);
});