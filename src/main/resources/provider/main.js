/**
 * Created by Mani on 20-04-2016.
 */

define(['angular','./providerModule'],function (angular,providerModule) {
    providerModule.run(['$log', function ($log) {
        $log.info('Initialized the Provider Module');
    }]);
    require(['./controllers/mainController'], function () {
        angular.bootstrap(document,['provider']);
    })
});