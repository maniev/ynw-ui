 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('FeaturesSettingsCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
        $log.info('Features Settings Started');
        $scope.featureItems=[{"name":"svm","title":"Service Manager","icon":"calendar","href":"#/home/settings/business/features/svm"},
  			{"name":"WM","title":"Waitlist Manager","icon":"wrench","href":"#/home/settings/business/features/wm"}]
    }]);
});