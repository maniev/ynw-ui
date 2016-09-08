/**
 * Created by Mani on 25-04-2016.
 *
 * Controller to show the consumer logout action
 * @param $scope gives scope to variables
 * @param $log for log writing
 * @param UrlService service for server url handling
 * @params UrlConstants holds urls
 * @param LStore reference of local storage
 * @param Auth service for login process handling
 */

define(['../providerModule'], function (providerModule) {
    return providerModule.controller('ProviderLoginCtrl', ['$scope', '$log', 'UrlService', 'UrlConstants', 'LStore', 'Auth', function ($scope, $log, urlService, urlConstants, lStore, Auth) {
        var vm = this;
       
        $log.info('Provider Login Controller ...');
        vm.fields= [{"key": "loginId","type": "input","templateOptions": {"type": "email","label":"Email Address","required": true}},
  {"key": "password","type": "input","templateOptions":{"type": "password","label":"Password","required": true}},
  {"key": "keepme","type": "checkbox","templateOptions": { "label": "Keep me logged in" }}]

        vm.login = {};

        vm.submit = function () {
            var keepme = false;
            if (vm.login.keepme)
                keepme = vm.login.keepme;
            delete vm.login.keepme;
           
            urlService.post(urlConstants.PROVIDERLOGINURL, vm.login).then(function (response) {
            	
                lStore.store('ynw-provider', JSON.stringify(response.data));
                lStore.store('role', 0);
                if (keepme) {
                    lStore.store('ynw-p-credentials', JSON.stringify(vm.login));
                }
                Auth.setUser(response.data);
            }, function (response) {
                $scope.loginError = response.data;
                return false;
            })
        }
    }]);
});