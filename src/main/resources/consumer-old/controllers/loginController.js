/**
 * Created by Mani on 25-04-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerLoginCtrl', ['$scope','$rootScope','$log', 'UrlService', 'UrlConstants', 'LStore', 'Auth', function ($scope,$rootScope, $log, urlService, urlConstants, lStore, Auth) {
        var vm = this;
        $rootScope.home=false;
        $rootScope.search_top=false;
        $rootScope.logo=true;
        $log.info('Consumer Login Controller ...');
        vm.fields=[{"key": "loginId","type": "input","templateOptions": {"type": "email","label":"Email","required": true}},
  {"key": "password","type": "input","templateOptions":{"type": "password","label":"Password","required": true}},
  {"key": "keepme","type": "checkbox","templateOptions": { "label": "Keep me logged in" }}];
        vm.login = {};
        vm.submit = function () {
            var keepme = false;
            if (vm.login.keepme)
                keepme = vm.login.keepme;
            delete vm.login.keepme;
            urlService.post(urlConstants.CONSUMERLOGINURL, vm.login).then(function (response) {
                lStore.store('user', JSON.stringify(response.data));
                lStore.store('role', 0);
                if (keepme) {
                    lStore.store('login', JSON.stringify(vm.login));
                }
                Auth.setUser(response.data);
            }, function (response) {
                $scope.loginError = response.data;
                return false;
            })
        }
    }]);
});