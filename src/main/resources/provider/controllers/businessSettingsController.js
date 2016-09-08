 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('BusinessSettingsCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
            $log.info('Business Settings Started');
           	$scope.businessItems=[{"name":"customers","title":"Customers","icon":"users","href":"#/home/settings/business/customers"},
      			{"name":"features","title":"Features","icon":"star","href":"#/home/settings/business/features"},
	  			{"name":"profile","title":"Profile","icon":"user","href":"#/home/settings/business/bprofile"}];
    }]);
});