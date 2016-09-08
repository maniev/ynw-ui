/**
 * Created by Mani on 25-04-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerLoginCtrl', ['$scope','$rootScope','$log', 'UrlService', 'UrlConstants', 'LStore', 'Auth', function ($scope,$rootScope, $log, urlService, urlConstants, lStore, Auth) {
        var vm = this;
        $log.info('Consumer Login Controller ...');
        vm.fields=[{"key": "loginId","type": "input","templateOptions": {"type": "email","label":"Email","required": true}},
  {"key": "password","type": "input","templateOptions":{"type": "password","label":"Password","required": true}}];
        vm.login = {};
        vm.submit = function () {
            var loginInfo=vm.login;
            //loginInfo.mUniqueId=$rootScope.mUniqueId;
            $rootScope.loading=true;
            urlService.post(urlConstants.CONSUMERLOGINURL, loginInfo).then(function (response) {
               lStore.store('ynw-consumer', JSON.stringify(response.data));
               lStore.store('ynw-credentials', JSON.stringify(vm.login));
                Auth.setUser(response.data);
            }, function (response) {
                $scope.loginError = response.data;
                return false;
            }).finally(function () {
                $rootScope.loading=false;
            })
        }
    }]);
});