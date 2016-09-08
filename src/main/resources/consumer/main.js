/**
 * Created by Mani on 20-04-2016.
 */

define(['angular','./consumerModule'],function (angular,consumerModule) {
    consumerModule.run(['$log', function ($log) {
        $log.info('Initialized the Consumer Module');
    }]);
    require(['./consumer/controllers/mainController'], function () {
        angular.bootstrap(document,['consumer']);
    })
});