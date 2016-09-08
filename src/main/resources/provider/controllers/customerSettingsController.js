 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('CustomerSettingsCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
            $log.info('Customer Settings Started');
            urlService.get('../provider/data/customer-settings.json').then(function(result){
                $scope.customerItems = result.data;
            })
    }]);
});