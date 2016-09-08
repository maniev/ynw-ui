 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ServiceMgrCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
        $log.info('Service Manager Started');
        $scope.apmItems=[{"name":"service","title":"Services","icon":"cog","href":"#/home/settings/business/features/svm/service"}]
	}]);
});