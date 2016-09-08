/**
 * Created by Mani on 30-04-2016.
 *
 * return Controller to show the consumer logout action
 * @param $scope gives scope to variables
 * @params $http http service
 * @param NVService service for server url handling
 * @param $location gives access to page url
 * @param Auth service for login process handling
 */
define(['../providerModule','jquery'], function (providerModule,$) {
    return providerModule.controller('ProviderLogoutCtrl', ['$scope', 'UrlService', '$location', 'Auth', 'UrlConstants', 'LStore', function ($scope, urlService, $location, Auth, urlConstants, lStore) {
        urlService.deleteR(urlConstants.PROVIDERLOGINURL).then(function (result) {
            lStore.remove('ynw-provider');
            lStore.remove('ynw-p-credentials');
            lStore.remove('role');
            Auth.setUser(null);
            $location.path('/');
//            $('body').removeAttr('background-image');
        }, function (data) {
            alert("failure message: " + JSON.stringify({data: data}));
        })
    }]);
});