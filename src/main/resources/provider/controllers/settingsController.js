 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('SettingsHomeCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
            $log.info('Settings Module Started');
            urlService.get('../provider/data/settings.json').then(function(result){
                $scope.settingItems = result.data;
            })
    }]);
});